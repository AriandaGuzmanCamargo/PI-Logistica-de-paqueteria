import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import { getPerfilUsuarioRequest, updatePerfilUsuarioRequest } from '../services/authService';
import { getCurrentUser, updateCurrentUser } from '../services/sessionService';
import styles from '../styles/DatosPersonalesStyles';

function formatDate(isoString) {
  if (!isoString) return 'Sin fecha';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DatosPersonalesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profile, setProfile] = useState(null);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const currentUser = getCurrentUser();

        if (!currentUser?.id_usuario) {
          throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
        }

        const data = await getPerfilUsuarioRequest(currentUser.id_usuario);
        setProfile(data);
        setNombre(data?.nombre || '');
        setApellido(data?.apellido || '');
        setCorreo(data?.correo || '');
        setTelefono(data?.telefono || '');
        setCiudad(data?.ciudad || '');
      } catch (error) {
        setErrorMessage(error.message || 'No se pudo cargar tu perfil.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
      }

      const payload = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        ciudad: ciudad.trim(),
      };

      if (!payload.nombre || !payload.apellido || !payload.correo || !payload.telefono || !payload.ciudad) {
        throw new Error('Todos los campos son obligatorios.');
      }

      if (!/^\d{8,15}$/.test(payload.telefono)) {
        throw new Error('Telefono invalido. Usa solo digitos de 8 a 15 caracteres.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.correo)) {
        throw new Error('Correo invalido.');
      }

      setIsSaving(true);
      const updated = await updatePerfilUsuarioRequest(currentUser.id_usuario, payload);
      setProfile(updated);

      updateCurrentUser({
        nombre: updated.nombre,
        apellido: updated.apellido,
        correo: updated.correo,
      });

      Alert.alert('Listo', 'Datos personales actualizados correctamente.');
    } catch (error) {
      Alert.alert('No se pudo guardar', error.message || 'Intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout title="Datos Personales" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
        <View style={styles.stateWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Cargando perfil...</Text>
        </View>
      </MainLayout>
    );
  }

  if (errorMessage || !profile) {
    return (
      <MainLayout title="Datos Personales" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
        <View style={styles.stateWrap}>
          <Text style={[styles.stateText, styles.stateError]}>{errorMessage || 'No se pudo cargar el perfil.'}</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Datos Personales" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" placeholderTextColor="#9AA4BF" />

        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} value={apellido} onChangeText={setApellido} placeholder="Apellido" placeholderTextColor="#9AA4BF" />

        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} value={correo} onChangeText={setCorreo} placeholder="Correo" placeholderTextColor="#9AA4BF" autoCapitalize="none" keyboardType="email-address" />

        <Text style={styles.label}>Telefono</Text>
        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="Telefono" placeholderTextColor="#9AA4BF" keyboardType="numeric" />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput style={styles.input} value={ciudad} onChangeText={setCiudad} placeholder="Ciudad" placeholderTextColor="#9AA4BF" />

        <Text style={styles.row}>Fecha de registro: {formatDate(profile.fecha_registro)}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={isSaving}>
          {isSaving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Guardar cambios</Text>}
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
