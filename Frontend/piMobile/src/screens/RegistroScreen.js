import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { registerRequest } from '../services/authService';
import styles from '../styles/RegistroStyles';

export default function RegistroScreen({ navigation }) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    try {
      const payload = {
        nombreCompleto: nombreCompleto.trim(),
        correo: correo.trim().toLowerCase(),
        contrasena: contrasena.trim(),
        confirmarContrasena: confirmarContrasena.trim(),
      };

      if (!payload.nombreCompleto || !payload.correo || !payload.contrasena || !payload.confirmarContrasena) {
        throw new Error('Completa todos los campos.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(payload.correo)) {
        throw new Error('Correo invalido.');
      }

      if (payload.contrasena.length < 6) {
        throw new Error('La contrasena debe tener al menos 6 caracteres.');
      }

      if (payload.contrasena !== payload.confirmarContrasena) {
        throw new Error('Las contrasenas no coinciden.');
      }

      setIsSubmitting(true);
      await registerRequest(payload);

      Alert.alert('Cuenta creada', 'Tu cuenta fue registrada correctamente. Ahora inicia sesion.', [
        {
          text: 'Ir a login',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo registrar', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Sistema de Logistica de Transporte de Paqueteria</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Registrarse</Text>
            <Text style={styles.subtitle}>Crea tu cuenta para continuar.</Text>

            <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombreCompleto} onChangeText={setNombreCompleto} />
            <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Contrasena" placeholderTextColor="#9AA4BF" secureTextEntry value={contrasena} onChangeText={setContrasena} />
            <TextInput style={styles.input} placeholder="Confirmar contrasena" placeholderTextColor="#9AA4BF" secureTextEntry value={confirmarContrasena} onChangeText={setConfirmarContrasena} />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={isSubmitting}>
              {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryBtnText}>Registrarse</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.secondaryBtnText}>Ya tengo cuenta</Text>
            </TouchableOpacity>

            <Text style={styles.note}>Ya tienes cuenta? <Text style={styles.linkStrong} onPress={() => navigation.navigate('Login')}>Inicia sesion</Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
