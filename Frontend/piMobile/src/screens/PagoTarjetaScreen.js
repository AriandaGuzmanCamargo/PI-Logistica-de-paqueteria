import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/PagoTarjetaStyles';
import { normalizeCardInput, processCardPayment } from '../services/paymentService';

function normalizeExpiryInput(value) {
  const digits = String(value || '').replace(/\D+/g, '').slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PagoTarjetaScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const returnTo = route?.params?.returnTo || null;
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const maskedPreview = useMemo(() => {
    if (!cardNumber.trim()) {
      return 'Visa **** **** **** 0000';
    }

    const digits = cardNumber.replace(/\D+/g, '');
    const tail = digits.slice(-4).padStart(4, '0');
    return `Visa **** **** **** ${tail}`;
  }, [cardNumber]);

  const handlePay = async () => {
    try {
      setErrorMessage('');
      setIsProcessing(true);

      const paymentResult = await processCardPayment({
        cardNumber,
        expiry,
        cvv,
        holderName,
      });

      navigation.navigate('PagoConfirmacion', {
        formData,
        returnTo,
        paymentResult,
      });
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo procesar el pago con tarjeta.');
    } finally {
      setIsProcessing(false);
    }
  };

  const title = returnTo ? 'Pago del envio' : 'Pago';

  return (
    <MainLayout title={title} navigation={navigation} backTo="PagoOpciones" activeTab="RastrearEnvio">
      <View style={styles.card}>
        <View style={styles.rowWrap}>
          <Text style={styles.rowStrong}>Tarjeta</Text>
          <Text style={styles.chip}>Elegido</Text>
        </View>
        <Text style={styles.row}>{maskedPreview}</Text>
        <Text style={styles.row}>Titular: {holderName || 'Pendiente'}</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Numero de tarjeta"
          placeholderTextColor="#9AA4BF"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(normalizeCardInput(text))}
          keyboardType="numeric"
          maxLength={23}
        />
        <TextInput
          style={styles.input}
          placeholder="MM/AA"
          placeholderTextColor="#9AA4BF"
          value={expiry}
          onChangeText={(text) => setExpiry(normalizeExpiryInput(text))}
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          placeholderTextColor="#9AA4BF"
          value={cvv}
          onChangeText={(text) => setCvv(text.replace(/\D+/g, '').slice(0, 4))}
          keyboardType="numeric"
          maxLength={4}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del titular"
          placeholderTextColor="#9AA4BF"
          value={holderName}
          onChangeText={setHolderName}
        />
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={handlePay} disabled={isProcessing}>
        <Text style={styles.btnText}>{isProcessing ? 'Procesando...' : 'Confirmar pago'}</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
