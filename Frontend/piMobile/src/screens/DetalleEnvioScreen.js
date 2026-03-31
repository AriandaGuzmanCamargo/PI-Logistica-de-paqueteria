import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Image } from 'react-native';
import MainLayout from '../components/MainLayout';
import { getDetalleEnvio, updateEnvioByCliente, cancelEnvioByCliente } from '../services/enviosService';
import { getCurrentUser } from '../services/sessionService';
import styles from '../styles/DetalleEnvioStyles';

function formatDate(isoString) {
  if (!isoString) return 'Sin fecha';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatDateTime(isoString) {
  if (!isoString) return 'Sin fecha';
  const date = new Date(isoString);
  const day = date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${day} · ${time}`;
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

export default function DetalleEnvioScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [detalle, setDetalle] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [direccionDestino, setDireccionDestino] = useState('');
  const [ciudadDestino, setCiudadDestino] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const idEnvio = route?.params?.idEnvio;

  useEffect(() => {
    const loadDetalle = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        if (!idEnvio) {
          throw new Error('No se recibió el identificador del envío.');
        }

        const data = await getDetalleEnvio(idEnvio);
        setDetalle(data);
        setDireccionDestino(data?.direccion_destino || '');
        setCiudadDestino(data?.ciudad_destino || '');
      } catch (error) {
        setErrorMessage(error.message || 'No se pudo cargar el detalle del envío.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDetalle();
  }, [idEnvio]);

  if (isLoading) {
    return (
      <MainLayout title="Detalle del Envío" navigation={navigation} backTo="RastrearEnvio" activeTab="RastrearEnvio">
        <View style={styles.stateWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Cargando detalle...</Text>
        </View>
      </MainLayout>
    );
  }

  if (errorMessage || !detalle) {
    return (
      <MainLayout title="Detalle del Envío" navigation={navigation} backTo="RastrearEnvio" activeTab="RastrearEnvio">
        <View style={styles.stateWrap}>
          <Text style={[styles.stateText, styles.stateError]}>{errorMessage || 'No se encontró información del envío.'}</Text>
        </View>
      </MainLayout>
    );
  }

  const isAssigned = Boolean(detalle?.asignacion?.id_asignacion);
  const canModify = detalle.estado_envio === 'pendiente' && !isAssigned;

  const handleSaveChanges = async () => {
    try {
      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
      }

      if (!direccionDestino.trim() || !ciudadDestino.trim()) {
        throw new Error('Dirección y ciudad destino son obligatorias.');
      }

      setIsSaving(true);
      const updated = await updateEnvioByCliente({
        idEnvio: detalle.id_envio,
        idUsuario: user.id_usuario,
        direccion_destino: direccionDestino.trim(),
        ciudad_destino: ciudadDestino.trim(),
      });

      setDetalle(updated);
      setIsEditMode(false);
      Alert.alert('Listo', 'Envío actualizado correctamente.');
    } catch (error) {
      Alert.alert('No se pudo actualizar', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelShipment = () => {
    Alert.alert('Cancelar envío', 'Esta acción no se puede deshacer. ¿Deseas continuar?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Sí, cancelar',
        style: 'destructive',
        onPress: async () => {
          try {
            const user = getCurrentUser();

            if (!user?.id_usuario) {
              throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
            }

            setIsSaving(true);
            const updated = await cancelEnvioByCliente({
              idEnvio: detalle.id_envio,
              idUsuario: user.id_usuario,
            });

            setDetalle(updated);
            setIsEditMode(false);
            Alert.alert('Listo', 'El envío fue cancelado.');
          } catch (error) {
            Alert.alert('No se pudo cancelar', error.message || 'Intenta nuevamente.');
          } finally {
            setIsSaving(false);
          }
        },
      },
    ]);
  };

  return (
    <MainLayout title="Detalle del Envío" navigation={navigation} backTo="RastrearEnvio" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <Text style={styles.title}>Información General</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.row}>Referencia {detalle.paquete?.codigo_rastreo || `ENV-${detalle.id_envio}`}</Text>
          <Text style={styles.status}>{formatStatus(detalle.estado_envio)}</Text>
        </View>
        <Text style={styles.row}>Creado el: {formatDate(detalle.fecha_creacion)}</Text>
        <Text style={styles.row}>Dirigido a: {detalle.destinatario?.nombre || 'Sin destinatario'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.row}>{detalle.destinatario?.nombre || 'Sin destinatario'}</Text>
        {isEditMode ? (
          <>
            <TextInput
              style={styles.input}
              value={direccionDestino}
              onChangeText={setDireccionDestino}
              placeholder="Dirección destino"
              placeholderTextColor="#9AA4BF"
            />
            <TextInput
              style={styles.input}
              value={ciudadDestino}
              onChangeText={setCiudadDestino}
              placeholder="Ciudad destino"
              placeholderTextColor="#9AA4BF"
            />
          </>
        ) : (
          <Text style={styles.row}>{detalle.direccion_destino || 'Sin dirección de destino'}</Text>
        )}
        <Text style={styles.row}>Origen: {detalle.direccion_origen || 'Sin dirección de origen'}</Text>
        <Text style={styles.row}>Remitente: {detalle.remitente?.nombre || 'Sin remitente'}</Text>
        <Text style={styles.row}>Pago: Contraentrega</Text>
      </View>

      {String(detalle.estado_envio || '').toLowerCase() === 'entregado' ? (
        <View style={styles.card}>
          <Text style={styles.title}>Evidencia de Entrega</Text>
          <Text style={styles.row}>Fecha y hora: {formatDateTime(detalle.fecha_entrega_real)}</Text>
          <Text style={styles.row}>Recibió: {detalle.recibio_entrega_nombre || 'No especificado'}</Text>
          {detalle.foto_entrega_url ? (
            <Image source={{ uri: detalle.foto_entrega_url }} style={styles.deliveryImage} resizeMode="cover" />
          ) : (
            <Text style={styles.row}>Sin foto registrada</Text>
          )}
        </View>
      ) : null}

      {canModify ? (
        <View style={styles.actionsWrap}>
          {isEditMode ? (
            <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleSaveChanges} disabled={isSaving}>
              <Text style={styles.actionBtnText}>{isSaving ? 'Guardando...' : 'Guardar cambios'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.actionBtn} onPress={() => setIsEditMode(true)}>
              <Text style={styles.actionBtnText}>Editar envío</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.actionBtn, styles.cancelBtn]} onPress={handleCancelShipment} disabled={isSaving}>
            <Text style={styles.actionBtnText}>{isSaving ? 'Procesando...' : 'Eliminar (Cancelar)'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.row}>
            {isAssigned
              ? 'Este envío ya fue asignado. Ya no se puede editar ni eliminar.'
              : 'Este envío ya no se puede editar ni eliminar por su estado actual.'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('MisEnvios')}>
        <Text style={styles.btnText}>Volver a mis envíos</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
