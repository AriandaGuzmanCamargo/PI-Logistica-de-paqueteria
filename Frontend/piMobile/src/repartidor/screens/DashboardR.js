import React from 'react';
import {
	Platform,SafeAreaView,ScrollView,StatusBar,Text,TextInput,
	TouchableOpacity,View,useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import getDashboardRStyles from '../styles/DashboardRStyles';
import BottomNavR from '../components/BottomNavR';
import UserAvatarR from '../components/UserAvatarR';
import HeaderLogoR from '../components/HeaderLogoR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function DashboardR({ navigation }) {
	const { width } = useWindowDimensions();
	const { isDarkMode } = useDarkMode();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getDashboardRStyles(s, isDarkMode);

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

			<View style={styles.header}>
				<View style={styles.brandWrap}>
					<HeaderLogoR s={s} />
					<Text style={styles.brandText}>METZVIA</Text>
				</View>

				<View style={styles.headerRight}>
					<UserAvatarR s={s} />
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.welcome}>Bienvenido, Juan Perez</Text>
				<View style={styles.serviceRow}>
					<View style={styles.onlineDot} />
					<Text style={styles.serviceText}>En servicio</Text>
				</View>

				<View style={styles.statsRow}>
					<TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('EntregasR')}>
						<View style={styles.statIconBlue}><Text style={styles.statIconText}>OK</Text></View>
						<View>
							<Text style={styles.statTitle}>Entregas</Text>
							<Text style={styles.statValue}>9</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.statCard}
						onPress={() => navigation.navigate('EntregasR', { initialFilter: 'Pendientes' })}
					>
						<View style={styles.statIconGold}><Text style={styles.statIconText}>..</Text></View>
						<View>
							<Text style={styles.statTitle}>Pendientes</Text>
							<Text style={styles.statValue}>6</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.singleBox} />

				<View style={styles.card}>
					<View style={styles.searchRow}>
						<View style={styles.searchInputWrap}>
							<Text style={styles.searchPrefix}>Q</Text>
							<TextInput
								style={styles.searchInput}
								placeholder="Buscar direccion o rastreo"
								placeholderTextColor="#7D89AD"
							/>
						</View>
					</View>

					<View style={styles.sortRow}>
						<Text style={styles.sortText}>Mostrar: Todas</Text>
					</View>

					<View style={styles.singleRecord}>
						<View style={styles.recordTopRow}>
							<View style={styles.recordIdWrap}>
								<View style={styles.recordDot} />
								<Text style={styles.recordId}>PAK123456789</Text>
							</View>
							<Text style={styles.recordTime}>10:00 - 11:00</Text>
						</View>

						<View style={styles.recordBottomRow}>
							<View style={styles.recordInfo}>
								<Text style={styles.recordName}>Ana Martinez</Text>
								<Text style={styles.recordAddress}>Av. Universidad 103, CDMX</Text>
							</View>
							<TouchableOpacity style={styles.recordActionBtn}>
								<Text style={styles.recordActionText}>Marcar entregado</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={[styles.card, styles.tipCard]}>
					<View style={styles.tipTextWrap}>
						<Text style={styles.tipTitle}>Consejo del dia</Text>
						<Text style={styles.tipBody}>Asegura y etiqueta los paquetes antes de salir para evitar retrasos.</Text>
						<TouchableOpacity>
							<Text style={styles.tipLink}>Leer mas &gt;</Text>
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
