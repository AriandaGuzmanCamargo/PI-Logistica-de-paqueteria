import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/NuevoEnvioStyles';

export default function NuevoEnvioScreen({ navigation }) {
  return (
    <MainLayout title="Nuevo Envio" navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <View style={styles.tabsRow}>
        <Text style={styles.tabActive}>Todos</Text>
        <Text style={styles.tab}>Activos</Text>
        <Text style={styles.tab}>Entregados</Text>
        <Text style={styles.tab}>Canceladas</Text>
      </View>

      <View style={styles.vehicleRow}>
        <Image source={require('../../images/suv_10105478.png')} style={styles.vehicleImage} resizeMode="contain" />
        <Text style={styles.vehicleText}>Tu envio se transportara en unidad SUV</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Origen</Text>
        <View style={styles.rowWrap}><Text style={styles.row}>Casa - Av. Las Flores 123</Text><Text style={styles.arrow}>Seleccionar</Text></View>
        <View style={styles.rowWrap}><Text style={styles.row}>Oficina - Calle Comercio 45</Text><Text style={styles.arrow}>Seleccionar</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Destino</Text>
        <View style={styles.rowWrap}><Text style={styles.row}>Ana Martinez - Calle 10 #45-22</Text><Text style={styles.arrow}>Seleccionar</Text></View>
        <View style={styles.rowWrap}><Text style={styles.row}>Jorge Gomez - Av. Central 98</Text><Text style={styles.arrow}>Seleccionar</Text></View>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('FormRemitente')}>
        <Text style={styles.btnPrimaryText}>Completar formulario de envio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CotizarEnvio')}>
        <Text style={styles.btnText}>Usar flujo rapido</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
