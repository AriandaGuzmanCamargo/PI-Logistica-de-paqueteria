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
import getRutaRStyles from '../styles/RutaRStyles';
import BottomNavR from '../components/BottomNavR';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function RutaR({ navigation }) {
	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getRutaRStyles(s);

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

				<View style={styles.topHeader}>
					<Text style={styles.topHeaderTitle}>Ruta del Dia</Text>
				</View>

				<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
					<View style={styles.mapCard} />

					<View style={styles.card}>
						<View style={styles.clientRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinDot} />
							</View>
							<View style={styles.clientInfo}>
								<Text style={styles.clientName}>Ana Martinez</Text>
								<Text style={styles.clientAddress}>103 Amalianez, Sulf., 123, Col. Roma Norte, CDMX</Text>
							</View>
						</View>

						<Text style={styles.phone}>+52 55 1234 5678</Text>

						<View style={styles.metricsRow}>
							<Text style={styles.metricText}>Distancia total: <Text style={styles.metricStrong}>16 km</Text></Text>
							<Text style={styles.metricText}>Tiempo estimado: <Text style={styles.metricStrong}>48 min</Text></Text>
						</View>

						<TouchableOpacity style={styles.startBtn}>
							<Text style={styles.startBtnText}>Iniciar navegacion</Text>
						</TouchableOpacity>
					</View>

				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Ruta" />
			</SafeAreaView>
		</View>
	);
}
