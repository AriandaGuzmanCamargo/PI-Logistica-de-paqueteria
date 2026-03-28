import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getPerfilUsuarioRequest } from '../services/authService';
import { clearCurrentSession, getCurrentUser, updateCurrentUser } from '../services/sessionService';
import styles from '../styles/MenuUsuarioStyles';

export default function MenuUsuarioScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('Usuario');
  const [displayEmail, setDisplayEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      const syncProfile = async () => {
        const user = getCurrentUser();

        if (!user?.id_usuario) {
          setDisplayName('Usuario');
          setDisplayEmail('');
          return;
        }

        setDisplayName([user.nombre, user.apellido].filter(Boolean).join(' ') || 'Usuario');
        setDisplayEmail(user.correo || '');

        try {
          const profile = await getPerfilUsuarioRequest(user.id_usuario);

          setDisplayName([profile?.nombre, profile?.apellido].filter(Boolean).join(' ') || 'Usuario');
          setDisplayEmail(profile?.correo || '');

          updateCurrentUser({
            nombre: profile?.nombre,
            apellido: profile?.apellido,
            correo: profile?.correo,
          });
        } catch {
          // Si falla backend, mantiene los datos actuales de sesión.
        }
      };

      syncProfile();
    }, [])
  );

  const items = [
    ['Inicio', 'Dashboard'],
    ['Mis Envios', 'MisEnvios'],
    ['Rastrear Envio', 'RastrearEnvio'],
    ['Nuevo Envio', 'NuevoEnvio'],
    ['Direcciones Guardadas', 'DireccionesGuardadas'],
    ['Facturacion', 'PagoOpciones'],
    ['Configuracion', 'ConfiguracionUsuario'],
  ];

  return (
    <MainLayout
      title={displayName}
      subtitle={displayEmail}
      navigation={navigation}
      backTo="Dashboard"
      activeTab="MenuUsuario"
    >
      <View style={styles.card}>
        {items.map(([label, route]) => (
          <TouchableOpacity key={label} style={styles.item} onPress={() => navigation.navigate(route)}>
            <Text style={styles.itemText}>{label}</Text>
            <Text style={styles.arrow}>Abrir</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          clearCurrentSession();
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.logoutText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
