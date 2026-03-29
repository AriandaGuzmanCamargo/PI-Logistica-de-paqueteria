import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        throw new Error('Correo inválido.');
      }

      setIsSubmitting(true);
      await recoverPasswordRequest({ correo: email });

      Alert.alert('Solicitud enviada', 'Tu solicitud de recuperación fue registrada. Contacta al administrador.', [
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
      <LinearGradient
        colors={['#1A2D50', '#2A4A7A', '#3B6AAA', '#4A7EC0', '#5A90D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />
        <View style={styles.waveThree} />
        <View style={styles.waveFour} />

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.heroRow}>
              <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Recuperar Contraseña</Text>
              <Text style={styles.subtitle}>Ingresa tu correo para recuperar tu contraseña.</Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9AA4BF"
                value={correo}
                onChangeText={setCorreo}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.primaryBtn} onPress={handleRecover} disabled={isSubmitting}>
                <LinearGradient
                  colors={['#E9CD7A', '#DBAC35', '#E9CD7A']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryBtnGradient}
                >
                  {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryBtnText}>Enviar Enlace de Recuperación</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.note}>¿Recordaste tu contraseña? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesión</Text></Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
