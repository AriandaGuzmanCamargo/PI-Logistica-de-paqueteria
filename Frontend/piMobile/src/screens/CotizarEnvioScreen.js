import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/CotizarEnvioStyles';

export default function CotizarEnvioScreen({ navigation }) {
  return (
    <MainLayout title="Cotizar Envio" navigation={navigation} backTo="NuevoEnvio" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Origen</Text>
        <View style={styles.rowWrap}><Text style={styles.row}>Centro Logistico Norte</Text><Text style={styles.arrow}>Seleccionar</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Destino</Text>
        <View style={styles.rowWrap}><Text style={styles.row}>Oficina Central, Torre A Piso 7</Text><Text style={styles.arrow}>Seleccionar</Text></View>
        <View style={styles.rowWrap}><Text style={styles.row}>Bodega Sur, Ruta 12 Km 8</Text><Text style={styles.arrow}>Seleccionar</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Paquete</Text>
        <View style={styles.rowWrap}><Text style={styles.row}>Tipo</Text><Text style={styles.value}>Documentos</Text></View>
        <View style={styles.rowWrap}><Text style={styles.row}>Peso estimado</Text><Text style={styles.value}>4.0 kg</Text></View>
        <View style={styles.rowWrap}><Text style={styles.row}>Costo estimado</Text><Text style={styles.value}>$ 8,409 COP</Text></View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PagoOpciones')}>
        <Text style={styles.btnText}>Seleccionar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
