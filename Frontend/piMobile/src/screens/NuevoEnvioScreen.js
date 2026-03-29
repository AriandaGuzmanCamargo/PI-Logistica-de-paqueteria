import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getCurrentUser } from '../services/sessionService';
import { getDireccionesByUsuario } from '../services/direccionesService';
import styles from '../styles/NuevoEnvioStyles';

export default function NuevoEnvioScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [direcciones, setDirecciones] = useState([]);

  const loadDirecciones = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
      }

      const data = await getDireccionesByUsuario(user.id_usuario);
      setDirecciones(data);
    } catch (error) {
      setErrorMessage(error.message || 'No se pudieron cargar las direcciones guardadas.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDirecciones();
    }, [loadDirecciones])
  );

  const origenes = direcciones.slice(0, 2);

  return (
    <MainLayout title="Nuevo Envío" navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <View style={styles.tabsRow}>
        <Text style={styles.tabActive}>Registro cliente</Text>
        <Text style={styles.tab}>Paso 1: Remitente</Text>
        <Text style={styles.tab}>Paso 2: Destinatario</Text>
      </View>

      <View style={styles.vehicleRow}>
        <Image source={require('../../images/suv_10105478.png')} style={styles.vehicleImage} resizeMode="contain" />
        <Text style={styles.vehicleText}>Tu envío se transportará en unidad SUV</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Direcciones de origen (guardadas)</Text>

        {isLoading ? (
          <View style={styles.stateWrap}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.stateText}>Cargando direcciones...</Text>
          </View>
        ) : null}

        {!isLoading && errorMessage ? (
          <Text style={[styles.row, styles.errorText]}>{errorMessage}</Text>
        ) : null}

        {!isLoading && !errorMessage && origenes.length === 0 ? (
          <Text style={styles.row}>Aún no tienes direcciones guardadas. Puedes crearlas en Direcciones Guardadas.</Text>
        ) : null}

        {!isLoading && !errorMessage
          ? origenes.map((item) => (
              <View key={item.id_direccion} style={styles.rowWrap}>
                <Text style={styles.row}>{item.alias} - {item.direccion}</Text>
                <Text style={styles.arrow}>{item.es_predeterminada ? 'Predeterminada' : 'Disponible'}</Text>
              </View>
            ))
          : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Destino</Text>
        <Text style={styles.row}>El destino se define en el formulario del destinatario.</Text>
        <Text style={styles.row}>No se usa información estática en esta vista.</Text>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('FormRemitente')}>
        <Text style={styles.btnPrimaryText}>Completar formulario de envío</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DireccionesGuardadas')}>
        <Text style={styles.btnText}>Gestionar direcciones guardadas</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
