import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { changePasswordRequest } from '../services/authService';
import { getCurrentUser } from '../services/sessionService';
import styles from '../styles/CambiarContrasenaStyles';

export default function CambiarContrasenaScreen({ navigation }) {
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContrasenaActual, setShowContrasenaActual] = useState(false);
  const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);
  const [showConfirmarContrasena, setShowConfirmarContrasena] = useState(false);

  const handleChangePassword = async () => {
    try {
      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
      }

      const payload = {
        contrasenaActual: contrasenaActual.trim(),
        nuevaContrasena: nuevaContrasena.trim(),
        confirmarContrasena: confirmarContrasena.trim(),
      };

      if (!payload.contrasenaActual || !payload.nuevaContrasena || !payload.confirmarContrasena) {
        throw new Error('Completa todos los campos.');
      }

      if (payload.nuevaContrasena.length < 6) {
        throw new Error('La nueva contraseña debe tener al menos 6 caracteres.');
      }

      if (payload.nuevaContrasena !== payload.confirmarContrasena) {
        throw new Error('Las contraseñas no coinciden.');
      }

      setIsSubmitting(true);
      await changePasswordRequest(user.id_usuario, payload);

      Alert.alert('Contraseña actualizada', 'Tu contraseña se guardó correctamente.', [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('ConfiguracionUsuario'),
        },
      ]);
    } catch (error) {
      Alert.alert('No se pudo actualizar', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="Cambiar Contraseña" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <Text style={styles.helpText}>Ingresa tu contraseña actual y luego crea una nueva contraseña segura.</Text>

        <View style={styles.passwordInputContainer}>
          <TextInput style={styles.passwordInput} placeholder="Contraseña actual" placeholderTextColor="#9AA4BF" secureTextEntry={!showContrasenaActual} value={contrasenaActual} onChangeText={setContrasenaActual} />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowContrasenaActual(!showContrasenaActual)} disabled={isSubmitting}>
            <Feather name={showContrasenaActual ? 'eye' : 'eye-off'} size={20} color="#6B7393" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput style={styles.passwordInput} placeholder="Nueva contraseña" placeholderTextColor="#9AA4BF" secureTextEntry={!showNuevaContrasena} value={nuevaContrasena} onChangeText={setNuevaContrasena} />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNuevaContrasena(!showNuevaContrasena)} disabled={isSubmitting}>
            <Feather name={showNuevaContrasena ? 'eye' : 'eye-off'} size={20} color="#6B7393" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput style={styles.passwordInput} placeholder="Confirmar contraseña" placeholderTextColor="#9AA4BF" secureTextEntry={!showConfirmarContrasena} value={confirmarContrasena} onChangeText={setConfirmarContrasena} />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmarContrasena(!showConfirmarContrasena)} disabled={isSubmitting}>
            <Feather name={showConfirmarContrasena ? 'eye' : 'eye-off'} size={20} color="#6B7393" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleChangePassword} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Guardar nueva contraseña</Text>}
      </TouchableOpacity>
    </MainLayout>
  );
}
