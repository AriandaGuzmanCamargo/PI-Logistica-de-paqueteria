import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormRemitenteStyles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const sanitized = {
      nombre: nombre.trim(),
      documento: documento.trim(),
      telefono: telefono.trim(),
      correo: correo.trim().toLowerCase(),
      direccion: direccion.trim(),
      ciudad: ciudad.trim(),
    };

    if (!sanitized.nombre || !sanitized.documento || !sanitized.telefono || !sanitized.correo || !sanitized.direccion || !sanitized.ciudad) {
      Alert.alert('Campos obligatorios', 'Completa todos los campos del remitente.');
      return;
    }

    if (!/^\d{8,15}$/.test(sanitized.telefono)) {
      Alert.alert('Telefono invalido', 'Ingresa solo digitos (8 a 15).');
      return;
    }

    if (!EMAIL_REGEX.test(sanitized.correo)) {
      Alert.alert('Correo invalido', 'Ingresa un correo electronico valido.');
      return;
    }

    navigation.navigate('FormDestinatario', {
      formData: {
        ...formData,
        remitente: sanitized,
      },
    });
  };

  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="NuevoEnvio" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 1 de 4 - Datos del remitente</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Documento de identidad" placeholderTextColor="#9AA4BF" value={documento} onChangeText={setDocumento} />
        <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor="#9AA4BF" value={telefono} onChangeText={setTelefono} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Direccion de recogida" placeholderTextColor="#9AA4BF" multiline value={direccion} onChangeText={setDireccion} />
        <TextInput style={styles.input} placeholder="Ciudad de origen" placeholderTextColor="#9AA4BF" value={ciudad} onChangeText={setCiudad} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={goNext}>
        <Text style={styles.btnText}>Siguiente: Destinatario</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
