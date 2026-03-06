import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/MisEnviosStyles';

export default function MisEnviosScreen({ navigation }) {
  return (
    <MainLayout title="Mis Envios" navigation={navigation} backTo="MenuUsuario" activeTab="RastrearEnvio">
      <View style={styles.tabsRow}>
        <Text style={styles.tabActive}>Todos</Text>
        <Text style={styles.tab}>Activos</Text>
        <Text style={styles.tab}>Entregados</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.id}>PAK123456789</Text>
        <Text style={styles.date}>Mar, 9 Abr 2024</Text>
        <Text style={styles.status}>En reparto</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio')}>
          <Text style={styles.link}>Ver detalles completos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.id}>PAK889900112</Text>
        <Text style={styles.date}>Jue, 14 Mar 2024</Text>
        <Text style={styles.status}>En transito</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio')}>
          <Text style={styles.link}>Ver detalles completos</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
