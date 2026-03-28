import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MainLayout from '../components/MainLayout';
import { getTrackingByCodigo } from '../services/trackingService.js';
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
  en_transito: 'En transito',
  entregado: 'Entregado',
  retrasado: 'Retrasado',
  perdido: 'Perdido',
};

export default function RastrearEnvioScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleRastrear = async () => {
    if (!codigo.trim()) {
      setErrorMessage('Ingresa un codigo de rastreo');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTrackingData(null);

    try {
      const data = await getTrackingByCodigo(codigo);
      setTrackingData(data);
    } catch (error) {
      setErrorMessage(error.message || 'No se encontro el envio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="Rastrear Envio" navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.input}
            placeholder="Ingresar codigo de rastreo"
            placeholderTextColor="#9AA4BF"
            value={codigo}
            onChangeText={setCodigo}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleRastrear} disabled={isLoading}>
            <Text style={styles.searchBtnText}>{isLoading ? '...' : 'Rastrear'}</Text>
          </TouchableOpacity>
        </View>

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
              <Text style={styles.timelineText}>Sin eventos de rastreo aun</Text>
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
