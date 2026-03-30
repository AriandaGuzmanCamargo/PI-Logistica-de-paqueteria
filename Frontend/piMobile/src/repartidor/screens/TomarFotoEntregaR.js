import React, { useRef, useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { marcarEnvioComoEntregado } from '../../services/enviosService';
import { getCurrentUser } from '../../services/sessionService';

export default function TomarFotoEntregaR({ navigation, route }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [deliveryPhotoUrl, setDeliveryPhotoUrl] = useState('');
  const delivery = route?.params?.delivery;
  const shipmentId = route?.params?.idEnvio || delivery?.id_envio;

  const handleConfirmDelivery = async () => {
    try {
      const user = getCurrentUser();
      const idUsuario = Number(user?.id_usuario);

      if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        throw new Error('No hay sesion activa de conductor.');
      }

      if (!shipmentId) {
        throw new Error('No se encontro el id del envio para marcar entrega.');
      }

      if (!cameraRef.current) {
        throw new Error('La camara no esta lista. Intenta nuevamente.');
      }

      if (!deliveryPhotoUrl) {
        setIsSubmitting(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.65,
          skipProcessing: true,
          base64: true,
        });

        if (!photo?.uri) {
          throw new Error('No se pudo capturar la fotografia de entrega.');
        }

        const fotoEntregaUrl = photo?.base64 ? `data:image/jpeg;base64,${photo.base64}` : null;

        if (!fotoEntregaUrl) {
          throw new Error('No se pudo procesar la fotografia de entrega.');
        }

        setDeliveryPhotoUrl(fotoEntregaUrl);
        return;
      }

      const trimmedReceiverName = receiverName.trim();
      if (!trimmedReceiverName) {
        throw new Error('Debes indicar quien recibio la entrega.');
      }

      setIsSubmitting(true);

      await marcarEnvioComoEntregado({
        idEnvio: shipmentId,
        idUsuario,
        fotoEntregaUrl: deliveryPhotoUrl,
        recibioEntregaNombre: trimmedReceiverName,
      });

      Alert.alert('Entrega confirmada', 'La fotografia se capturo y el envio se marco como entregado.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('EntregasR', { refresh: Date.now() }),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo marcar entrega', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.webWrap}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.webTitle}>Camara no disponible en web</Text>
        <Text style={styles.webText}>Esta funcionalidad requiere Android o iOS para tomar fotografia de entrega.</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!permission) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.infoText}>Cargando permisos de camara...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerWrap}>
        <Text style={styles.infoText}>Para continuar debes permitir el acceso a la camara.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Permitir camara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <View style={styles.overlayTop}>
        <Text style={styles.overlayTitle}>
          {deliveryPhotoUrl ? 'Foto capturada: ahora indica quien recibio' : 'Tomar fotografia de entrega'}
        </Text>
      </View>

      <View style={styles.overlayBottom}>
        {deliveryPhotoUrl ? (
          <View style={styles.receiverInputWrap}>
            <Text style={styles.receiverInputLabel}>Quien recibio la entrega</Text>
            <TextInput
              value={receiverName}
              onChangeText={setReceiverName}
              placeholder="Ej. Juan Perez"
              placeholderTextColor="#6B7280"
              maxLength={120}
              style={styles.receiverInput}
              editable={!isSubmitting}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
          onPress={handleConfirmDelivery}
          disabled={isSubmitting}
        >
          <Text style={[styles.buttonText, styles.primaryButtonText]}>
            {isSubmitting ? 'Guardando...' : deliveryPhotoUrl ? 'Confirmar entrega' : 'Capturar fotografia'}
          </Text>
        </TouchableOpacity>

        {deliveryPhotoUrl ? (
          <TouchableOpacity
            style={[styles.primaryButton, styles.retakeButton]}
            onPress={() => setDeliveryPhotoUrl('')}
            disabled={isSubmitting}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Volver a tomar foto</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()} disabled={isSubmitting}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlayTop: {
    position: 'absolute',
    top: 46,
    left: 16,
    right: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
  },
  overlayTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  overlayBottom: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    gap: 12,
  },
  receiverInputWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(17, 24, 39, 0.18)',
  },
  receiverInputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  receiverInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#111827',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#FACC15',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: '#EAB308',
  },
  secondaryButton: {
    backgroundColor: 'rgba(220, 38, 38, 0.94)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    shadowColor: '#DC2626',
    shadowOpacity: 0.48,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 16,
  },
  primaryButtonText: {
    color: '#111827',
  },
  centerWrap: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B1220',
    gap: 12,
  },
  infoText: {
    color: '#E5E7EB',
    textAlign: 'center',
    fontSize: 16,
  },
  webWrap: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#F3F4F6',
  },
  webTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  webText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
});
