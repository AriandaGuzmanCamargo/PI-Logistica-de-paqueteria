import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoOpcionesStyles';

export default function PagoOpcionesScreen({ navigation }) {
  return (
    <MainLayout title="Pago" navigation={navigation} backTo="CotizarEnvio" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PagoTarjeta')}><Text style={styles.itemText}>Tarjeta</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PagoConfirmacion')}><Text style={styles.itemText}>Transferencia</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.itemLast} onPress={() => navigation.navigate('PagoConfirmacion')}><Text style={styles.itemText}>Contraentrega</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeCode}>PAK12456789</Text>
        <Text style={styles.noticeText}>Envio registrado correctamente</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PagoConfirmacion')}>
        <Text style={styles.btnText}>Confirmar metodo y continuar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
