import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/NotificacionesStyles';

export default function NotificacionesScreen({ navigation }) {
  return (
    <MainLayout title="Notificaciones" navigation={navigation} backTo="MenuUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>Envio PAK123456789</Text>
          <Text style={styles.time}>Hace 5 min</Text>
        </View>
        <Text style={styles.message}>Tu paquete esta en reparto y llegara hoy entre 2:00 PM y 5:00 PM.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>Pago confirmado</Text>
          <Text style={styles.time}>Ayer</Text>
        </View>
        <Text style={styles.message}>Se registro correctamente el pago del envio PAK889900112.</Text>
      </View>
    </MainLayout>
  );
}
