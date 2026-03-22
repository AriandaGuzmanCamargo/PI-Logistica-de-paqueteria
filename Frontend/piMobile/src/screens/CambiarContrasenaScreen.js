import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/CambiarContrasenaStyles';

export default function CambiarContrasenaScreen({ navigation }) {
  return (
    <MainLayout title="Cambiar Contrasena" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <Text style={styles.helpText}>Ingresa tu contrasena actual y luego crea una nueva contrasena segura.</Text>
        <TextInput style={styles.input} placeholder="Contrasena actual" placeholderTextColor="#9AA4BF" secureTextEntry />
        <TextInput style={styles.input} placeholder="Nueva contrasena" placeholderTextColor="#9AA4BF" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirmar contrasena" placeholderTextColor="#9AA4BF" secureTextEntry />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ConfiguracionUsuario')}>
        <Text style={styles.btnText}>Guardar nueva contrasena</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
