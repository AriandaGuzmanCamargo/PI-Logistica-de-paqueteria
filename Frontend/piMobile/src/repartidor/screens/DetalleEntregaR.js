import React from 'react';
import {
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
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function DetalleEntregaR({ navigation }) {
	const { width } = useWindowDimensions();
	const { isDarkMode } = useDarkMode();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getDetalleEntregaRStyles(s, isDarkMode);

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
						<Text style={styles.idText}>PAK123456789</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.receiverRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinCenter} />
							</View>

							<View style={styles.receiverInfo}>
								<Text style={styles.receiverName}>Ana Martinez</Text>
								<Text style={styles.addressText}>L 103 Amalianense, Sulf., 123, Col. Roma Norte, CDMX</Text>
								<Text style={styles.phoneText}>+52 55 1234 5678</Text>
							</View>
						</View>

						<Text style={styles.infoLine}>Departamento 5-D, Entrada por la calle Almaden. El edificio tiene un porton negro.</Text>
						<Text style={styles.infoLine}>Horario de entrega: <Text style={styles.infoStrong}>10:00 - 11:00 AM</Text></Text>

						<View style={styles.mapArea} />

						<View style={styles.metricsRow}>
							<Text style={styles.metricText}>Distancia: <Text style={styles.infoStrong}>3.2 km</Text></Text>
							<Text style={styles.metricText}>Tiempo Estimado: <Text style={styles.infoStrong}>8 min</Text></Text>
						</View>

						<View style={styles.actionRow}>
							<TouchableOpacity style={[styles.actionButton, styles.successBtn]}>
								<Text style={styles.actionText}>Marcar como Entregado</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.actionButton, styles.failBtn]}>
								<Text style={styles.actionText}>Intento Fallido</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('IncidenciasR')}>
							<Text style={styles.actionText}>Reportar Incidencia</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
