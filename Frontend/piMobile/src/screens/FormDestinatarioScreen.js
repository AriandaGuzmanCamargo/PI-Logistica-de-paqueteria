import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormDestinatarioStyles';

export default function FormDestinatarioScreen({ navigation }) {
  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormRemitente" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 2 de 4 - Datos del destinatario</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Documento de identidad" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Telefono" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Direccion de entrega" placeholderTextColor="#9AA4BF" multiline />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('FormRemitente')}>
          <Text style={styles.btnSecondaryText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FormPaquete')}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
