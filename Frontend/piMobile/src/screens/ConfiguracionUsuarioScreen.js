import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/ConfiguracionUsuarioStyles';

export default function ConfiguracionUsuarioScreen({ navigation }) {
  return (
    <MainLayout title="Configuración" navigation={navigation} backTo="Dashboard" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DatosPersonales')}><Text style={styles.itemText}>Datos Personales</Text><Text style={styles.arrow}>Abrir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CambiarContrasena')}><Text style={styles.itemText}>Cambiar Contraseña</Text><Text style={styles.arrow}>Abrir</Text></TouchableOpacity>
        <View style={styles.item}><Text style={styles.itemText}>Notificaciones</Text><View style={styles.switchOn} /></View>
        <View style={styles.item}><Text style={styles.itemText}>Método de pago</Text><Text style={styles.arrow}>Contraentrega</Text></View>
        <View style={styles.itemLast}><Text style={styles.itemText}>Cobro</Text><Text style={styles.arrow}>Al momento de entregar</Text></View>
      </View>
    </MainLayout>
  );
}
