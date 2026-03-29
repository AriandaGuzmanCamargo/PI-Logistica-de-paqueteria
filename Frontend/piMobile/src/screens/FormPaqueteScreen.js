import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormPaqueteStyles';
import { sanitizeText, validatePackagePayload } from '../utils/shipmentFormValidation';

export default function FormPaqueteScreen({ navigation, route }) {
  const formData = route?.params?.formData || {};
  const paqueteData = formData.paquete || {};

  const [tipoPaquete, setTipoPaquete] = useState(paqueteData.tipoPaquete || '');
  const [contenido, setContenido] = useState(paqueteData.contenido || '');
  const [peso, setPeso] = useState(paqueteData.peso || '');
  const [largo, setLargo] = useState(paqueteData.largo || '');
  const [ancho, setAncho] = useState(paqueteData.ancho || '');
  const [alto, setAlto] = useState(paqueteData.alto || '');
  const [valorDeclarado, setValorDeclarado] = useState(paqueteData.valorDeclarado || '');
  const [tipoServicio, setTipoServicio] = useState(paqueteData.tipoServicio || '');

  const goPrev = () => {
    navigation.navigate('FormDestinatario', { formData });
  };

  const goNext = () => {
    try {
      const sanitized = validatePackagePayload({
        tipoPaquete,
        contenido,
        peso,
        largo,
        ancho,
        alto,
        valorDeclarado,
        tipoServicio,
      });

      navigation.navigate('FormResumenEnvio', {
        formData: {
          ...formData,
          paquete: sanitized,
        },
      });
    } catch (error) {
      Alert.alert('Datos invalidos', error.message || 'Revisa los datos del paquete.');
    }
  };

  return (
    <MainLayout title="Registro de Envío" navigation={navigation} backTo="FormDestinatario" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 3 de 4 - Información del paquete</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Tipo de paquete" placeholderTextColor="#9AA4BF" value={tipoPaquete} onChangeText={(value) => setTipoPaquete(sanitizeText(value))} />
        <TextInput style={styles.input} placeholder="Contenido" placeholderTextColor="#9AA4BF" value={contenido} onChangeText={(value) => setContenido(sanitizeText(value))} />
        <TextInput style={styles.input} placeholder="Peso (kg)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={peso} onChangeText={setPeso} />
        <TextInput style={styles.input} placeholder="Largo (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={largo} onChangeText={setLargo} />
        <TextInput style={styles.input} placeholder="Ancho (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={ancho} onChangeText={setAncho} />
        <TextInput style={styles.input} placeholder="Alto (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={alto} onChangeText={setAlto} />
        <TextInput style={styles.input} placeholder="Valor declarado" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={valorDeclarado} onChangeText={setValorDeclarado} />
        <TextInput style={styles.input} placeholder="Tipo servicio (normal, express, economico)" placeholderTextColor="#9AA4BF" value={tipoServicio} onChangeText={setTipoServicio} autoCapitalize="none" />
        <Text style={styles.helperText}>Servicio permitido: normal, express o economico</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={goPrev}>
          <Text style={styles.btnSecondaryText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>Revisar</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
