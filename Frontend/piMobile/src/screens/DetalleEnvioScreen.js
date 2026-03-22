import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/DetalleEnvioStyles';

export default function DetalleEnvioScreen({ navigation }) {
  return (
    <MainLayout title="Detalle del Envio" navigation={navigation} backTo="RastrearEnvio" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <Text style={styles.title}>Informacion General</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.row}>Referencia 2300</Text>
          <Text style={styles.status}>En Reparto</Text>
        </View>
        <Text style={styles.row}>Creado el: Lun, 9 Abr 2024</Text>
        <Text style={styles.row}>Dirigido a: Maria Fernandez</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.row}>Maria Fernandez</Text>
        <Text style={styles.row}>Residencial Santa Marta</Text>
        <Text style={styles.row}>Ruta: Centro - Zona Norte</Text>
        <Text style={styles.row}>Conductor: Carlos Ramirez</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PagoOpciones')}>
        <Text style={styles.btnText}>Continuar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
