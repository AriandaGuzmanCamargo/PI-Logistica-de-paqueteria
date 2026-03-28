import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoConfirmacionStyles';

export default function PagoConfirmacionScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const returnTo = route?.params?.returnTo || null;
  const paymentResult = route?.params?.paymentResult || null;

  const methodLabelMap = {
    tarjeta: 'Tarjeta',
    transferencia: 'Transferencia',
    contraentrega: 'Contraentrega',
  };

  const methodLabel = methodLabelMap[paymentResult?.method] || 'Metodo no definido';

  const statusText = paymentResult?.status === 'approved'
    ? 'Pago aprobado'
    : paymentResult?.status === 'pending_verification'
      ? 'Pago pendiente de verificacion'
      : paymentResult?.status === 'pay_on_delivery'
        ? 'Pago contraentrega confirmado'
        : 'Pago confirmado';

  const handleContinue = () => {
    if (returnTo) {
      navigation.navigate(returnTo, {
        formData,
        paymentResult,
      });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <MainLayout title="Pago" navigation={navigation} backTo="PagoOpciones" activeTab="RastrearEnvio">
      <View style={styles.notice}>
        <Text style={styles.code}>{statusText}</Text>
        <Text style={styles.title}>Metodo: {methodLabel}</Text>
        <Text style={styles.title}>Referencia: {paymentResult?.reference || 'N/A'}</Text>
        {paymentResult?.authCode ? <Text style={styles.title}>Autorizacion: {paymentResult.authCode}</Text> : null}
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
        <Text style={styles.btnText}>Continuar</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
