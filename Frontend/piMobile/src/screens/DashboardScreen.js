import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/DashboardStyles';

export default function DashboardScreen({ navigation }) {
  return (
    <MainLayout title="" navigation={navigation} activeTab="Dashboard">
      <View style={styles.searchWrap}>
        <TextInput style={styles.input} placeholder="Ingresar el numero de rastreo" placeholderTextColor="#9AA4BF" />
        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('RastrearEnvio')}>
          <Text style={styles.searchBtnText}>Rastrear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('NuevoEnvio')}>
          <Text style={styles.cardTitle}>Nuevo Envio</Text>
          <Text style={styles.cardDesc}>Calcula costos y crea tu envio.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('CotizarEnvio')}>
          <Text style={styles.cardTitle}>Cotizar</Text>
          <Text style={styles.cardDesc}>Cotiza antes de confirmar.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('DireccionesGuardadas')}>
          <Text style={styles.cardTitle}>Direcciones</Text>
          <Text style={styles.cardDesc}>Gestiona direcciones frecuentes.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('PagoOpciones')}>
          <Text style={styles.cardTitle}>Facturacion</Text>
          <Text style={styles.cardDesc}>Elige y administra pago.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trackCard}>
        <View style={styles.tabsRow}>
          <Text style={styles.tabActive}>Todos</Text>
          <Text style={styles.tab}>Activos</Text>
          <Text style={styles.tab}>Entregados</Text>
          <Text style={styles.tab}>Cancelados</Text>
        </View>
        <Text style={styles.trackId}>PAK123456789</Text>
        <Text style={styles.trackDate}>Mar, 9 Abr 2024</Text>

        <View style={styles.timelineRow}><View style={styles.dot} /><Text style={styles.timelineText}>Pedido creado</Text></View>
        <View style={styles.timelineRow}><View style={styles.dot} /><Text style={styles.timelineText}>En recoleccion</Text></View>
        <View style={styles.timelineRow}><View style={styles.dot} /><Text style={styles.timelineText}>En transito</Text></View>
        <View style={styles.timelineRowCurrent}><View style={styles.dotCurrent} /><Text style={styles.timelineCurrentText}>En reparto</Text></View>

        <TouchableOpacity onPress={() => navigation.navigate('DetalleEnvio')}>
          <Text style={styles.link}>Ver detalles completos</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
