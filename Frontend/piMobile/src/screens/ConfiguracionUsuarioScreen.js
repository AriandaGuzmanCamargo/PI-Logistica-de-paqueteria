import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/ConfiguracionUsuarioStyles';

export default function ConfiguracionUsuarioScreen({ navigation }) {
  return (
    <MainLayout title="Configuracion" navigation={navigation} backTo="Dashboard" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DatosPersonales')}><Text style={styles.itemText}>Datos Personales</Text><Text style={styles.arrow}>Abrir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CambiarContrasena')}><Text style={styles.itemText}>Cambiar Contrasena</Text><Text style={styles.arrow}>Abrir</Text></TouchableOpacity>
        <View style={styles.item}><Text style={styles.itemText}>Notificaciones</Text><View style={styles.switchOn} /></View>
        <View style={styles.item}><Text style={styles.itemText}>Metodo de Pago Guardado</Text><View style={styles.switchOff} /></View>
        <TouchableOpacity style={styles.itemLast} onPress={() => navigation.navigate('PagoTarjeta')}><Text style={styles.itemText}>•••• 3164 56789</Text><Text style={styles.arrow}>Abrir</Text></TouchableOpacity>
      </View>
    </MainLayout>
  );
}
