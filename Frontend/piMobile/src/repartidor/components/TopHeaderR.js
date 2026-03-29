import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';

function prettifyRouteName(routeName = '') {
  const routeMap = {
    DashboardR: 'Repartidor',
    EntregasR: 'Entregas',
    RutaR: 'Ruta',
    PerfilR: 'Perfil',
    ConfiguracionR: 'Configuración',
    CambiarContrasenaR: 'Cambiar Contraseña',
    NotificacionesR: 'Notificaciones',
  };

  if (routeMap[routeName]) {
    return routeMap[routeName];
  }

  return String(routeName)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function TopHeaderR({ s, navigation, title, subtitle }) {
  const styles = getStyles(s);
  const state = navigation.getState();
  const currentRouteName = state?.routes?.[state.index]?.name || '';
  const centeredSubtitle = String(subtitle || '').trim()
    || String(title || '').trim()
    || prettifyRouteName(currentRouteName);

  return (
    <>
      <LinearGradient
        colors={[colors.primaryDark, '#2F66B0', '#7399CC']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={styles.brandWrap}>
            <Image
              source={require('../../../images/logoSinFondo.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>Metzvia</Text>
          </View>

          <View style={styles.rightGroup}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('NotificacionesR')}>
              <Image
                source={require('../../../images/bell_9972125.png')}
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
    </>
  );
}

function getStyles(s) {
  return StyleSheet.create({
    header: {
      backgroundColor: colors.primaryDark,
      paddingHorizontal: s(14),
      paddingTop: s(34),
      paddingBottom: s(18),
      borderBottomLeftRadius: s(28),
      borderBottomRightRadius: s(28),
      marginTop: 0,
      overflow: 'hidden',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    brandWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
    },
    brandLogo: {
      width: s(146),
      height: s(64),
      marginLeft: s(-24),
      marginTop: s(2),
      transform: [{ scale: 1.9 }],
    },
    brandText: {
      color: colors.white,
      fontSize: s(26),
      fontWeight: '700',
      fontFamily: 'serif',
      marginLeft: s(-16),
      marginTop: s(2),
    },
    rightGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
    },
    iconCircle: {
      width: s(28),
      height: s(28),
      borderRadius: s(14),
      backgroundColor: '#FFFFFF2E',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(2),
    },
    bellIcon: {
      width: s(14),
      height: s(14),
    },
    pageHeading: {
      backgroundColor: '#F4F6FB',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#DDE3F0',
      borderBottomColor: '#DDE3F0',
      paddingHorizontal: s(14),
      paddingTop: s(12),
      paddingBottom: s(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredSubtitle: {
      color: '#1F3762',
      fontSize: s(19),
      fontWeight: '700',
      textAlign: 'center',
    },
  });
}
