import React, { useCallback, useState } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getCurrentUser } from '../services/sessionService';
import {
  getNotificacionesByUsuario,
  marcarNotificacionComoLeida,
  marcarTodasComoLeidas,
} from '../services/notificacionesService';
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

function formatDateTime(isoString) {
  if (!isoString) return 'Sin fecha';

  const date = new Date(isoString);
  const day = date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const time = date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${day} · ${time}`;
}

export default function NotificacionesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
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

  const handleMarkAllRead = async () => {
    try {
      const user = getCurrentUser();
      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
      }

      setIsUpdating(true);
      await marcarTodasComoLeidas(user.id_usuario);
      setNotificaciones((prev) => prev.map((item) => ({ ...item, leida: true })));
    } catch (error) {
      setErrorMessage(error.message || 'No se pudieron actualizar las notificaciones.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkOneRead = async (item) => {
    if (!item || item.leida) {
      return;
    }

    try {
      const user = getCurrentUser();
      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
      }

      await marcarNotificacionComoLeida({
        idNotificacion: item.id_notificacion,
        idUsuario: user.id_usuario,
      });

      setNotificaciones((prev) =>
        prev.map((notification) =>
          Number(notification.id_notificacion) === Number(item.id_notificacion)
            ? { ...notification, leida: true }
            : notification
        )
      );
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo marcar la notificación como leída.');
    }
  };

  const handleOpenShipment = (item) => {
    const shipmentId = Number(item?.id_envio);

    if (!Number.isInteger(shipmentId) || shipmentId <= 0) {
      return;
    }

    if (role === 'cliente') {
      navigation.navigate('DetalleEnvio', { idEnvio: shipmentId });
      return;
    }

    if (role === 'conductor') {
      navigation.navigate('DetalleEntregaR', { idEnvio: shipmentId });
    }
  };

  return (
    <MainLayout title="Notificaciones" navigation={navigation} backTo="MenuUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.roleWrap}>
        <Text style={styles.roleText}>Mostrando notificaciones para rol: {roleLabel}</Text>
      </View>

      {!isLoading && !errorMessage && notificaciones.length > 0 ? (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, isUpdating && styles.actionBtnDisabled]}
            onPress={handleMarkAllRead}
            disabled={isUpdating}
          >
            <Text style={styles.actionBtnText}>{isUpdating ? 'Actualizando...' : 'Marcar todas como leídas'}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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
            <TouchableOpacity
              style={[styles.card, item.leida ? styles.cardRead : null]}
              key={item.id_notificacion}
              onPress={() => handleMarkOneRead(item)}
              activeOpacity={0.85}
            >
              <View style={styles.row}>
                <Text style={styles.title}>{item.titulo || 'Notificación'}</Text>
                <Text style={styles.time}>{formatRelativeDate(item.fecha)}</Text>
              </View>
              <Text style={styles.message}>{item.mensaje || 'Sin contenido'}</Text>

              {item.fecha_evento ? (
                <Text style={styles.deliveryMeta}>Entrega: {formatDateTime(item.fecha_evento)}</Text>
              ) : null}

              {item.recibio_entrega_nombre ? (
                <Text style={styles.deliveryMeta}>Recibió: {item.recibio_entrega_nombre}</Text>
              ) : null}

              {item.id_envio ? (
                <TouchableOpacity style={styles.linkBtn} onPress={() => handleOpenShipment(item)}>
                  <Text style={styles.linkBtnText}>Ver envío #{item.id_envio}</Text>
                </TouchableOpacity>
              ) : null}

              {item.foto_entrega_url ? (
                <Image
                  source={{ uri: item.foto_entrega_url }}
                  style={styles.deliveryPhoto}
                  resizeMode="cover"
                />
              ) : null}
            </TouchableOpacity>
          ))
        : null}
    </MainLayout>
  );
}
