import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormRemitenteStyles';

export default function FormRemitenteScreen({ navigation }) {
  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="NuevoEnvio" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 1 de 4 - Datos del remitente</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Documento de identidad" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Direccion de recogida" placeholderTextColor="#9AA4BF" multiline />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FormDestinatario')}>
        <Text style={styles.btnText}>Siguiente: Destinatario</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
