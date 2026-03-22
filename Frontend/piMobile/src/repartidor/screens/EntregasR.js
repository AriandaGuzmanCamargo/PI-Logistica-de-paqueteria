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
import UserAvatarR from '../components/UserAvatarR';
import HeaderLogoR from '../components/HeaderLogoR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const deliveries = [
	{
		id: 'PAK927365789',
		name: 'Ana Martinez',
		address: 'L103 Amailanesz, Sulf., 123\nCol. Roma Norte, CDMX - PAK123456789',
		done: false,
		hasIncident: false,
		pinBlue: false,
	},
	{
		id: 'PAK927365789',
		name: 'Ana Martinez',
		address: 'L103 Amailanesz, Sulf., 123\nCol. Roma Norte, CDMX - PAK123456789',
		done: false,
		hasIncident: true,
		pinBlue: false,
	},
	{
		id: 'PAK967654035',
		name: 'Laura Gomez',
		address: 'Av. Revolucion 996, Col.\nDel Valle, CDMX',
		done: true,
		hasIncident: false,
		pinBlue: true,
	},
	{
		id: 'PAK9676554035',
		name: 'Laura Gomez',
		address: 'Av. Revolucion 996, Col.\nDel Valle, CDMX',
		done: false,
		hasIncident: false,
		pinBlue: true,
	},
];

const FILTER_OPTIONS = ['Todas', 'Pendientes', 'Entregadas', 'Incidencias'];
const SECTION_TITLES = {
	Todas: 'Todas',
	Pendientes: 'Pendientes',
	Entregadas: 'Entregadas',
	Incidencias: 'Incidencias',
};

export default function EntregasR({ navigation, route }) {
	const [activeFilter, setActiveFilter] = useState('Todas');
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

	const filteredDeliveries = useMemo(() => {
		switch (activeFilter) {
			case 'Pendientes':
				return deliveries.filter((item) => !item.done && !item.hasIncident);
			case 'Entregadas':
				return deliveries.filter((item) => item.done);
			case 'Incidencias':
				return [];
			default:
				return deliveries;
		}
	}, [activeFilter]);

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

				<View style={styles.topHeader}>
					<View style={styles.topHeaderLeft}>
						<HeaderLogoR s={s} />
						<Text style={styles.topHeaderTitle}>Mis Entregas</Text>
					</View>
					<UserAvatarR s={s} />
				</View>

				<View style={styles.content}>
					<View style={styles.secondTitleRow}>
						<Text style={styles.secondTitle}>Mis Entregas</Text>
					</View>

					<View style={styles.searchWrap}>
						<TextInput
							style={styles.searchInput}
							placeholder="Buscar direccion o rastreo"
							placeholderTextColor="#7D8EB1"
						/>
					</View>

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
												style={[styles.actionBtn, item.done && styles.actionBtnDone]}
												onPress={() => !item.done && navigation.navigate('DetalleEntregaR')}
											>
												<Text style={styles.actionText}>{item.done ? 'Entregado' : 'Ver Detalle'}</Text>
											</TouchableOpacity>
										</View>

										<Text style={styles.deliveryName}>{item.name}</Text>
										<Text style={styles.deliveryAddress}>{item.address}</Text>
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
