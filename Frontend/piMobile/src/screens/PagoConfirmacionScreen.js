import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoConfirmacionStyles';

export default function PagoConfirmacionScreen({ navigation }) {
  return (
    <MainLayout title="Pago" navigation={navigation} backTo="PagoOpciones" activeTab="RastrearEnvio">
      <View style={styles.notice}>
        <Text style={styles.code}>Pago confirmado</Text>
        <Text style={styles.title}>Tu metodo de pago quedo registrado correctamente</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.btnText}>Continuar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
