import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormDestinatarioStyles';
import {
  buildPersonPayload,
  sanitizeIdentity,
  sanitizePhone,
  sanitizeText,
} from '../utils/shipmentFormValidation';

export default function FormDestinatarioScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const destinatarioData = formData.destinatario || {};

  const [nombre, setNombre] = useState(destinatarioData.nombre || '');
  const [documento, setDocumento] = useState(destinatarioData.documento || '');
  const [telefono, setTelefono] = useState(destinatarioData.telefono || '');
  const [correo, setCorreo] = useState(destinatarioData.correo || '');
  const [direccion, setDireccion] = useState(destinatarioData.direccion || '');
  const [referencia, setReferencia] = useState(destinatarioData.referencia || '');
  const [ciudad, setCiudad] = useState(destinatarioData.ciudad || '');

  const goPrev = () => {
    navigation.navigate('FormRemitente', { formData });
  };

  const goNext = () => {
    try {
      const sanitized = buildPersonPayload(
        {
          nombre,
          documento,
          telefono,
          correo,
          direccion,
          referencia,
          ciudad,
        },
        {
          nameLabel: 'Nombre del destinatario',
          identityLabel: 'CURP o ID alterno del destinatario',
          addressLabel: 'Direccion de entrega',
          referenceLabel: 'Referencia de entrega',
          cityLabel: 'Ciudad de destino',
        }
      );

      navigation.navigate('FormPaquete', {
        formData: {
          ...formData,
          destinatario: sanitized,
        },
      });
    } catch (error) {
      Alert.alert('Datos invalidos', error.message || 'Revisa los datos capturados.');
    }
  };

  return (
    <MainLayout title="Registro de Envío" navigation={navigation} backTo="FormRemitente" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 2 de 4 - Datos del destinatario</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="CURP o ID alterno (INE/PASAPORTE)" placeholderTextColor="#9AA4BF" value={documento} onChangeText={(value) => setDocumento(sanitizeIdentity(value))} autoCapitalize="characters" maxLength={25} />
        <TextInput style={styles.input} placeholder="Telefono (10 digitos)" placeholderTextColor="#9AA4BF" value={telefono} onChangeText={(value) => setTelefono(sanitizePhone(value))} keyboardType="numeric" maxLength={10} />
        <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Direccion de entrega" placeholderTextColor="#9AA4BF" multiline value={direccion} onChangeText={setDireccion} />
        <TextInput style={styles.input} placeholder="Referencia de entrega (portón, color de casa, etc.)" placeholderTextColor="#9AA4BF" multiline value={referencia} onChangeText={(value) => setReferencia(sanitizeText(value))} />
        <Text style={styles.helperText}>Formato requerido: Calle y numero, Colonia, CP 12345</Text>
        <TextInput style={styles.input} placeholder="Ciudad de destino" placeholderTextColor="#9AA4BF" value={ciudad} onChangeText={(value) => setCiudad(sanitizeText(value))} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={goPrev}>
          <Text style={styles.btnSecondaryText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
