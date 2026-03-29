import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import getNotificacionesRStyles from '../styles/NotificacionesRStyles';
import TopHeaderR from '../components/TopHeaderR';
import { useDarkMode } from '../context/DarkModeContext';
import { getCurrentUser } from '../../services/sessionService';
import { getNotificacionesByUsuario } from '../../services/notificacionesService';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function formatRelativeDate(isoString) {
  if (!isoString) return 'Sin fecha';

  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Ahora';
  if (diffMin < 60) return `Hace ${diffMin} min`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Hace ${diffHours} h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Ayer';
  return `Hace ${diffDays} dias`;
}

function NotificationCard({ item, styles }) {
	const isRead = item?.leida === true;

	return (
		<View style={styles.notificationCard}>
			<View style={[styles.notificationDot, isRead ? styles.dotConfirmed : styles.dotAssigned]} />
			<View style={styles.notificationBody}>
				<Text style={styles.notificationId}>{item.titulo || 'Notificacion'}</Text>
				<Text style={styles.notificationText}>{item.mensaje || 'Sin detalle'}</Text>
				<Text style={styles.notificationText}>{formatRelativeDate(item.fecha)}</Text>
			</View>
		</View>
	);
}

export default function NotificacionesR({ navigation }) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [notificaciones, setNotificaciones] = useState([]);

	const loadNotificaciones = useCallback(async () => {
		try {
			setIsLoading(true);
			setErrorMessage('');

			const user = getCurrentUser();

			if (!user?.id_usuario) {
				throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
			}

			const data = await getNotificacionesByUsuario(user.id_usuario);
			setNotificaciones(data);
		} catch (error) {
			setErrorMessage(error.message || 'No se pudieron cargar las notificaciones.');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadNotificaciones();
		}, [loadNotificaciones])
	);

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

				<TopHeaderR s={s} navigation={navigation} />

				<ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
					<View style={styles.sectionCard}>
						<Text style={styles.sectionTitle}>Notificaciones</Text>
						<View style={styles.listWrap}>
							{isLoading ? (
								<View style={styles.stateWrap}>
									<ActivityIndicator size="small" color={colors.primary} />
									<Text style={styles.stateText}>Cargando...</Text>
								</View>
							) : null}

							{!isLoading && errorMessage ? (
								<View style={styles.stateWrap}>
									<Text style={[styles.stateText, styles.stateError]}>{errorMessage}</Text>
								</View>
							) : null}

							{!isLoading && !errorMessage && notificaciones.length === 0 ? (
								<View style={styles.stateWrap}>
									<Text style={styles.stateText}>No tienes notificaciones por ahora.</Text>
								</View>
							) : null}

							{!isLoading && !errorMessage
								? notificaciones.map((item) => (
										<NotificationCard key={item.id_notificacion} item={item} styles={styles} />
								  ))
								: null}
						</View>
					</View>
				</ScrollView>

				<BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />
			</SafeAreaView>
		</View>
	);
}
