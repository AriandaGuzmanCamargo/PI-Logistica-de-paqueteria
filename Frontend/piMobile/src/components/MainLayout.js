import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/MainLayoutStyles';

const tabs = [
  { label: 'Inicio', route: 'Dashboard', iconSet: 'ionicons', iconName: 'home-outline', activeIconName: 'home' },
  { label: 'Envíos', route: 'RastrearEnvio', iconSet: 'material', iconName: 'package-variant-closed', activeIconName: 'package-variant' },
  { label: 'Menú', route: 'MenuUsuario', iconSet: 'feather', iconName: 'menu', activeIconName: 'menu' },
];

function TabIcon({ tab, active }) {
  const color = active ? '#2A4E90' : '#8A96B7';
  const size = 18;

  if (tab.iconSet === 'material') {
    return <MaterialCommunityIcons name={active ? tab.activeIconName : tab.iconName} size={size} color={color} />;
  }

  if (tab.iconSet === 'feather') {
    return <Feather name={active ? tab.activeIconName : tab.iconName} size={size} color={color} />;
  }

  return <Ionicons name={active ? tab.activeIconName : tab.iconName} size={size} color={color} />;
}

function prettifyRouteName(routeName = '') {
  const routeMap = {
    Dashboard: 'Inicio',
    DashboardR: 'Repartidor',
    MenuUsuario: 'Menú Usuario',
    RastrearEnvio: 'Rastrear Envío',
    MisEnvios: 'Mis Envíos',
    Notificaciones: 'Notificaciones',
    NotificacionesR: 'Notificaciones',
    ConfiguracionUsuario: 'Configuración',
    ConfiguracionR: 'Configuración',
    DireccionesGuardadas: 'Direcciones Guardadas',
    NuevoEnvio: 'Nuevo Envío',
    PerfilR: 'Perfil',
    EntregasR: 'Entregas',
    RutaR: 'Ruta',
  };

  if (routeMap[routeName]) {
    return routeMap[routeName];
  }

  return String(routeName)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function MainLayout({
  title,
  navigation,
  backTo,
  children,
  activeTab,
  subtitle,
}) {
  const state = navigation.getState();
  const currentRouteName = state?.routes?.[state.index]?.name || '';
  const centeredSubtitle = String(subtitle || '').trim()
    || String(title || '').trim()
    || prettifyRouteName(currentRouteName)
    || prettifyRouteName(activeTab || '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrap}>
        <View style={styles.bgBubbleTop} />
        <View style={styles.bgBubbleBottom} />

        <View style={styles.shell}>
          <LinearGradient
            colors={['#1A2D50', '#2F66B0', '#7399CC']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.header}
          >
            <View style={styles.headerRow}>
              <View style={styles.brandWrap}>
                <Image
                  source={require('../../images/logoSinFondo.png')}
                  style={styles.brandLogo}
                  resizeMode="contain"
                />
                <Text style={styles.brandText}>Metzvia</Text>
              </View>

              <View style={styles.rightGroup}>
                <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Notificaciones')}>
                  <Image
                    source={require('../../images/bell_9972125.png')}
                    style={styles.bellIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {centeredSubtitle ? (
            <View style={styles.pageHeading}>
              <Text style={styles.centeredSubtitle}>{centeredSubtitle}</Text>
            </View>
          ) : null}

          <ScrollView contentContainerStyle={styles.mainArea} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          <View style={styles.bottomNav}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.route}
                style={[styles.navBtn, activeTab === tab.route && styles.navBtnActive]}
                onPress={() => navigation.navigate(tab.route)}
              >
                <View style={styles.navIconWrap}>
                  <TabIcon tab={tab} active={activeTab === tab.route} />
                </View>
                <Text style={[styles.navLink, activeTab === tab.route && styles.navLinkActive]}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
