import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoTarjetaStyles';

export default function PagoTarjetaScreen({ navigation }) {
  return (
    <MainLayout title="Pago" navigation={navigation} backTo="PagoOpciones" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <View style={styles.rowWrap}>
          <Text style={styles.rowStrong}>Tarjeta</Text>
          <Text style={styles.chip}>Elegido</Text>
        </View>
        <Text style={styles.row}>Visa **** 7835</Text>
        <Text style={styles.row}>Titular: Cliente App</Text>
      </View>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Numero / mm/yy / CVV" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Nombre del titular" placeholderTextColor="#9AA4BF" />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PagoConfirmacion')}>
        <Text style={styles.btnText}>Confirmar Envio</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
