import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/DatosPersonalesStyles';

export default function DatosPersonalesScreen({ navigation }) {
  return (
    <MainLayout title="Datos Personales" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <Text style={styles.row}>Nombre: Eduardo Perez</Text>
        <Text style={styles.row}>Correo: usuario@email.com</Text>
        <Text style={styles.row}>Telefono: +34 612 345 678</Text>
        <Text style={styles.row}>Fecha de registro: 15 Mar 2024</Text>
        <Text style={styles.row}>Ciudad: Madrid</Text>
      </View>
    </MainLayout>
  );
}
