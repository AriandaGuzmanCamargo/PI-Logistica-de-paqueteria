import React from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import UserAvatarR from '../components/UserAvatarR';
import getNotificacionesRStyles from '../styles/NotificacionesRStyles';
import HeaderLogoR from '../components/HeaderLogoR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const newAssignedOrders = [
	{ id: 'PAK938471200', text: 'Nuevo pedido asignado en Col. Del Valle, CDMX.' },
	{ id: 'PAK938471455', text: 'Nuevo pedido asignado en Av. Universidad 421.' },
	{ id: 'PAK938472101', text: 'Pedido prioritario asignado en Roma Norte.' },
];

const confirmedDeliveries = [
	{ id: 'PAK927365789', text: 'Entrega confirmada por Ana Martinez.' },
	{ id: 'PAK967654035', text: 'Entrega confirmada por Laura Gomez.' },
	{ id: 'PAK987654320', text: 'Entrega confirmada en Benito Juarez.' },
];

function NotificationCard({ item, styles, type }) {
	const isAssigned = type === 'assigned';

	return (
		<View style={styles.notificationCard}>
			<View style={[styles.notificationDot, isAssigned ? styles.dotAssigned : styles.dotConfirmed]} />
			<View style={styles.notificationBody}>
				<Text style={styles.notificationId}>{item.id}</Text>
				<Text style={styles.notificationText}>{item.text}</Text>
			</View>
		</View>
	);
}

export default function NotificacionesR({ navigation }) {
	const { isDarkMode } = useDarkMode();
	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getNotificacionesRStyles(s, isDarkMode);

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
						<Text style={styles.topHeaderTitle}>Notificaciones</Text>
					</View>
					<UserAvatarR s={s} />
				</View>

				<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
					<View style={styles.sectionCard}>
						<Text style={styles.sectionTitle}>Pedidos Nuevos Asignados</Text>
						<View style={styles.listWrap}>
							{newAssignedOrders.map((item) => (
								<NotificationCard key={item.id} item={item} styles={styles} type="assigned" />
							))}
						</View>
					</View>

					<View style={styles.sectionCard}>
						<Text style={styles.sectionTitle}>Entregas Confirmadas</Text>
						<View style={styles.listWrap}>
							{confirmedDeliveries.map((item) => (
								<NotificationCard key={item.id} item={item} styles={styles} type="confirmed" />
							))}
						</View>
					</View>
				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
