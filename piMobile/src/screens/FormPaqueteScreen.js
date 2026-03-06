import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/FormPaqueteStyles';

export default function FormPaqueteScreen({ navigation }) {
  return (
    <MainLayout title="Registro de Envio" navigation={navigation} backTo="FormDestinatario" activeTab="RastrearEnvio">
      <Text style={styles.step}>Paso 3 de 4 - Informacion del paquete</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="Tipo de paquete" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Contenido" placeholderTextColor="#9AA4BF" />
        <TextInput style={styles.input} placeholder="Peso (kg)" placeholderTextColor="#9AA4BF" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Largo (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Ancho (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Alto (cm)" placeholderTextColor="#9AA4BF" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Valor declarado" placeholderTextColor="#9AA4BF" keyboardType="numeric" />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('FormDestinatario')}>
          <Text style={styles.btnSecondaryText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FormResumenEnvio')}>
          <Text style={styles.btnText}>Revisar</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
