import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormRemitenteStyles';
import {
  buildPersonPayload,
  sanitizeIdentity,
  sanitizePhone,
  sanitizeText,
} from '../utils/shipmentFormValidation';

export default function FormRemitenteScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const remitenteData = formData.remitente || {};

  const [nombre, setNombre] = useState(remitenteData.nombre || '');
  const [documento, setDocumento] = useState(remitenteData.documento || '');
  const [telefono, setTelefono] = useState(remitenteData.telefono || '');
  const [correo, setCorreo] = useState(remitenteData.correo || '');
  const [direccion, setDireccion] = useState(remitenteData.direccion || '');
  const [ciudad, setCiudad] = useState(remitenteData.ciudad || '');

  const goNext = () => {
    try {
      const sanitized = buildPersonPayload(
        {
          nombre,
          documento,
          telefono,
          correo,
          direccion,
          ciudad,
        },
        {
          nameLabel: 'Nombre del remitente',
          identityLabel: 'CURP o ID alterno del remitente',
          addressLabel: 'Direccion de recogida',
          cityLabel: 'Ciudad de origen',
        }
      );

      navigation.navigate('FormDestinatario', {
        formData: {
          ...formData,
          remitente: sanitized,
        },
      });
    } catch (error) {
      Alert.alert('Datos invalidos', error.message || 'Revisa los datos capturados.');
    }
  };

  return (
    <MainLayout title="Registro de Envío" navigation={navigation} backTo="NuevoEnvio" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 1 de 4 - Datos del remitente</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="CURP o ID alterno (INE/PASAPORTE)" placeholderTextColor="#9AA4BF" value={documento} onChangeText={(value) => setDocumento(sanitizeIdentity(value))} autoCapitalize="characters" maxLength={25} />
        <TextInput style={styles.input} placeholder="Telefono (10 digitos)" placeholderTextColor="#9AA4BF" value={telefono} onChangeText={(value) => setTelefono(sanitizePhone(value))} keyboardType="numeric" maxLength={10} />
        <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Direccion de recogida" placeholderTextColor="#9AA4BF" multiline value={direccion} onChangeText={setDireccion} />
        <Text style={styles.helperText}>Formato requerido: Calle y numero, Colonia, CP 12345</Text>
        <TextInput style={styles.input} placeholder="Ciudad de origen" placeholderTextColor="#9AA4BF" value={ciudad} onChangeText={(value) => setCiudad(sanitizeText(value))} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={goNext}>
        <Text style={styles.btnText}>Siguiente: Destinatario</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
