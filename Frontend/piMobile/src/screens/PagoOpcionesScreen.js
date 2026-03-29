import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoOpcionesStyles';
import { confirmOfflinePayment } from '../services/paymentService';

export default function PagoOpcionesScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const returnTo = route?.params?.returnTo || null;
  const [selectedMethod, setSelectedMethod] = useState('tarjeta');

  const title = useMemo(() => (returnTo ? 'Pago del envío' : 'Pago'), [returnTo]);

  const handleContinue = () => {
    if (selectedMethod === 'tarjeta') {
      navigation.navigate('PagoTarjeta', { formData, returnTo });
      return;
    }

    const paymentResult = confirmOfflinePayment(selectedMethod);

    navigation.navigate('PagoConfirmacion', {
      formData,
      returnTo,
      paymentResult,
    });
  };

  return (
    <MainLayout title={title} navigation={navigation} backTo="Dashboard" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => setSelectedMethod('tarjeta')}>
          <Text style={styles.itemText}>Tarjeta</Text>
          <Text style={styles.arrow}>{selectedMethod === 'tarjeta' ? 'Seleccionado' : 'Elegir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => setSelectedMethod('transferencia')}>
          <Text style={styles.itemText}>Transferencia</Text>
          <Text style={styles.arrow}>{selectedMethod === 'transferencia' ? 'Seleccionado' : 'Elegir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemLast} onPress={() => setSelectedMethod('contraentrega')}>
          <Text style={styles.itemText}>Contraentrega</Text>
          <Text style={styles.arrow}>{selectedMethod === 'contraentrega' ? 'Seleccionado' : 'Elegir'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>Administra y confirma tu método de pago.</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Confirmar método y continuar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
