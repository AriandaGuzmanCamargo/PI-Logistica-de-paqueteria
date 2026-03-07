import React from 'react';
import {
	Image,
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
import getDashboardRStyles from '../styles/DashboardRStyles';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function DashboardR() {
	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getDashboardRStyles(s);

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

			<View style={styles.header}>
				<View style={styles.brandWrap}>
					<Image
						source={require('../../../images/logoSinFondo.png')}
						style={styles.headerLogo}
						resizeMode="contain"
					/>
					<Text style={styles.brandText}>METZVIA</Text>
				</View>

				<View style={styles.headerRight}>
					<View style={styles.bellWrap}>
						<Text style={styles.bellText}>o</Text>
						<View style={styles.bellBadge}>
							<Text style={styles.bellBadgeText}>1</Text>
						</View>
					</View>

					<View style={styles.avatarCircle}>
						<Text style={styles.avatarText}>JP</Text>
					</View>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.welcome}>Bienvenido, Juan Perez</Text>
				<View style={styles.serviceRow}>
					<View style={styles.onlineDot} />
					<Text style={styles.serviceText}>En servicio</Text>
				</View>

				<View style={styles.statsRow}>
					<View style={styles.statCard}>
						<View style={styles.statIconBlue}><Text style={styles.statIconText}>OK</Text></View>
						<View>
							<Text style={styles.statTitle}>Entregas</Text>
							<Text style={styles.statValue}>9</Text>
						</View>
					</View>

					<View style={styles.statCard}>
						<View style={styles.statIconGold}><Text style={styles.statIconText}>..</Text></View>
						<View>
							<Text style={styles.statTitle}>Pendientes</Text>
							<Text style={styles.statValue}>6</Text>
						</View>
					</View>
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

			<View style={styles.bottomNav}>
				<TouchableOpacity style={styles.navItem}>
					<View style={[styles.navDot, styles.navDotActive]} />
					<Text style={[styles.navLabel, styles.navLabelActive]}>Inicio</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<View style={styles.navDot} />
					<Text style={styles.navLabel}>Entregas</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<View style={styles.navDot} />
					<Text style={styles.navLabel}>Ruta</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<View style={styles.navDot} />
					<Text style={styles.navLabel}>Alertas</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navItem}>
					<View style={styles.navDot} />
					<Text style={styles.navLabel}>Perfil</Text>
				</TouchableOpacity>
			</View>
			</SafeAreaView>
		</View>
	);
}
