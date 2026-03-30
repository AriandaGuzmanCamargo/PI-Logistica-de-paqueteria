import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Linking,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import getRutaRStyles from '../styles/RutaRStyles';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import { useDarkMode } from '../context/DarkModeContext';
import { getCurrentUser } from '../../services/sessionService';
import { getEnviosByUsuario } from '../../services/enviosService';
import {
	buildGoogleMapsDirectionsUrl,
	geocodeAddress,
	getExpoLocationModule,
	getDrivingRoute,
	normalizeAddressQuery,
	resolveCurrentPosition,
	toKm,
	toMinutes,
} from '../services/rutaMapService';

let MapViewComponent = null;
let MarkerComponent = null;
let PolylineComponent = null;

if (Platform.OS !== 'web') {
	const Maps = require('react-native-maps');
	MapViewComponent = Maps.default || Maps;
	MarkerComponent = Maps.Marker;
	PolylineComponent = Maps.Polyline;
}

const DELIVERY_SAMPLE = {
	clientName: 'Entrega asignada',
	address: '',
	phone: '',
};

const DEFAULT_ORIGIN = {
	latitude: 19.432608,
	longitude: -99.133209,
};

const DEFAULT_DESTINATION = {
	latitude: 19.421906,
	longitude: -99.163537,
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const isPlaceholderDelivery = (delivery) => {
	if (!delivery || typeof delivery !== 'object') {
		return true;
	}

	const name = String(delivery.clientName || delivery.name || '').trim().toLowerCase();
	const address = String(delivery.address || '').trim().toLowerCase();

	return name === 'ana martinez' || address.includes('londres 247');
};

const mapShipmentToRouteDelivery = (envio, index) => {
	const codigo = envio?.paquete?.codigo_rastreo || `ENV-${envio?.id_envio || index}`;
	const clientName = envio?.destinatario?.nombre || 'Destinatario';
	const address = [envio?.direccion_destino, envio?.ciudad_destino].filter(Boolean).join(', ');
	const estadoEnvio = String(envio?.estado_envio || '').toLowerCase();
	const estadoPaquete = String(envio?.paquete?.estado_actual || '').toLowerCase();
	const done = estadoEnvio === 'entregado' || estadoPaquete === 'entregado';
	const canceled = estadoEnvio === 'cancelado';

	return {
		id: codigo,
		clientName,
		name: clientName,
		address,
		phone: envio?.destinatario?.telefono || '',
		done,
		canceled,
		id_envio: envio?.id_envio || null,
	};
};

export default function RutaR({ navigation, route }) {
	const { width } = useWindowDimensions();
	const { isDarkMode } = useDarkMode();
	const selectedDelivery = route?.params?.delivery;
	const [deliveryFromApi, setDeliveryFromApi] = useState(null);

	useEffect(() => {
		let isCancelled = false;

		async function loadActiveDelivery() {
			if (selectedDelivery && !isPlaceholderDelivery(selectedDelivery)) {
				setDeliveryFromApi(null);
				return;
			}

			try {
				const user = getCurrentUser();
				const userId = Number(user?.id_usuario);

				if (!Number.isInteger(userId) || userId <= 0) {
					return;
				}

				const envios = await getEnviosByUsuario(userId);
				const assigned = envios
					.filter((envio) => Boolean(envio?.asignado_al_conductor))
					.map(mapShipmentToRouteDelivery);

				if (assigned.length === 0 || isCancelled) {
					return;
				}

				const nextPending = assigned.find((item) => !item.done && !item.canceled) || assigned[0];
				setDeliveryFromApi(nextPending);
			} catch {
				if (!isCancelled) {
					setDeliveryFromApi(null);
				}
			}
		}

		loadActiveDelivery();

		return () => {
			isCancelled = true;
		};
	}, [selectedDelivery]);

	const preferredDelivery = useMemo(() => {
		if (selectedDelivery && !isPlaceholderDelivery(selectedDelivery)) {
			return selectedDelivery;
		}

		if (deliveryFromApi) {
			return deliveryFromApi;
		}

		return null;
	}, [deliveryFromApi, selectedDelivery]);

	const deliveryData = useMemo(
		() => ({
			...DELIVERY_SAMPLE,
			...(preferredDelivery || {}),
		}),
		[preferredDelivery]
	);
	const [mapState, setMapState] = useState({
		loading: true,
		error: '',
		warning: '',
		origin: DEFAULT_ORIGIN,
		destination: DEFAULT_DESTINATION,
		routeCoordinates: [],
		distanceMeters: null,
		durationSeconds: null,
	});
	const [isLiveTracking, setIsLiveTracking] = useState(false);
	const liveWatchRef = useRef(null);
	const destinationRef = useRef(DEFAULT_DESTINATION);
	const lastRouteCalcRef = useRef(0);

	useEffect(() => {
		destinationRef.current = mapState.destination;
	}, [mapState.destination]);

	const resolveRoute = async () => {
		setMapState((prev) => ({ ...prev, loading: true, error: '', warning: '' }));

		try {
			const Location = await getExpoLocationModule();

			const currentPosition = await resolveCurrentPosition(DEFAULT_ORIGIN);
			const origin = currentPosition.origin;
			let destination = null;
			let warning = currentPosition.warning || '';

			const normalizedAddress = normalizeAddressQuery(deliveryData.address);

			try {
				const localResults = await Location.geocodeAsync(normalizedAddress);
				const localFirst = Array.isArray(localResults) ? localResults[0] : null;

				if (localFirst?.latitude && localFirst?.longitude) {
					destination = {
						latitude: localFirst.latitude,
						longitude: localFirst.longitude,
					};
				}
			} catch {
				destination = null;
			}

			if (!destination) {
				try {
					destination = await geocodeAddress(deliveryData.address);
				} catch {
					destination = { ...DEFAULT_DESTINATION };
					warning = warning || 'Usando ubicacion aproximada: no se pudo geocodificar la direccion exacta.';
				}
			}

			const routeData = await getDrivingRoute(origin, destination);
			if (routeData?.isFallbackRoute) {
				warning = warning || 'No fue posible consultar la ruta en tiempo real. Se muestra un trazo aproximado.';
			}

			setMapState({
				loading: false,
				error: '',
				warning,
				origin,
				destination,
				routeCoordinates: routeData.coordinates,
				distanceMeters: routeData.distanceMeters,
				durationSeconds: routeData.durationSeconds,
			});
		} catch (error) {
			setMapState((prev) => ({
				...prev,
				loading: false,
				error: '',
				warning: error.message || 'No fue posible calcular la ruta exacta.',
			}));
		}
	};

	useEffect(() => {
		resolveRoute();
	}, [deliveryData.address]);

	const stopLiveTracking = () => {
		if (liveWatchRef.current) {
			liveWatchRef.current.remove();
			liveWatchRef.current = null;
		}

		setIsLiveTracking(false);
	};

	const startLiveTracking = async () => {
		if (Platform.OS === 'web') {
			Alert.alert('No disponible', 'El seguimiento en vivo esta disponible solo en Android/iOS.');
			return;
		}

		if (liveWatchRef.current) {
			return;
		}

		try {
			const Location = await getExpoLocationModule();
			const requestPermission = Location.requestForegroundPermissionsAsync;

			if (typeof requestPermission !== 'function') {
				Alert.alert('No disponible', 'Este dispositivo no permite solicitar permisos de ubicacion.');
				return;
			}

			const permission = await requestPermission();

			if (permission.status !== 'granted') {
				Alert.alert('Permiso requerido', 'Debes habilitar ubicacion para seguimiento en vivo.');
				return;
			}

			setIsLiveTracking(true);
			lastRouteCalcRef.current = 0;

			liveWatchRef.current = await Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.High,
					timeInterval: 5000,
					distanceInterval: 10,
				},
				async (position) => {
					const origin = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					};

					setMapState((prev) => ({
						...prev,
						origin,
						warning: prev.warning?.includes('Permiso') ? '' : prev.warning,
					}));

					const destination = destinationRef.current;
					if (!destination) {
						return;
					}

					const now = Date.now();
					if (now - lastRouteCalcRef.current < 4000) {
						return;
					}

					lastRouteCalcRef.current = now;

					try {
						const routeData = await getDrivingRoute(origin, destination);
						setMapState((prev) => ({
							...prev,
							origin,
							routeCoordinates: routeData.coordinates,
							distanceMeters: routeData.distanceMeters,
							durationSeconds: routeData.durationSeconds,
						}));
					} catch {
						// Keep last route if recalculation fails temporarily.
					}
				}
			);
		} catch (error) {
			setIsLiveTracking(false);
			Alert.alert('Seguimiento no disponible', error.message || 'No se pudo iniciar el seguimiento en vivo.');
		}
	};

	useEffect(() => {
		return () => {
			if (liveWatchRef.current) {
				liveWatchRef.current.remove();
				liveWatchRef.current = null;
			}
		};
	}, []);

	const mapRegion = useMemo(() => {
		if (mapState.origin && mapState.destination) {
			const latitude = (mapState.origin.latitude + mapState.destination.latitude) / 2;
			const longitude = (mapState.origin.longitude + mapState.destination.longitude) / 2;

			return {
				latitude,
				longitude,
				latitudeDelta: Math.max(0.06, Math.abs(mapState.origin.latitude - mapState.destination.latitude) * 1.8),
				longitudeDelta: Math.max(0.06, Math.abs(mapState.origin.longitude - mapState.destination.longitude) * 1.8),
			};
		}

		return {
			latitude: DEFAULT_ORIGIN.latitude,
			longitude: DEFAULT_ORIGIN.longitude,
			latitudeDelta: 0.08,
			longitudeDelta: 0.08,
		};
	}, [mapState.destination, mapState.origin]);

	const openExternalNavigation = async () => {
		if (!mapState.origin || !mapState.destination) {
			Alert.alert('Ruta no disponible', 'Todavia no se cargaron los puntos para navegar.');
			return;
		}

		const url = buildGoogleMapsDirectionsUrl(mapState.origin, mapState.destination);
		const canOpen = await Linking.canOpenURL(url);

		if (!canOpen) {
			Alert.alert('No disponible', 'No se pudo abrir Google Maps en este dispositivo.');
			return;
		}

		await Linking.openURL(url);
	};
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getRutaRStyles(s, isDarkMode);

	return (
		<View style={isWeb ? styles.webRoot : styles.nativeRoot}>
			<SafeAreaView
				style={[
					styles.safeArea,
					isWeb && styles.webPhoneFrame,
					isWeb && {
						width: phoneWidth,
						height: '100%',
						maxHeight: 860,
					},
				]}
			>
				<StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

				<TopHeaderR s={s} navigation={navigation} title="Ruta del Dia" />

				<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
					<View style={styles.mapCard}>
						{isWeb ? (
							<View style={styles.mapFallbackWrap}>
								<Text style={styles.mapFallbackTitle}>Mapa en vista previa web</Text>
								<Text style={styles.mapFallbackText}>
									Ejecuta la app en Android/iOS para ver marcadores y trazo real de ruta.
								</Text>
							</View>
						) : MapViewComponent && MarkerComponent && PolylineComponent ? (
							<>
								<MapViewComponent
									style={{ flex: 1 }}
									initialRegion={mapRegion}
									region={mapRegion}
								>
									{mapState.origin ? (
										<MarkerComponent coordinate={mapState.origin} title="Tu ubicacion" pinColor="#2563EB" />
									) : null}
									{mapState.destination ? (
										<MarkerComponent
											coordinate={mapState.destination}
											title={deliveryData.clientName || deliveryData.name}
											description={deliveryData.address}
											pinColor="#D97706"
										/>
									) : null}
									{mapState.routeCoordinates.length > 0 ? (
										<PolylineComponent coordinates={mapState.routeCoordinates} strokeWidth={4} strokeColor="#1D4ED8" />
									) : null}
								</MapViewComponent>
								{mapState.loading ? (
									<View style={styles.mapOverlay}>
										<View style={styles.mapLoadingWrap}>
											<ActivityIndicator size="large" color="#2E63D7" />
											<Text style={styles.mapLoadingText}>Calculando ruta real...</Text>
										</View>
									</View>
								) : null}
								{!mapState.loading && mapState.error ? (
									<View style={styles.mapOverlay}>
										<View style={styles.mapFallbackWrap}>
											<Text style={styles.mapErrorText}>{mapState.error}</Text>
										</View>
									</View>
								) : null}
							</>
						) : (
							<View style={styles.mapFallbackWrap}>
								<Text style={styles.mapErrorText}>No se pudo inicializar el componente de mapa en este dispositivo.</Text>
							</View>
						)}
					</View>

					<View style={styles.card}>
						<View style={styles.clientRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinDot} />
							</View>
							<View style={styles.clientInfo}>
								<Text style={styles.clientName}>{deliveryData.clientName || deliveryData.name}</Text>
								<Text style={styles.clientAddress}>{deliveryData.address}</Text>
							</View>
						</View>

						<Text style={styles.phone}>{deliveryData.phone || DELIVERY_SAMPLE.phone}</Text>

						<View style={styles.metricsRow}>
							<Text style={styles.metricText}>Distancia total: <Text style={styles.metricStrong}>{toKm(mapState.distanceMeters)} km</Text></Text>
							<Text style={styles.metricText}>Tiempo estimado: <Text style={styles.metricStrong}>{toMinutes(mapState.durationSeconds)} min</Text></Text>
						</View>

						{mapState.warning ? <Text style={styles.warningText}>{mapState.warning}</Text> : null}

						<TouchableOpacity style={styles.refreshBtn} onPress={resolveRoute}>
							<Text style={styles.refreshBtnText}>Actualizar ubicacion real</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.liveBtn, isLiveTracking && styles.liveBtnActive]}
							onPress={isLiveTracking ? stopLiveTracking : startLiveTracking}
						>
							<Text style={styles.liveBtnText}>{isLiveTracking ? 'Detener seguimiento en vivo' : 'Iniciar seguimiento en vivo'}</Text>
						</TouchableOpacity>

						{isLiveTracking ? <Text style={styles.liveStatus}>Seguimiento en vivo activo</Text> : null}

						<TouchableOpacity style={styles.startBtn} onPress={openExternalNavigation}>
							<Text style={styles.startBtnText}>Iniciar navegacion</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Ruta" />
			</SafeAreaView>
		</View>
	);
}
