import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { getPerfilUsuarioRequest } from '../services/authService';
import { clearCurrentSession, getCurrentUser, updateCurrentUser } from '../services/sessionService';
import styles from '../styles/MenuUsuarioStyles';

function MenuIcon({ iconSet, iconName, active = false }) {
  const color = active ? '#2F5DAA' : '#4A5D85';
  const size = 19;

  if (iconSet === 'material') {
    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
  }

  if (iconSet === 'ion') {
    return <Ionicons name={iconName} size={size} color={color} />;
  }

  return <Feather name={iconName} size={size} color={color} />;
}

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
    { label: 'Inicio', route: 'Dashboard', iconSet: 'ion', iconName: 'home-outline' },
    { label: 'Mis Envíos', route: 'MisEnvios', iconSet: 'material', iconName: 'truck-delivery-outline' },
    { label: 'Rastrear Envío', route: 'RastrearEnvio', iconSet: 'material', iconName: 'map-marker-path' },
    { label: 'Nuevo Envío', route: 'NuevoEnvio', iconSet: 'feather', iconName: 'plus-square' },
    { label: 'Direcciones Guardadas', route: 'DireccionesGuardadas', iconSet: 'ion', iconName: 'location-outline' },
    { label: 'Facturación', route: 'PagoOpciones', iconSet: 'feather', iconName: 'credit-card' },
    { label: 'Configuración', route: 'ConfiguracionUsuario', iconSet: 'ion', iconName: 'settings-outline' },
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
        {items.map((item) => (
          <TouchableOpacity key={item.label} style={styles.item} onPress={() => navigation.navigate(item.route)}>
            <View style={styles.itemLeft}>
              <View style={styles.iconPill}>
                <MenuIcon iconSet={item.iconSet} iconName={item.iconName} />
              </View>
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#8E9AB6" />
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
        <View style={styles.logoutInner}>
          <Feather name="log-out" size={16} color="#FFFFFF" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </MainLayout>
  );
}
