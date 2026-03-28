import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormDestinatarioStyles';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FormDestinatarioScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const destinatarioData = formData.destinatario || {};

  const [nombre, setNombre] = useState(destinatarioData.nombre || '');
  const [documento, setDocumento] = useState(destinatarioData.documento || '');
  const [telefono, setTelefono] = useState(destinatarioData.telefono || '');
  const [correo, setCorreo] = useState(destinatarioData.correo || '');
  const [direccion, setDireccion] = useState(destinatarioData.direccion || '');
  const [ciudad, setCiudad] = useState(destinatarioData.ciudad || '');

  const goPrev = () => {
    navigation.navigate('FormRemitente', { formData });
  };

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
      Alert.alert('Campos obligatorios', 'Completa todos los campos del destinatario.');
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

    navigation.navigate('FormPaquete', {
      formData: {
        ...formData,
        destinatario: sanitized,
      },
    });
  };

  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormRemitente" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 2 de 4 - Datos del destinatario</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Documento de identidad" placeholderTextColor="#9AA4BF" value={documento} onChangeText={setDocumento} />
        <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor="#9AA4BF" value={telefono} onChangeText={setTelefono} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Direccion de entrega" placeholderTextColor="#9AA4BF" multiline value={direccion} onChangeText={setDireccion} />
        <TextInput style={styles.input} placeholder="Ciudad de destino" placeholderTextColor="#9AA4BF" value={ciudad} onChangeText={setCiudad} />
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
