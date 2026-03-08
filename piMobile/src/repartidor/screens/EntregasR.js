import React from 'react';
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

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const deliveries = [
	{
		id: 'PAK927365789',
		name: 'Ana Martinez',
		address: 'L103 Amailanesz, Sulf., 123\nCol. Roma Norte, CDMX - PAK123456789',
		done: false,
		pinBlue: false,
	},
	{
		id: 'PAK927365789',
		name: 'Ana Martinez',
		address: 'L103 Amailanesz, Sulf., 123\nCol. Roma Norte, CDMX - PAK123456789',
		done: false,
		pinBlue: false,
	},
	{
		id: 'PAK967654035',
		name: 'Laura Gomez',
		address: 'Av. Revolucion 996, Col.\nDel Valle, CDMX',
		done: true,
		pinBlue: true,
	},
	{
		id: 'PAK9676554035',
		name: 'Laura Gomez',
		address: 'Av. Revolucion 996, Col.\nDel Valle, CDMX',
		done: false,
		pinBlue: true,
	},
];

export default function EntregasR({ navigation }) {
	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getEntregasRStyles(s);

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
					<Text style={styles.topHeaderTitle}>Mis Entregas</Text>
					<View style={styles.avatarCircle} />
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
						<Text style={styles.filterText}>Todas </Text>
						<Text style={styles.filterTextMuted}>Pendientes</Text>
						<Text style={styles.filterTextMuted}>Entregadas</Text>
						<Text style={styles.filterTextMuted}>Incidencias</Text>
					</View>

					<View style={styles.sectionCard}>
						<Text style={styles.sectionTitle}>Entregas Asignadas</Text>

						<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
							{deliveries.map((item, index) => (
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
						</ScrollView>
					</View>
				</View>

				<BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
