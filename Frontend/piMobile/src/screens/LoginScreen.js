import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/LoginStyles';
import { loginRequest } from '../services/authService';
import { setCurrentUser } from '../services/sessionService';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !contrasena.trim()) {
      setErrorMessage('Ingresa correo y contrasena.');
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

      setCurrentUser(usuario);

      if (rol === 'conductor') {
        navigation.navigate('DashboardR');
        return;
      }

      if (rol === 'cliente') {
        navigation.navigate('Dashboard');
        return;
      }

      throw new Error('Esta cuenta no tiene acceso a la app movil.');
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo iniciar sesion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Metzvia</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Iniciar Sesion</Text>
            <Text style={styles.subtitle}>Bienvenido. Por favor inicie sesion para continuar.</Text>

            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              placeholderTextColor="#9AA4BF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />
            <TextInput
              style={styles.input}
              placeholder="Contrasena"
              placeholderTextColor="#9AA4BF"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <TouchableOpacity
              style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryBtnText}>Iniciar Sesion</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperacionContrasena')}>
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.note}>No tienes cuenta? <Text style={styles.linkStrong}>Registrate</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
