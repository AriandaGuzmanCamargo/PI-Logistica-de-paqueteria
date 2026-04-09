import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/RastrearPublicoStyles';
import { getTrackingPublico } from '../services/trackingService';

const STATE_LABELS = {
  registrado: 'Pedido creado',
  en_transito: 'En transito',
  entregado: 'Entregado',
  retrasado: 'Retrasado',
  perdido: 'Perdido',
  cancelado: 'Cancelado',
};

function formatDateTime(value) {
  if (!value) {
    return 'Sin fecha';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Sin fecha';
  }

  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function normalizeCode(value) {
  return String(value || '').trim().toUpperCase();
}

function normalizePhone(value) {
  return String(value || '').replace(/\D+/g, '');
}

export default function RastrearPublicoScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const currentStatusLabel = useMemo(() => {
    const status = String(trackingData?.envio?.estado_envio || trackingData?.paquete?.estado_actual || '').toLowerCase();
    return STATE_LABELS[status] || status || 'Sin estatus';
  }, [trackingData]);

  const handleConsultar = async () => {
    const codigoNormalizado = normalizeCode(codigo);
    const correoNormalizado = String(correo || '').trim().toLowerCase();
    const telefonoNormalizado = normalizePhone(telefono);

    if (!codigoNormalizado) {
      setErrorMessage('Ingresa un codigo de rastreo.');
      return;
    }

    if (!correoNormalizado && !telefonoNormalizado) {
      setErrorMessage('Ingresa correo o telefono para validar la consulta.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTrackingData(null);

    try {
      const data = await getTrackingPublico({
        codigo: codigoNormalizado,
        correo: correoNormalizado,
        telefono: telefonoNormalizado,
      });
      setTrackingData(data);
    } catch (error) {
      setErrorMessage(error.message || 'No fue posible consultar el rastreo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#1A2D50', '#2A4A7A', '#3B6AAA', '#4A7EC0', '#5A90D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />
        <View style={styles.waveThree} />

        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backBtn}>
                  <Text style={styles.backBtnText}>Volver</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <Text style={styles.title}>Rastreo sin cuenta</Text>
                <Text style={styles.subtitle}>
                  Consulta el estado de tu envio con tu codigo de rastreo y valida con correo o telefono.
                </Text>

                <Text style={styles.inputLabel}>Codigo de rastreo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. MTZ123456789"
                  placeholderTextColor="#9AA4BF"
                  autoCapitalize="characters"
                  value={codigo}
                  onChangeText={setCodigo}
                />

                <Text style={styles.inputLabel}>Correo (opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="cliente@correo.com"
                  placeholderTextColor="#9AA4BF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={correo}
                  onChangeText={setCorreo}
                />

                <Text style={styles.inputLabel}>Telefono (opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10 digitos"
                  placeholderTextColor="#9AA4BF"
                  keyboardType="phone-pad"
                  value={telefono}
                  onChangeText={setTelefono}
                />

                <Text style={styles.helperText}>Debes capturar al menos uno: correo o telefono.</Text>

                {errorMessage ? (
                  <View style={styles.errorWrap}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
                  disabled={isLoading}
                  onPress={handleConsultar}
                >
                  <LinearGradient
                    colors={['#E9CD7A', '#DBAC35', '#E9CD7A']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.primaryBtnGradient}
                  >
                    <Text style={styles.primaryBtnText}>Consultar envio</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {isLoading ? (
                  <View style={styles.loadingWrap}>
                    <ActivityIndicator size="small" color="#1D4E89" />
                    <Text style={styles.loadingText}>Consultando rastreo...</Text>
                  </View>
                ) : null}

                {trackingData ? (
                  <View style={styles.resultCard}>
                    <Text style={styles.resultCode}>{trackingData?.paquete?.codigo_rastreo || normalizeCode(codigo)}</Text>
                    <Text style={styles.resultSummary}>
                      Envio #{trackingData?.envio?.id_envio || '-'} · {trackingData?.envio?.ciudad_origen || 'Origen'} a {trackingData?.envio?.ciudad_destino || 'Destino'}
                    </Text>

                    <View style={styles.statusPill}>
                      <Text style={styles.statusPillText}>{currentStatusLabel}</Text>
                    </View>

                    <View style={styles.timelineWrap}>
                      {(trackingData?.tracking || []).length === 0 ? (
                        <View style={styles.timelineRow}>
                          <View style={[styles.timelineDot, styles.timelineDotCurrent]} />
                          <View>
                            <Text style={styles.timelineState}>Sin eventos todavia</Text>
                            <Text style={styles.timelineMeta}>Vuelve a consultar en unos minutos.</Text>
                          </View>
                        </View>
                      ) : (
                        trackingData.tracking.map((event, index) => (
                          <View key={`${event.id_tracking || 'ev'}-${index}`} style={styles.timelineRow}>
                            <View style={[styles.timelineDot, index === 0 && styles.timelineDotCurrent]} />
                            <View style={{ flex: 1 }}>
                              <Text style={styles.timelineState}>
                                {STATE_LABELS[String(event.estado_paquete || '').toLowerCase()] || event.estado_paquete || 'Actualizacion'}
                              </Text>
                              <Text style={styles.timelineMeta}>
                                {(event.ubicacion_actual || 'Ubicacion sin detalle')} · {formatDateTime(event.fecha_hora)}
                              </Text>
                              {event.observaciones ? <Text style={styles.timelineNote}>{event.observaciones}</Text> : null}
                            </View>
                          </View>
                        ))
                      )}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
