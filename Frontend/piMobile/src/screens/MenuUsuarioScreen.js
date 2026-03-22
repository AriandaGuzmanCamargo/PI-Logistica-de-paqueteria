import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/MenuUsuarioStyles';

export default function MenuUsuarioScreen({ navigation }) {
  const items = [
    ['Inicio', 'Dashboard'],
    ['Mis Envios', 'MisEnvios'],
    ['Rastrear Envio', 'RastrearEnvio'],
    ['Nuevo Envio', 'NuevoEnvio'],
    ['Cotizar', 'CotizarEnvio'],
    ['Direcciones Guardadas', 'DireccionesGuardadas'],
    ['Facturacion', 'PagoOpciones'],
    ['Notificaciones', 'Notificaciones'],
    ['Configuracion', 'ConfiguracionUsuario'],
  ];

  return (
    <MainLayout
      title="Eduardo Perez"
      subtitle="usuario@email.com"
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
      <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </MainLayout>
  );
}
