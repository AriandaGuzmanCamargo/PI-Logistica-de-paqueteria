import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import MainLayout from '../components/MainLayout';
import { getTrackingByCodigo } from '../services/trackingService.js';
import { getCurrentUser } from '../services/sessionService';
import { addTrackingHistoryEntry, getTrackingHistoryByUser } from '../services/trackingHistoryService';
import styles from '../styles/DashboardStyles';

const STATE_LABELS = {
  registrado: 'Pedido creado',
  en_transito: 'En tránsito',
  entregado: 'Entregado',
  retrasado: 'Retrasado',
  perdido: 'Perdido',
};

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DashboardScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  const loadHistory = () => {
    const currentUser = getCurrentUser();

    if (!currentUser?.id_usuario) {
      setTrackingHistory([]);
      return;
    }

    setTrackingHistory(getTrackingHistoryByUser(currentUser.id_usuario));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
      return undefined;
    }, [])
  );

  const handleRastrear = async (codigoParam) => {
    const codigoBusqueda = String(codigoParam ?? codigo).trim();

    if (!codigoBusqueda) {
      setErrorMessage('Ingresa un código de rastreo.');
      return;
    }

    setCodigo(codigoBusqueda);
    setIsLoading(true);
    setErrorMessage('');
    setTrackingData(null);

    try {
      const data = await getTrackingByCodigo(codigoBusqueda);
      setTrackingData(data);

      const currentUser = getCurrentUser();
      if (currentUser?.id_usuario) {
        const updatedHistory = addTrackingHistoryEntry({
          idUsuario: currentUser.id_usuario,
          codigo: codigoBusqueda,
          trackingData: data,
        });
        setTrackingHistory(updatedHistory);
      }
    } catch (error) {
      setErrorMessage(error.message || 'No se encontró información de rastreo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="" navigation={navigation} activeTab="Dashboard">
      <View style={styles.welcomeWrap}>
        <Text style={styles.welcomeTitle}>Bienvenid@</Text>
        <Text style={styles.welcomeText}>Ahora puedes rastrear tus pedidos de forma rápida y sencilla.</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.input}
          placeholder="Ingresar el número de rastreo"
          placeholderTextColor="#9AA4BF"
          value={codigo}
          onChangeText={setCodigo}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleRastrear} disabled={isLoading}>
          <Text style={styles.searchBtnText}>Rastrear</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View style={styles.feedbackWrap}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {isLoading ? (
        <View style={styles.feedbackWrap}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Buscando rastreo...</Text>
        </View>
      ) : null}

      <View style={styles.grid}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('NuevoEnvio')}>
          <Text style={styles.cardTitle}>Nuevo Envío</Text>
          <Text style={styles.cardDesc}>Calcula costos y crea tu envío.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('DireccionesGuardadas')}>
          <Text style={styles.cardTitle}>Direcciones</Text>
          <Text style={styles.cardDesc}>Gestiona direcciones frecuentes.</Text>
        </TouchableOpacity>
      </View>

      {trackingHistory.length > 0 ? (
        <View style={styles.historyWrap}>
          <Text style={styles.historyTitle}>Historial de búsqueda</Text>
          <View style={styles.historyList}>
            {trackingHistory.map((item) => (
              <TouchableOpacity
                key={item.codigo}
                style={styles.historyItem}
                onPress={() => handleRastrear(item.codigo)}
                disabled={isLoading}
              >
                <Text style={styles.historyCode}>{item.codigo}</Text>
                {item.estado ? <Text style={styles.historyState}>{STATE_LABELS[item.estado] || item.estado}</Text> : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      {trackingData ? (
        <View style={styles.trackCard}>
          <Text style={styles.trackId}>{trackingData.paquete?.codigo_rastreo || codigo.toUpperCase()}</Text>
          <Text style={styles.trackDate}>{formatDate(trackingData.envio?.fecha_creacion)}</Text>

          {trackingData.tracking && trackingData.tracking.length > 0 ? (
            trackingData.tracking.map((event, index) => (
              <View key={event.id_tracking || index} style={index === 0 ? styles.timelineRowCurrent : styles.timelineRow}>
                <View style={index === 0 ? styles.dotCurrent : styles.dot} />
                <Text style={index === 0 ? styles.timelineCurrentText : styles.timelineText}>
                  {STATE_LABELS[event.estado_paquete] || event.estado_paquete}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.timelineText}>Sin eventos de rastreo aún.</Text>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio', { idEnvio: trackingData.envio?.id_envio })}>
            <Text style={styles.link}>Ver detalles completos</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </MainLayout>
  );
}
