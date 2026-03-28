import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getCurrentUser } from '../services/sessionService';
import { getEnviosByUsuario } from '../services/enviosService';
import styles from '../styles/MisEnviosStyles';

function formatDate(isoString) {
  if (!isoString) return 'Sin fecha';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatStatus(status) {
  const map = {
    pendiente: 'Pendiente',
    en_ruta: 'En ruta',
    entregado: 'Entregado',
    cancelado: 'Cancelado',
    retrasado: 'Retrasado',
  };

  return map[status] || status || 'Sin estado';
}

export default function MisEnviosScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [envios, setEnvios] = useState([]);

  const loadEnvios = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
      }

      const data = await getEnviosByUsuario(user.id_usuario);
      setEnvios(data);
    } catch (error) {
      setErrorMessage(error.message || 'No se pudieron cargar tus envios.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEnvios();
    }, [loadEnvios])
  );

  return (
    <MainLayout title="Mis Envios" navigation={navigation} backTo="MenuUsuario" activeTab="RastrearEnvio">
      <View style={styles.tabsRow}>
        <Text style={styles.tabActive}>Todos</Text>
        <Text style={styles.tab}>Activos</Text>
        <Text style={styles.tab}>Entregados</Text>
      </View>

      {isLoading ? (
        <View style={styles.stateWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Cargando envios...</Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.stateWrap}>
          <Text style={[styles.stateText, styles.stateError]}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && envios.length === 0 ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateText}>Aun no tienes envios registrados.</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage
        ? envios.map((envio) => (
            <View style={styles.card} key={envio.id_envio}>
              <Text style={styles.id}>{envio.paquete?.codigo_rastreo || `ENV-${envio.id_envio}`}</Text>
              <Text style={styles.date}>{formatDate(envio.fecha_creacion)}</Text>
              <Text style={styles.status}>{formatStatus(envio.estado_envio)}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio', { idEnvio: envio.id_envio })}>
                <Text style={styles.link}>Ver detalles completos</Text>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </MainLayout>
  );
}
