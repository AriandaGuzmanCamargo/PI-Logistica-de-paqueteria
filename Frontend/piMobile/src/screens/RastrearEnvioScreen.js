import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/RastrearEnvioStyles';

export default function RastrearEnvioScreen({ navigation }) {
  return (
    <MainLayout title="Rastrear Envio" navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <View style={styles.searchWrap}>
        <TextInput style={styles.input} placeholder="Ingresar guia" placeholderTextColor="#9AA4BF" />
        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('DetalleEnvio')}>
          <Text style={styles.searchBtnText}>Rastrear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.tabsRow}>
          <Text style={styles.tabActive}>Todos</Text>
          <Text style={styles.tab}>Activos</Text>
          <Text style={styles.tab}>Entregados</Text>
          <Text style={styles.tab}>Cancelados</Text>
        </View>
        <Text style={styles.id}>PAK123456789</Text>
        <Text style={styles.date}>Mar, 9 Abr 2024</Text>

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
