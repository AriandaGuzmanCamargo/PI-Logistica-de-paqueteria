import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import MainLayout from '../components/MainLayout';
import { changePasswordRequest } from '../services/authService';
import { getCurrentUser } from '../services/sessionService';
import styles from '../styles/CambiarContrasenaStyles';

export default function CambiarContrasenaScreen({ navigation }) {
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async () => {
    try {
      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
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
        throw new Error('La nueva contrasena debe tener al menos 6 caracteres.');
      }

      if (payload.nuevaContrasena !== payload.confirmarContrasena) {
        throw new Error('Las contrasenas no coinciden.');
      }

      setIsSubmitting(true);
      await changePasswordRequest(user.id_usuario, payload);

      Alert.alert('Contrasena actualizada', 'Tu contrasena se guardo correctamente.', [
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
    <MainLayout title="Cambiar Contrasena" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <Text style={styles.helpText}>Ingresa tu contrasena actual y luego crea una nueva contrasena segura.</Text>
        <TextInput style={styles.input} placeholder="Contrasena actual" placeholderTextColor="#9AA4BF" secureTextEntry value={contrasenaActual} onChangeText={setContrasenaActual} />
        <TextInput style={styles.input} placeholder="Nueva contrasena" placeholderTextColor="#9AA4BF" secureTextEntry value={nuevaContrasena} onChangeText={setNuevaContrasena} />
        <TextInput style={styles.input} placeholder="Confirmar contrasena" placeholderTextColor="#9AA4BF" secureTextEntry value={confirmarContrasena} onChangeText={setConfirmarContrasena} />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleChangePassword} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Guardar nueva contrasena</Text>}
      </TouchableOpacity>
    </MainLayout>
  );
}
