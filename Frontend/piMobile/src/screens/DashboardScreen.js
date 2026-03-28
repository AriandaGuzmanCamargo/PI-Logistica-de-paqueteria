import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import MainLayout from '../components/MainLayout';
import { getTrackingByCodigo } from '../services/trackingService.js';
import styles from '../styles/DashboardStyles';

const STATE_LABELS = {
  registrado: 'Pedido creado',
  en_transito: 'En transito',
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

  const handleRastrear = async () => {
    if (!codigo.trim()) {
      setErrorMessage('Ingresa un codigo de rastreo.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTrackingData(null);

    try {
      const data = await getTrackingByCodigo(codigo);
      setTrackingData(data);
    } catch (error) {
      setErrorMessage(error.message || 'No se encontro informacion de rastreo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout title="" navigation={navigation} activeTab="Dashboard">
      <View style={styles.welcomeWrap}>
        <Text style={styles.welcomeTitle}>Bienvenid@</Text>
        <Text style={styles.welcomeText}>Ahora puedes rastrear tus pedidos de forma rapida y sencilla.</Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.input}
          placeholder="Ingresar el numero de rastreo"
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
          <Text style={styles.cardTitle}>Nuevo Envio</Text>
          <Text style={styles.cardDesc}>Calcula costos y crea tu envio.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('DireccionesGuardadas')}>
          <Text style={styles.cardTitle}>Direcciones</Text>
          <Text style={styles.cardDesc}>Gestiona direcciones frecuentes.</Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.timelineText}>Sin eventos de rastreo aun.</Text>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio', { idEnvio: trackingData.envio?.id_envio })}>
            <Text style={styles.link}>Ver detalles completos</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </MainLayout>
  );
}
