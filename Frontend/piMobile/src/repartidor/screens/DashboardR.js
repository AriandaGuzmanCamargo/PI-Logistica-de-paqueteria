import React, { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,Platform,SafeAreaView,ScrollView,StatusBar,Text,TextInput,
	TouchableOpacity,View,useWindowDimensions,Image,
} from 'react-native';
import colors from '../../theme/colors';
import getDashboardRStyles from '../styles/DashboardRStyles';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import { MapViewComponent, MarkerComponent, PolylineComponent } from '../components/mapsAdapter';
import { useDarkMode } from '../context/DarkModeContext';
import { getCurrentUser } from '../../services/sessionService';
import { getEnviosByUsuario } from '../../services/enviosService';
import {
	geocodeAddress,
	getDrivingRoute,
	normalizeAddressQuery,
	resolveCurrentPosition,
	toKm,
	toMinutes,
} from '../services/rutaMapService';
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const DEFAULT_ORIGIN = {
	latitude: 20.588793,
	longitude: -100.389889,
};

const DEFAULT_DESTINATION = {
	latitude: 20.625,
	longitude: -100.4,
};

function getMiniMapRegion(origin, destination) {
	const latitude = (origin.latitude + destination.latitude) / 2;
	const longitude = (origin.longitude + destination.longitude) / 2;
	const latitudeDelta = Math.max(0.02, Math.abs(origin.latitude - destination.latitude) * 1.8);
	const longitudeDelta = Math.max(0.02, Math.abs(origin.longitude - destination.longitude) * 1.8);

	return {
		latitude,
		longitude,
		latitudeDelta,
		longitudeDelta,
	};
}

function toDashboardDelivery(envio, index) {
	const codigo = envio?.paquete?.codigo_rastreo || `ENV-${envio?.id_envio || index}`;
	const nombre = envio?.destinatario?.nombre || 'Destinatario';
	const addressParts = [envio?.direccion_destino, envio?.ciudad_destino].filter(Boolean);
	const estadoEnvio = String(envio?.estado_envio || '').toLowerCase();
	const estadoPaquete = String(envio?.paquete?.estado_actual || '').toLowerCase();
	const done = estadoEnvio === 'entregado' || estadoPaquete === 'entregado';

	return {
		id: codigo,
		name: nombre,
		address: addressParts.length > 0 ? addressParts.join(', ') : 'Dirección pendiente',
		done,
		hasIncident: estadoEnvio === 'incidencia' || estadoPaquete === 'retrasado',
		id_envio: envio?.id_envio,
	};
}

export default function DashboardR({ navigation }) {
	const [searchText, setSearchText] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState('');
	const [deliveries, setDeliveries] = useState([]);
	const [miniMapState, setMiniMapState] = useState({
		loading: true,
		error: '',
		warning: '',
		origin: DEFAULT_ORIGIN,
		destination: DEFAULT_DESTINATION,
		routeCoordinates: [],
		distanceMeters: null,
		durationSeconds: null,
	});
	const { width } = useWindowDimensions();
	const { isDarkMode } = useDarkMode();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getDashboardRStyles(s, isDarkMode);

	useEffect(() => {
		let isCancelled = false;
		let hasLoadedOnce = false;

		async function loadDashboard() {
			if (!hasLoadedOnce) {
				setIsLoading(true);
			}
			setLoadError('');

			try {
				const user = getCurrentUser();
				const userId = Number(user?.id_usuario);

				if (!Number.isInteger(userId) || userId <= 0) {
					throw new Error('No hay sesión activa de conductor.');
				}

				const envios = await getEnviosByUsuario(userId);
				const mapped = envios
					.filter((envio) => Boolean(envio?.asignado_al_conductor))
					.map(toDashboardDelivery);

				if (!isCancelled) {
					setDeliveries(mapped);
				}
			} catch (error) {
				if (!isCancelled) {
					setDeliveries([]);
					setLoadError(error.message || 'No se pudieron cargar los datos del inicio.');
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
				hasLoadedOnce = true;
			}
		}

		loadDashboard();
		const intervalId = setInterval(loadDashboard, 20000);
		const unsubscribeFocus = navigation.addListener('focus', loadDashboard);

		return () => {
			isCancelled = true;
			clearInterval(intervalId);
			unsubscribeFocus();
		};
	}, [navigation]);

	const user = getCurrentUser();
	const welcomeName = user?.nombre || user?.nombre_completo || 'Conductor';

	const filteredDeliveries = useMemo(() => {
		const normalizedSearch = searchText.trim().toLowerCase();

		if (!normalizedSearch) {
			return deliveries;
		}

		return deliveries.filter((item) => {
			const haystack = `${item.id} ${item.name} ${item.address}`.toLowerCase();
			return haystack.includes(normalizedSearch);
		});
	}, [deliveries, searchText]);

	const pendingCount = useMemo(() => deliveries.filter((item) => !item.done).length, [deliveries]);

	const nextRouteDelivery = useMemo(() => {
		const firstPending = deliveries.find((item) => !item.done && !item.hasIncident);
		if (firstPending) return firstPending;

		const secondPending = deliveries.find((item) => !item.done);
		if (secondPending) return secondPending;

		return deliveries[0] || null;
	}, [deliveries]);

	const nextDelivery = useMemo(() => {
		const firstPending = filteredDeliveries.find((item) => !item.done && !item.hasIncident);
		if (firstPending) return firstPending;

		const secondPending = filteredDeliveries.find((item) => !item.done);
		if (secondPending) return secondPending;

		return filteredDeliveries[0] || null;
	}, [filteredDeliveries]);

	useEffect(() => {
		let isCancelled = false;

		async function loadMiniMap() {
			if (Platform.OS === 'web') {
				setMiniMapState((prev) => ({
					...prev,
					loading: false,
					error: '',
					warning: 'Vista previa de mapa disponible en Android/iOS.',
				}));
				return;
			}

			if (!nextRouteDelivery?.address) {
				setMiniMapState((prev) => ({
					...prev,
					loading: false,
					error: '',
					warning: 'Aún no hay una entrega para mostrar en mapa.',
					routeCoordinates: [],
					distanceMeters: null,
					durationSeconds: null,
				}));
				return;
			}

			setMiniMapState((prev) => ({ ...prev, loading: true, error: '', warning: '' }));

			try {
				const currentPosition = await resolveCurrentPosition(DEFAULT_ORIGIN);
				const origin = currentPosition.origin;
				let destination = null;
				let warning = currentPosition.warning || '';

				try {
					destination = await geocodeAddress(normalizeAddressQuery(nextRouteDelivery.address));
				} catch {
					destination = { ...DEFAULT_DESTINATION };
					warning = warning || 'No se pudo geocodificar el destino exacto. Mostrando aproximación.';
				}

				const routeData = await getDrivingRoute(origin, destination);

				if (isCancelled) {
					return;
				}

				setMiniMapState({
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
				if (isCancelled) {
					return;
				}

				setMiniMapState((prev) => ({
					...prev,
					loading: false,
					error: '',
					warning: error.message || 'No se pudo preparar la vista de ruta del día.',
				}));
			}
		}

		loadMiniMap();

		return () => {
			isCancelled = true;
		};
	}, [nextRouteDelivery?.address]);

	return (
		<View style={isWeb ? styles.webRoot : styles.nativeRoot}>
			<SafeAreaView
				style={[
					styles.safeArea,
					isWeb && {
						width: phoneWidth,
						height: '100%',
						maxHeight: 860,
					},
				]}
			>
				<StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

			<TopHeaderR s={s} navigation={navigation} />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.welcome}>Bienvenido, {welcomeName}</Text>
				<View style={styles.serviceRow}>
					<View style={styles.onlineDot} />
					<Text style={styles.serviceText}>En servicio</Text>
				</View>
				{isLoading ? (
					<View style={styles.statusRow}>
						<ActivityIndicator size="small" color="#3F67A8" />
						<Text style={styles.statusText}>Cargando datos reales...</Text>
					</View>
				) : null}
				{!isLoading && loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}

				<View style={styles.statsRow}>
					<TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('EntregasR')}>
						<View style={styles.statIconBlue}>
							<Image source={require('../../../images/proceso.png')} style={styles.statIconImage} resizeMode="contain" />
						</View>
						<View>
							<Text style={styles.statTitle}>Entregas</Text>
							<Text style={styles.statValue}>{deliveries.length}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.statCard}
						onPress={() => navigation.navigate('EntregasR', { initialFilter: 'Pendientes' })}
					>
						<View style={styles.statIconGold}>
							<Image source={require('../../../images/pendiente.png')} style={styles.statIconImage} resizeMode="contain" />
						</View>
						<View>
							<Text style={styles.statTitle}>Pendientes</Text>
							<Text style={styles.statValue}>{pendingCount}</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.singleBox}>
					<Text style={styles.mapBlockTitle}>Ruta del día</Text>
					{Platform.OS === 'web' || !MapViewComponent ? (
						<View style={styles.mapFallbackWrap}>
							<Text style={styles.mapFallbackText}>Ejecuta en Android/iOS para ver el mini mapa en vivo.</Text>
						</View>
					) : (
						<View style={styles.mapPreviewWrap}>
							<MapViewComponent
								style={styles.mapPreview}
								region={getMiniMapRegion(miniMapState.origin, miniMapState.destination)}
								showsUserLocation={false}
								showsMyLocationButton={false}
								rotateEnabled={false}
								scrollEnabled={false}
								zoomEnabled={false}
							>
								{MarkerComponent ? <MarkerComponent coordinate={miniMapState.origin} title="Tu ubicación" /> : null}
								{MarkerComponent && nextRouteDelivery ? (
									<MarkerComponent
										coordinate={miniMapState.destination}
										title={nextRouteDelivery.name || 'Destino'}
										description={nextRouteDelivery.address}
									/>
								) : null}
								{PolylineComponent && miniMapState.routeCoordinates.length > 1 ? (
									<PolylineComponent
										coordinates={miniMapState.routeCoordinates}
										strokeColor="#2E6BE6"
										strokeWidth={3}
									/>
								) : null}
							</MapViewComponent>
							{miniMapState.loading ? (
								<View style={styles.mapOverlay}>
									<ActivityIndicator size="small" color="#FFFFFF" />
									<Text style={styles.mapOverlayText}>Cargando mini ruta...</Text>
								</View>
							) : null}
						</View>
					)}
					{miniMapState.warning ? <Text style={styles.mapWarningText}>{miniMapState.warning}</Text> : null}
					{nextRouteDelivery ? (
						<Text style={styles.mapMetricsText}>
							Próxima: {nextRouteDelivery.name} | {toKm(miniMapState.distanceMeters)} km | {toMinutes(miniMapState.durationSeconds)} min
						</Text>
					) : null}
				</View>

				<View style={styles.card}>
					<View style={styles.searchRow}>
						<View style={styles.searchInputWrap}>
							<Text style={styles.searchPrefix}>Q</Text>
							<TextInput
								style={styles.searchInput}
								placeholder="Buscar dirección o rastreo"
								placeholderTextColor="#7D89AD"
								value={searchText}
								onChangeText={setSearchText}
							/>
						</View>
					</View>

					<View style={styles.sortRow}>
						<Text style={styles.sortText}>Mostrando: {filteredDeliveries.length} registros</Text>
					</View>

					{nextDelivery ? (
						<View style={styles.singleRecord}>
							<View style={styles.recordTopRow}>
								<View style={styles.recordIdWrap}>
									<View style={styles.recordDot} />
									<Text style={styles.recordId}>{nextDelivery.id}</Text>
								</View>
								<Text style={styles.recordTime}>{nextDelivery.done ? 'Entregado' : 'Pendiente'}</Text>
							</View>

							<View style={styles.recordBottomRow}>
								<View style={styles.recordInfo}>
									<Text style={styles.recordName}>{nextDelivery.name}</Text>
									<Text style={styles.recordAddress}>{nextDelivery.address}</Text>
								</View>
								<TouchableOpacity
									style={styles.recordActionBtn}
									onPress={() => {
										if (!nextDelivery.done) {
											navigation.navigate('DetalleEntregaR', {
												delivery: nextDelivery,
												idEnvio: nextDelivery.id_envio,
											});
											return;
										}

										navigation.navigate('EntregasR', { initialFilter: 'Entregadas' });
									}}
								>
									<Text style={styles.recordActionText}>{nextDelivery.done ? 'Ver entregadas' : 'Ver detalle'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (
						<Text style={styles.sortText}>No hay entregas disponibles para mostrar.</Text>
					)}
				</View>

				<View style={[styles.card, styles.tipCard]}>
					<View style={styles.tipTextWrap}>
						<Text style={styles.tipTitle}>Consejo del día</Text>
						<Text style={styles.tipBody}>Asegura y etiqueta los paquetes antes de salir para evitar retrasos.</Text>
						<TouchableOpacity>
							<Text style={styles.tipLink}>Leer más &gt;</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.tipAvatar}>
						<Text style={styles.tipAvatarText}>R</Text>
					</View>
				</View>
			</ScrollView>

			<BottomNavR navigation={navigation} s={s} activeTab="Inicio" />
			</SafeAreaView>
		</View>
	);
}
