import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import MainLayout from '../components/MainLayout';
import { createEnvioByCliente } from '../services/enviosService';
import { getCurrentUser } from '../services/sessionService';
import styles from '../styles/FormResumenEnvioStyles';

export default function FormResumenEnvioScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const remitente = formData.remitente || {};
  const destinatario = formData.destinatario || {};
  const paquete = formData.paquete || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateShipment = async () => {
    try {
      const requiredTextFields = [
        remitente.nombre,
        remitente.telefono,
        remitente.correo,
        remitente.direccion,
        remitente.ciudad,
        destinatario.nombre,
        destinatario.telefono,
        destinatario.correo,
        destinatario.direccion,
        destinatario.ciudad,
        paquete.tipoPaquete,
        paquete.contenido,
        paquete.tipoServicio,
      ];

      if (requiredTextFields.some((field) => !String(field || '').trim())) {
        throw new Error('Hay campos obligatorios incompletos. Regresa y completa el formulario.');
      }

      const numericFields = [
        Number(paquete.peso),
        Number(paquete.largo),
        Number(paquete.ancho),
        Number(paquete.alto),
        Number(paquete.valorDeclarado),
      ];

      if (numericFields.some((value) => !Number.isFinite(value) || value <= 0)) {
        throw new Error('Peso, dimensiones y valor declarado deben ser numeros mayores a 0.');
      }

      const serviceType = String(paquete.tipoServicio || '').trim().toLowerCase();
      if (!['normal', 'express', 'economico'].includes(serviceType)) {
        throw new Error('Tipo de servicio invalido. Usa: normal, express o economico.');
      }

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
      }

      setIsSubmitting(true);

      await createEnvioByCliente({
        idUsuario: user.id_usuario,
        remitente: {
          nombre: remitente.nombre,
          telefono: remitente.telefono,
          correo: remitente.correo,
          direccion: remitente.direccion,
          ciudad: remitente.ciudad,
        },
        destinatario: {
          nombre: destinatario.nombre,
          telefono: destinatario.telefono,
          correo: destinatario.correo,
          direccion: destinatario.direccion,
          ciudad: destinatario.ciudad,
          estado: destinatario.ciudad,
          codigo_postal: '00000',
        },
        paquete: {
          descripcion: paquete.contenido,
          tipo_contenido: paquete.tipoPaquete,
          peso: Number(paquete.peso || 0),
          largo: paquete.largo ? Number(paquete.largo) : null,
          ancho: paquete.ancho ? Number(paquete.ancho) : null,
          alto: paquete.alto ? Number(paquete.alto) : null,
          valor_declarado: paquete.valorDeclarado ? Number(paquete.valorDeclarado) : 0,
          tipo_servicio: serviceType,
        },
      });

      Alert.alert('Envio creado', 'Tu envio fue registrado correctamente.', [
        {
          text: 'Ver mis envios',
          onPress: () => navigation.navigate('MisEnvios'),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo crear el envio', error.message || 'Revisa los datos e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormPaquete" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 4 de 4 - Revision y confirmacion</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Remitente</Text>
        <Text style={styles.row}>{remitente.nombre || 'Sin nombre'} - {remitente.telefono || 'Sin telefono'}</Text>
        <Text style={styles.row}>{remitente.direccion || 'Sin direccion'}, {remitente.ciudad || 'Sin ciudad'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Destinatario</Text>
        <Text style={styles.row}>{destinatario.nombre || 'Sin nombre'} - {destinatario.telefono || 'Sin telefono'}</Text>
        <Text style={styles.row}>{destinatario.direccion || 'Sin direccion'}, {destinatario.ciudad || 'Sin ciudad'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Paquete</Text>
        <Text style={styles.row}>Tipo: {paquete.tipoPaquete || 'Sin tipo'}</Text>
        <Text style={styles.row}>Peso: {paquete.peso || '0'} kg</Text>
        <Text style={styles.row}>Valor declarado: $ {paquete.valorDeclarado || '0'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('FormPaquete', { formData })}>
          <Text style={styles.btnSecondaryText}>Editar datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleCreateShipment} disabled={isSubmitting}>
          {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Crear envio</Text>}
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
