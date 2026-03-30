import React, { useEffect, useMemo, useState } from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import getEntregasRStyles from '../styles/EntregasRStyles';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import { useDarkMode } from '../context/DarkModeContext';
import { getCurrentUser } from '../../services/sessionService';
import { getEnviosByUsuario } from '../../services/enviosService';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function toDeliveryItem(envio, index) {
	const codigo = envio?.paquete?.codigo_rastreo || `ENV-${envio?.id_envio || index}`;
	const nombre = envio?.destinatario?.nombre || 'Destinatario';
	const addressParts = [envio?.direccion_destino, envio?.ciudad_destino].filter(Boolean);
	const estadoEnvio = String(envio?.estado_envio || '').toLowerCase();
	const estadoPaquete = String(envio?.paquete?.estado_actual || '').toLowerCase();
	const canceled = estadoEnvio === 'cancelado';
	const done = estadoEnvio === 'entregado' || estadoPaquete === 'entregado';

	return {
		id: codigo,
		name: nombre,
		address: addressParts.length > 0 ? addressParts.join(', ') : 'Dirección pendiente',
		phone: envio?.destinatario?.telefono || '',
		done,
		canceled,
		estado_envio: estadoEnvio,
		hasIncident: estadoEnvio === 'incidencia' || estadoPaquete === 'retrasado',
		pinBlue: done,
		id_envio: envio?.id_envio,
		asignadoAlConductor: Boolean(envio?.asignado_al_conductor),
		idAsignacionActiva: envio?.id_asignacion_activa || null,
		rutaAsignada: {
			nombre: envio?.asignacion?.ruta_nombre || null,
			origen: envio?.asignacion?.ruta_origen || null,
			destino: envio?.asignacion?.ruta_destino || null,
			vehiculoPlaca: envio?.asignacion?.vehiculo_placa || null,
		},
	};
}

const FILTER_OPTIONS = ['Todas', 'Pendientes', 'Entregadas', 'Incidencias'];
const SECTION_TITLES = {
	Todas: 'Todas',
	Pendientes: 'Pendientes',
	Entregadas: 'Entregadas',
	Incidencias: 'Incidencias',
};

export default function EntregasR({ navigation, route }) {
	const [activeFilter, setActiveFilter] = useState('Todas');
	const [searchText, setSearchText] = useState('');
	const [isLoadingDeliveries, setIsLoadingDeliveries] = useState(true);
	const [deliveriesError, setDeliveriesError] = useState('');
	const [realDeliveries, setRealDeliveries] = useState([]);
	const [incidentReports, setIncidentReports] = useState([
		{
			id: 'INC-DEFAULT-1',
			trackingId: 'PAK927365789',
			type: 'Cliente no estaba en la direccion',
			comment: 'Se realizo visita en horario y no hubo respuesta en domicilio.',
			photo: require('../../../images/suv_10105478.png'),
		},
	]);
	const { isDarkMode } = useDarkMode();
	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getEntregasRStyles(s, isDarkMode);

	useEffect(() => {
		if (route?.params?.initialFilter) {
			setActiveFilter(route.params.initialFilter);
		}

		if (route?.params?.newIncidentReport) {
			setIncidentReports((prev) => [route.params.newIncidentReport, ...prev]);
			navigation.setParams({ newIncidentReport: undefined, initialFilter: undefined });
		}
	}, [route?.params?.newIncidentReport, route?.params?.initialFilter, navigation]);

	useEffect(() => {
		let isCancelled = false;
		let hasLoadedOnce = false;

		async function loadDeliveries() {
			if (!hasLoadedOnce) {
				setIsLoadingDeliveries(true);
			}
			setDeliveriesError('');

			try {
				const user = getCurrentUser();
				const userId = Number(user?.id_usuario);

				if (!Number.isInteger(userId) || userId <= 0) {
					throw new Error('No hay sesión activa de chofer para cargar entregas.');
				}

				const envios = await getEnviosByUsuario(userId);
				const mapped = envios
					.filter((envio) => Boolean(envio?.asignado_al_conductor))
					.map(toDeliveryItem);

				if (!isCancelled) {
					setRealDeliveries(mapped);
				}
			} catch (error) {
				if (!isCancelled) {
					setRealDeliveries([]);
					setDeliveriesError(error.message || 'No se pudieron cargar entregas reales.');
				}
			} finally {
				if (!isCancelled) {
					setIsLoadingDeliveries(false);
				}
				hasLoadedOnce = true;
			}
		}

		loadDeliveries();
		const intervalId = setInterval(loadDeliveries, 20000);
		const unsubscribeFocus = navigation.addListener('focus', loadDeliveries);

		return () => {
			isCancelled = true;
			clearInterval(intervalId);
			unsubscribeFocus();
		};
	}, [navigation]);

	const sourceDeliveries = realDeliveries;

	const assignmentSummary = useMemo(() => {
		if (realDeliveries.length === 0) {
			return null;
		}

		return { assignedCount: realDeliveries.length };
	}, [realDeliveries]);

	const filteredDeliveries = useMemo(() => {
		const normalizedSearch = searchText.trim().toLowerCase();
		const searched = normalizedSearch
			? sourceDeliveries.filter((item) => {
				const haystack = `${item.id} ${item.name} ${item.address}`.toLowerCase();
				return haystack.includes(normalizedSearch);
			})
			: sourceDeliveries;

		switch (activeFilter) {
			case 'Pendientes':
				return searched.filter((item) => !item.done && !item.canceled && !item.hasIncident);
			case 'Entregadas':
				return searched.filter((item) => item.done);
			case 'Incidencias':
				return [];
			default:
				return searched;
		}
	}, [activeFilter, searchText, sourceDeliveries]);

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

				<View style={styles.content}>
					<View style={styles.searchWrap}>
						<TextInput
							style={styles.searchInput}
							placeholder="Buscar dirección o rastreo"
							placeholderTextColor="#7D8EB1"
							value={searchText}
							onChangeText={setSearchText}
						/>
					</View>

					{isLoadingDeliveries ? <Text style={styles.emptyText}>Cargando entregas reales...</Text> : null}
					{!isLoadingDeliveries && deliveriesError ? <Text style={styles.emptyText}>{deliveriesError}</Text> : null}
					{assignmentSummary ? (
						<Text style={styles.assignmentSummary}>
							Asignadas por operador: {assignmentSummary.assignedCount}
						</Text>
					) : null}

					<View style={styles.filtersRow}>
						{FILTER_OPTIONS.map((option) => {
							const isActive = activeFilter === option;

							return (
								<TouchableOpacity key={option} onPress={() => setActiveFilter(option)}>
									<Text style={isActive ? styles.filterText : styles.filterTextMuted}>{option}</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<View style={styles.sectionCard}>
						<Text style={styles.sectionTitle}>{SECTION_TITLES[activeFilter] || 'Todas'}</Text>

						<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
							{activeFilter === 'Incidencias'
								? incidentReports.map((report) => (
									<View key={report.id} style={styles.deliveryCard}>
										<Text style={styles.deliveryCode}>{report.trackingId}</Text>
										<Text style={styles.incidentTypeSummary}>{report.type}</Text>
										<TouchableOpacity
											style={styles.detailsBtn}
											onPress={() => navigation.navigate('DetalleIncidenciaR', { report })}
										>
											<Text style={styles.detailsBtnText}>Detalles</Text>
										</TouchableOpacity>
									</View>
								))
								: filteredDeliveries.map((item, index) => (
									<View key={`${item.id}-${index}`} style={styles.deliveryCard}>
										<View style={styles.deliveryTop}>
											<View style={styles.codeRow}>
												<View style={[styles.pinWrap, item.pinBlue && styles.pinBlue]}>
													<View style={[styles.pinDot, item.pinBlue && styles.pinDotBlue]} />
												</View>

												<Text style={styles.deliveryCode}>{item.id}</Text>
											</View>

											<TouchableOpacity
												style={[styles.actionBtn, (item.done || item.canceled) && styles.actionBtnDone]}
												onPress={() => !item.done && !item.canceled && navigation.navigate('DetalleEntregaR', { delivery: item, idEnvio: item.id_envio })}
											>
												<Text style={styles.actionText}>{item.done ? 'Entregado' : item.canceled ? 'Cancelado' : 'Ver Detalle'}</Text>
											</TouchableOpacity>
										</View>

										<Text style={styles.deliveryName}>{item.name}</Text>
										<Text style={styles.deliveryAddress}>{item.address}</Text>
										{item.asignadoAlConductor ? (
											<Text style={styles.assignedBadge}>Asignado por operador</Text>
										) : (
											<Text style={styles.availableBadge}>Pendiente de asignación operativa</Text>
										)}
									</View>
								))}

							{activeFilter === 'Incidencias' && incidentReports.length === 0 ? (
								<Text style={styles.emptyText}>No hay incidencias registradas.</Text>
							) : null}

							{activeFilter !== 'Incidencias' && filteredDeliveries.length === 0 ? (
								<Text style={styles.emptyText}>No hay entregas para este filtro.</Text>
							) : null}
						</ScrollView>
					</View>
				</View>

				<BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
