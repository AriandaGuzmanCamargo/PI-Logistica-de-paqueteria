import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormResumenEnvioStyles';

export default function FormResumenEnvioScreen({ navigation }) {
  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormPaquete" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 4 de 4 - Revision y confirmacion</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Remitente</Text>
        <Text style={styles.row}>Carlos Ramirez - +34 612 000 321</Text>
        <Text style={styles.row}>Av. Las Flores 123, Madrid</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Destinatario</Text>
        <Text style={styles.row}>Ana Martinez - +34 611 998 777</Text>
        <Text style={styles.row}>Calle 10 #45-22, Barcelona</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Paquete</Text>
        <Text style={styles.row}>Tipo: Documentos</Text>
        <Text style={styles.row}>Peso: 4.0 kg</Text>
        <Text style={styles.row}>Valor declarado: $ 8,409</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('FormPaquete')}>
          <Text style={styles.btnSecondaryText}>Editar datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CotizarEnvio')}>
          <Text style={styles.btnText}>Continuar a cotizacion</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
