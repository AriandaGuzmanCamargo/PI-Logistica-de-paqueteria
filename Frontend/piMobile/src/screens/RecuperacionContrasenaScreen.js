import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { API_BASE_URL } from '../config/api';
import styles from '../styles/RecuperacionContrasenaStyles';

async function recoverPassword(correo, nuevaContrasena, confirmarContrasena) {
  const response = await fetch(`${API_BASE_URL}/auth/recuperar-contrasena-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correo,
      nuevaContrasena,
      confirmarContrasena,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al recuperar contraseña');
  }

  return response.json();
}

export default function RecuperacionContrasenaScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);
  const [showConfirmarContrasena, setShowConfirmarContrasena] = useState(false);

  const handleRecoverPassword = async () => {
    try {
      const correoLimpio = correo.trim().toLowerCase();

      if (!correoLimpio || !nuevaContrasena.trim() || !confirmarContrasena.trim()) {
        throw new Error('Completa todos los campos.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correoLimpio)) {
        throw new Error('Correo inválido.');
      }

      if (nuevaContrasena.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
      }

      if (nuevaContrasena !== confirmarContrasena) {
        throw new Error('Las contraseñas no coinciden.');
      }

      setIsSubmitting(true);
      await recoverPassword(correoLimpio, nuevaContrasena, confirmarContrasena);

      Alert.alert('Contraseña actualizada', 'Tu contraseña se cambió correctamente.', [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo cambiar la contraseña', error.message || 'Intenta nuevamente.');
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
              <Text style={styles.title}>Cambiar Contraseña</Text>
              <Text style={styles.subtitle}>Ingresa tu correo y una nueva contraseña.</Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9AA4BF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
                editable={!isSubmitting}
              />

              <View style={styles.passwordGroupBox}>
                <View style={[styles.passwordInputContainer, styles.passwordRowWithDivider]}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Nueva contraseña"
                    placeholderTextColor="#9AA4BF"
                    secureTextEntry={!showNuevaContrasena}
                    value={nuevaContrasena}
                    onChangeText={setNuevaContrasena}
                    editable={!isSubmitting}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowNuevaContrasena(!showNuevaContrasena)}
                    disabled={isSubmitting}
                  >
                    <Feather name={showNuevaContrasena ? 'eye' : 'eye-off'} size={20} color="#6B7393" />
                  </TouchableOpacity>
                </View>

                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor="#9AA4BF"
                    secureTextEntry={!showConfirmarContrasena}
                    value={confirmarContrasena}
                    onChangeText={setConfirmarContrasena}
                    editable={!isSubmitting}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmarContrasena(!showConfirmarContrasena)}
                    disabled={isSubmitting}
                  >
                    <Feather name={showConfirmarContrasena ? 'eye' : 'eye-off'} size={20} color="#6B7393" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, isSubmitting && styles.primaryBtnDisabled]}
                onPress={handleRecoverPassword}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={['#E9CD7A', '#DBAC35', '#E9CD7A']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryBtnGradient}
                >
                  {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryBtnText}>Cambiar Contraseña</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.note}>¿Recordaste tu contraseña? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesión</Text></Text>
            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
