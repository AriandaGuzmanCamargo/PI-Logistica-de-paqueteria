import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        throw new Error('Correo inválido.');
      }

      if (payload.contrasena.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }

      if (payload.contrasena !== payload.confirmarContrasena) {
        throw new Error('Las contraseñas no coinciden.');
      }

      setIsSubmitting(true);
      await registerRequest(payload);

      Alert.alert('Cuenta creada', 'Tu cuenta fue registrada correctamente. Ahora inicia sesión.', [
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

        <KeyboardAvoidingView
          style={styles.keyboardWrap}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            automaticallyAdjustKeyboardInsets
          >
            <View style={styles.content}>
              <View style={styles.heroRow}>
                <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
              </View>

            <View style={styles.card}>
              <Text style={styles.title}>Registrarse</Text>
              <Text style={styles.subtitle}>Crea tu cuenta para continuar.</Text>

              <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" value={nombreCompleto} onChangeText={setNombreCompleto} />
              <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#9AA4BF" value={correo} onChangeText={setCorreo} autoCapitalize="none" keyboardType="email-address" />
              <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#9AA4BF" secureTextEntry value={contrasena} onChangeText={setContrasena} />
              <TextInput style={styles.input} placeholder="Confirmar contraseña" placeholderTextColor="#9AA4BF" secureTextEntry value={confirmarContrasena} onChangeText={setConfirmarContrasena} />

              <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={isSubmitting}>
                <LinearGradient
                  colors={['#E9CD7A', '#DBAC35', '#E9CD7A']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryBtnGradient}
                >
                  {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryBtnText}>Registrarse</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.note}>¿Ya tienes cuenta? <Text style={styles.linkStrong} onPress={() => navigation.navigate('Login')}>Inicia sesión</Text></Text>
            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
