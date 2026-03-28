import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { recoverPasswordRequest } from '../services/authService';
import styles from '../styles/RecuperacionContrasenaStyles';

export default function RecuperacionContrasenaScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecover = async () => {
    try {
      const email = correo.trim().toLowerCase();

      if (!email) {
        throw new Error('Ingresa tu correo.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new Error('Correo invalido.');
      }

      setIsSubmitting(true);
      await recoverPasswordRequest({ correo: email });

      Alert.alert('Solicitud enviada', 'Tu solicitud de recuperacion fue registrada. Contacta al administrador.', [
        {
          text: 'Volver al login',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo recuperar', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Sistema de Logistica de Transporte de Paqueteria</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Recuperar Contrasena</Text>
            <Text style={styles.subtitle}>Ingresa tu correo para recuperar tu contrasena.</Text>

          <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
          <TouchableOpacity style={styles.primaryBtn} onPress={handleRecover} disabled={isSubmitting}>
            {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryBtnText}>Enviar Solicitud de Recuperacion</Text>}
          </TouchableOpacity>

            <Text style={styles.note}>Recordaste tu contrasena? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesion</Text></Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
