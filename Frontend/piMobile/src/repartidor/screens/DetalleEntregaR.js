import React, { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
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
import getDetalleEntregaRStyles from '../styles/DetalleEntregaRStyles';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import { MapViewComponent, MarkerComponent, PolylineComponent } from '../components/mapsAdapter';
import { useDarkMode } from '../context/DarkModeContext';
import { geocodeAddress, getExpoLocationModule, getDrivingRoute, normalizeAddressQuery, resolveCurrentPosition, toKm, toMinutes } from '../services/rutaMapService';
import { cancelarEnvioComoConductor, getDetalleEnvio } from '../../services/enviosService';
import { getCurrentUser } from '../../services/sessionService';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const FALLBACK_DELIVERY = {
	id: 'PAK123456789',
	name: 'Ana Martínez',
	address: 'Londres 247, Col. Juárez, Ciudad de México',
	phone: '+52 55 1234 5678',
};

const DEFAULT_ORIGIN = {
	latitude: 19.432608,
	longitude: -99.133209,
};

const DEFAULT_DESTINATION = {
	latitude: 19.421906,
	longitude: -99.163537,
};

export default function DetalleEntregaR({ navigation, route }) {
	const { width } = useWindowDimensions();
	const { isDarkMode } = useDarkMode();
	const delivery = route?.params?.delivery || FALLBACK_DELIVERY;
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
	const [isSubmittingDelivery, setIsSubmittingDelivery] = useState(false);
	const [deliveryDetail, setDeliveryDetail] = useState(null);

	const resolveMapPreview = async () => {
		setMapState((prev) => ({ ...prev, loading: true, error: '', warning: '' }));

		try {
			const Location = await getExpoLocationModule();
			let destination = null;
			const currentPosition = await resolveCurrentPosition(DEFAULT_ORIGIN);
			const origin = currentPosition.origin;
			let warning = currentPosition.warning || '';

			const normalizedAddress = normalizeAddressQuery(delivery.address);

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
					destination = await geocodeAddress(delivery.address);
				} catch {
					destination = { ...DEFAULT_DESTINATION };
					warning = warning || 'Usando ubicación aproximada: no se pudo geocodificar la dirección exacta.';
				}
			}

			const routeData = await getDrivingRoute(origin, destination);

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
		resolveMapPreview();
	}, [delivery.address]);

	const previewRegion = useMemo(() => {
		if (mapState.origin && mapState.destination) {
			const latitude = (mapState.origin.latitude + mapState.destination.latitude) / 2;
			const longitude = (mapState.origin.longitude + mapState.destination.longitude) / 2;

			return {
				latitude,
				longitude,
				latitudeDelta: Math.max(0.04, Math.abs(mapState.origin.latitude - mapState.destination.latitude) * 1.8),
				longitudeDelta: Math.max(0.04, Math.abs(mapState.origin.longitude - mapState.destination.longitude) * 1.8),
			};
		}

		return {
			latitude: DEFAULT_ORIGIN.latitude,
			longitude: DEFAULT_ORIGIN.longitude,
			latitudeDelta: 0.06,
			longitudeDelta: 0.06,
		};
	}, [mapState.destination, mapState.origin]);
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getDetalleEntregaRStyles(s, isDarkMode);
	const shipmentId = route?.params?.idEnvio || delivery?.id_envio;
	const shipmentStatus = String(delivery?.estado_envio || '').toLowerCase();
	const isDelivered = shipmentStatus === 'entregado';
	const isCancelled = shipmentStatus === 'cancelado';
	const receiverName = deliveryDetail?.recibio_entrega_nombre || 'No especificado';

	useEffect(() => {
		let isMounted = true;

		async function loadDeliveryDetail() {
			if (!shipmentId) {
				return;
			}

			try {
				const detail = await getDetalleEnvio(shipmentId);
				if (isMounted) {
					setDeliveryDetail(detail);
				}
			} catch {
				if (isMounted) {
					setDeliveryDetail(null);
				}
			}
		}

		loadDeliveryDetail();

		return () => {
			isMounted = false;
		};
	}, [shipmentId]);

	const handleMarkAsDelivered = () => {
		navigation.navigate('TomarFotoEntregaR', {
			delivery,
			idEnvio: shipmentId,
		});
	};

	const handleCancelShipment = async () => {
		try {
			const user = getCurrentUser();
			const idUsuario = Number(user?.id_usuario);

			if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
				throw new Error('No hay sesion activa de conductor.');
			}

			if (!shipmentId) {
				throw new Error('No se encontro el id del envio para cancelar.');
			}

			setIsSubmittingDelivery(true);
			await cancelarEnvioComoConductor({
				idEnvio: shipmentId,
				idUsuario,
			});

			Alert.alert('Envio cancelado', 'El envio fue marcado como cancelado.', [
				{
					text: 'OK',
					onPress: () => navigation.navigate('EntregasR', { refresh: Date.now() }),
				},
			]);
		} catch (error) {
			Alert.alert('No se pudo cancelar', error.message || 'Intenta nuevamente.');
		} finally {
			setIsSubmittingDelivery(false);
		}
	};

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

				<TopHeaderR s={s} navigation={navigation} title="Detalle de Entrega" />

				<ScrollView style={styles.content} contentContainerStyle={styles.content}>
					<View style={styles.idRow}>
						<View style={styles.idDot} />
						<Text style={styles.idText}>{delivery.id}</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.receiverRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinCenter} />
							</View>

							<View style={styles.receiverInfo}>
								<Text style={styles.receiverName}>{delivery.name}</Text>
								<Text style={styles.addressText}>{delivery.address}</Text>
								<Text style={styles.phoneText}>{delivery.phone || FALLBACK_DELIVERY.phone}</Text>
							</View>
						</View>

						<View style={styles.mapArea}>
							{isWeb ? (
								<View style={styles.mapFallbackWrap}>
									<Text style={styles.mapFallbackText}>Vista previa de mapa disponible en Android/iOS.</Text>
								</View>
							) : MapViewComponent && MarkerComponent && PolylineComponent ? (
								<>
									<MapViewComponent style={{ flex: 1 }} region={previewRegion}>
										{mapState.origin ? (
											<MarkerComponent coordinate={mapState.origin} title="Origen" pinColor="#2563EB" />
										) : null}
										{mapState.destination ? (
											<MarkerComponent coordinate={mapState.destination} title={delivery.name} description={delivery.address} pinColor="#D97706" />
										) : null}
										{mapState.routeCoordinates.length > 0 ? (
											<PolylineComponent coordinates={mapState.routeCoordinates} strokeWidth={4} strokeColor="#1D4ED8" />
										) : null}
									</MapViewComponent>
									{mapState.loading ? (
										<View style={styles.mapOverlay}>
											<View style={styles.mapLoadingWrap}>
												<ActivityIndicator size="small" color="#2E63D7" />
												<Text style={styles.mapLoadingText}>Cargando mapa...</Text>
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
									<Text style={styles.mapErrorText}>No se pudo inicializar el componente de mapa.</Text>
								</View>
							)}
						</View>

						<TouchableOpacity style={styles.routeBtn} onPress={() => navigation.navigate('RutaR', { delivery })}>
							<Text style={styles.actionText}>Ver ruta real en mapa</Text>
						</TouchableOpacity>

						<View style={styles.metricsRow}>
							<Text style={styles.metricText}>Distancia: <Text style={styles.infoStrong}>{toKm(mapState.distanceMeters)} km</Text></Text>
							<Text style={styles.metricText}>Tiempo Estimado: <Text style={styles.infoStrong}>{toMinutes(mapState.durationSeconds)} min</Text></Text>
						</View>

						<Text style={styles.metricText}>
							Quien recibio el paquete: <Text style={styles.infoStrong}>{receiverName}</Text>
						</Text>

						{mapState.warning ? <Text style={styles.warningText}>{mapState.warning}</Text> : null}

						<TouchableOpacity style={styles.refreshBtn} onPress={resolveMapPreview}>
							<Text style={styles.actionText}>Actualizar ubicación real</Text>
						</TouchableOpacity>

						<View style={styles.actionRow}>
							<TouchableOpacity
								style={[styles.actionButton, styles.successBtn]}
								onPress={handleMarkAsDelivered}
								disabled={isSubmittingDelivery || isDelivered || isCancelled}
							>
								<Text style={styles.actionText}>
									{isDelivered ? 'Entregado' : isCancelled ? 'Cancelado' : isSubmittingDelivery ? 'Guardando...' : 'Marcar como Entregado'}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.actionButton, styles.failBtn]}
								onPress={handleCancelShipment}
								disabled={isSubmittingDelivery || isDelivered || isCancelled}
							>
								<Text style={styles.actionText}>{isCancelled ? 'Cancelado' : isSubmittingDelivery ? 'Guardando...' : 'Cancelar'}</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('IncidenciasR', { delivery })}>
							<Text style={styles.actionText}>Reportar Incidencia</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
