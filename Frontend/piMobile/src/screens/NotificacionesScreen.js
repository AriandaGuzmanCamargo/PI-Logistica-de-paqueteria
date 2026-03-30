import React, { useCallback, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getCurrentUser } from '../services/sessionService';
import { getNotificacionesByUsuario } from '../services/notificacionesService';
import styles from '../styles/NotificacionesStyles';

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
  return `Hace ${diffDays} días`;
}

export default function NotificacionesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [notificaciones, setNotificaciones] = useState([]);

  const loadNotificaciones = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
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

  const role = String(getCurrentUser()?.rol || '').toLowerCase();
  const roleLabel = role === 'conductor' ? 'Conductor' : role === 'cliente' ? 'Cliente' : 'Usuario';

  return (
    <MainLayout title="Notificaciones" navigation={navigation} backTo="MenuUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.roleWrap}>
        <Text style={styles.roleText}>Mostrando notificaciones para rol: {roleLabel}</Text>
      </View>

      {isLoading ? (
        <View style={styles.stateWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Cargando notificaciones...</Text>
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
            <View style={styles.card} key={item.id_notificacion}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.titulo || 'Notificación'}</Text>
                <Text style={styles.time}>{formatRelativeDate(item.fecha)}</Text>
              </View>
              <Text style={styles.message}>{item.mensaje || 'Sin contenido'}</Text>
            </View>
          ))
        : null}
    </MainLayout>
  );
}
