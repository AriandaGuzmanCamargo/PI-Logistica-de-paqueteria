import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/LoginStyles';
import { loginRequest } from '../services/authService';
import { setCurrentUser } from '../services/sessionService';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !contrasena.trim()) {
      setErrorMessage('Ingresa correo y contraseña.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const data = await loginRequest({
        correo: correoLimpio,
        contrasena,
      });

      const usuario = data?.usuario ?? null;
      const rol = String(usuario?.rol || '').toLowerCase();

      if (rol === 'conductor') {
        setCurrentUser(usuario);
        navigation.navigate('DashboardR');
        return;
      }

      if (rol === 'cliente') {
        setCurrentUser(usuario);
        navigation.navigate('Dashboard');
        return;
      }

      throw new Error('Esta cuenta no tiene acceso a la app móvil.');
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo iniciar sesión.');
    } finally {
      setIsLoading(false);
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
            <View style={styles.hero}>
              <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
              <Text style={styles.heroText}>Metzvia</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <Text style={styles.subtitle}>Bienvenido. Por favor inicie sesión para continuar.</Text>

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9AA4BF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="Contraseña"
                  placeholderTextColor="#9AA4BF"
                  secureTextEntry={!showPassword}
                  value={contrasena}
                  onChangeText={setContrasena}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword((prev) => !prev)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6D79A2"
                  />
                </TouchableOpacity>
              </View>

              {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

              <TouchableOpacity
                style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#E9CD7A', '#DBAC35', '#E9CD7A']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryBtnGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.primaryBtnText}>Iniciar Sesión</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('RecuperacionContrasena')}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.note}>¿No tienes cuenta? <Text style={styles.linkStrong}>Regístrate</Text></Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
