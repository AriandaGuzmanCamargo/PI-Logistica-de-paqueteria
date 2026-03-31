import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getTrackingByCodigo } from '../services/trackingService.js';
import { getCurrentUser } from '../services/sessionService';
import { addTrackingHistoryEntry, getTrackingHistoryByUser } from '../services/trackingHistoryService';
import styles from '../styles/RastrearEnvioStyles';

function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) + ' ' + date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

const STATE_LABELS = {
  registrado: 'Pedido creado',
  en_transito: 'En tránsito',
  entregado: 'Entregado',
  retrasado: 'Retrasado',
  perdido: 'Perdido',
};

export default function RastrearEnvioScreen({ navigation }) {
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
      setErrorMessage('Ingresa un código de rastreo');
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
      setErrorMessage(error.message || 'No se encontró el envío');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="Rastrear Envío" navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.descriptionWrap}>
          <Text style={styles.descriptionText}>Ingresa el código de rastreo que se encuentra en tu paquete para consultar su estado actual y conocer el progreso de tu envío</Text>
        </View>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.input}
            placeholder="Ingresar código de rastreo"
            placeholderTextColor="#9AA4BF"
            value={codigo}
            onChangeText={setCodigo}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleRastrear} disabled={isLoading}>
            <Text style={styles.searchBtnText}>{isLoading ? '...' : 'Rastrear'}</Text>
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

        {errorMessage ? (
          <View style={styles.errorWrap}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Buscando rastreo...</Text>
          </View>
        ) : null}

        {trackingData ? (
          <View style={styles.card}>
            <Text style={styles.id}>{trackingData.paquete?.codigo_rastreo || codigo.toUpperCase()}</Text>
            <Text style={styles.date}>{formatDate(trackingData.envio?.fecha_creacion)}</Text>

            {trackingData.tracking && trackingData.tracking.length > 0 ? (
              trackingData.tracking.map((event, index) => (
                <View key={event.id_tracking || index} style={index === 0 ? styles.timelineRowCurrent : styles.timelineRow}>
                  <View style={index === 0 ? styles.dotCurrent : styles.dot} />
                  <View style={{ flex: 1 }}>
                    <Text style={index === 0 ? styles.timelineCurrentText : styles.timelineText}>
                      {STATE_LABELS[event.estado_paquete] || event.estado_paquete}
                    </Text>
                    {event.ubicacion_actual ? <Text style={styles.timelineLocation}>{event.ubicacion_actual}</Text> : null}
                    <Text style={styles.timelineDate}>{formatDateTime(event.fecha_hora)}</Text>
                    {event.observaciones ? <Text style={styles.timelineObservacion}>{event.observaciones}</Text> : null}
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.timelineText}>Sin eventos de rastreo aún</Text>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio', { idEnvio: trackingData.envio?.id_envio })}>
              <Text style={styles.link}>Ver detalles completos</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </MainLayout>
  );
}
