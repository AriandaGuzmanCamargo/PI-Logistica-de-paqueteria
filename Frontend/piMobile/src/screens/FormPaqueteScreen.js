import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormPaqueteStyles';

const SERVICE_TYPES = ['normal', 'express', 'economico'];

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
    const sanitized = {
      tipoPaquete: tipoPaquete.trim(),
      contenido: contenido.trim(),
      peso: peso.trim(),
      largo: largo.trim(),
      ancho: ancho.trim(),
      alto: alto.trim(),
      valorDeclarado: valorDeclarado.trim(),
      tipoServicio: tipoServicio.trim().toLowerCase(),
    };

    if (!sanitized.tipoPaquete || !sanitized.contenido || !sanitized.peso || !sanitized.largo || !sanitized.ancho || !sanitized.alto || !sanitized.valorDeclarado || !sanitized.tipoServicio) {
      Alert.alert('Campos obligatorios', 'Completa todos los campos del paquete.');
      return;
    }

    const numericFields = [
      { key: 'peso', label: 'Peso' },
      { key: 'largo', label: 'Largo' },
      { key: 'ancho', label: 'Ancho' },
      { key: 'alto', label: 'Alto' },
      { key: 'valorDeclarado', label: 'Valor declarado' },
    ];

    for (const field of numericFields) {
      const parsed = Number(sanitized[field.key]);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        Alert.alert('Valor invalido', `${field.label} debe ser un numero mayor a 0.`);
        return;
      }
    }

    if (!SERVICE_TYPES.includes(sanitized.tipoServicio)) {
      Alert.alert('Tipo de servicio invalido', 'Usa: normal, express o economico.');
      return;
    }

    navigation.navigate('FormResumenEnvio', {
      formData: {
        ...formData,
        paquete: sanitized,
      },
    });
  };

  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormDestinatario" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 3 de 4 - Informacion del paquete</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Tipo de paquete" placeholderTextColor="#9AA4BF" value={tipoPaquete} onChangeText={setTipoPaquete} />
        <TextInput style={styles.input} placeholder="Contenido" placeholderTextColor="#9AA4BF" value={contenido} onChangeText={setContenido} />
        <TextInput style={styles.input} placeholder="Peso (kg)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={peso} onChangeText={setPeso} />
        <TextInput style={styles.input} placeholder="Largo (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={largo} onChangeText={setLargo} />
        <TextInput style={styles.input} placeholder="Ancho (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={ancho} onChangeText={setAncho} />
        <TextInput style={styles.input} placeholder="Alto (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={alto} onChangeText={setAlto} />
        <TextInput style={styles.input} placeholder="Valor declarado" placeholderTextColor="#9AA4BF" keyboardType="numeric" value={valorDeclarado} onChangeText={setValorDeclarado} />
        <TextInput style={styles.input} placeholder="Tipo servicio (normal, express, economico)" placeholderTextColor="#9AA4BF" value={tipoServicio} onChangeText={setTipoServicio} autoCapitalize="none" />
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
