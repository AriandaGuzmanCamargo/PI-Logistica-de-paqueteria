import React from 'react';
import { View, Text } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/DireccionesGuardadasStyles';

export default function DireccionesGuardadasScreen({ navigation }) {
  return (
    <MainLayout title="Direcciones Guardadas" navigation={navigation} backTo="Dashboard" activeTab="MenuUsuario">
      <View style={styles.card}>
        <View style={styles.row}><Text style={styles.item}>Casa - Av. Las Flores 123</Text><Text style={styles.right}>Favorita</Text></View>
        <View style={styles.row}><Text style={styles.item}>Oficina - Calle Comercio 45</Text><Text style={styles.right}>Editar</Text></View>
        <View style={styles.row}><Text style={styles.item}>Bodega - Zona Industrial 8</Text><Text style={styles.right}>Editar</Text></View>
      </View>
    </MainLayout>
  );
}
