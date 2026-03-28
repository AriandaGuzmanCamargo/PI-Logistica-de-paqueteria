import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import getPerfilRStyles from '../styles/PerfilR';
import { useDarkMode } from '../context/DarkModeContext';
import { clearCurrentUser, getCurrentUser } from '../../services/authService';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function PerfilR({ navigation }) {
	const { isDarkMode } = useDarkMode();
  const [usuario, setUsuario] = useState(null);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getPerfilRStyles(s, isDarkMode);

  useEffect(() => {
    setUsuario(getCurrentUser());
  }, []);

  const nombreCompleto = useMemo(() => {
    const nombre = usuario?.nombre?.trim() || '';
    const apellido = usuario?.apellido?.trim() || '';
    const fullName = `${nombre} ${apellido}`.trim();

    return fullName || 'Repartidor';
  }, [usuario]);

  const rolTexto = useMemo(() => {
    if (usuario?.rol === 'conductor') {
      return 'Repartidor';
    }

    if (usuario?.rol === 'cliente') {
      return 'Usuario';
    }

    return usuario?.rol || 'Sin rol';
  }, [usuario]);

  const handleLogout = () => {
    clearCurrentUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={isWeb ? styles.webRoot : styles.nativeRoot}>
      <SafeAreaView
        style={[
          styles.safeArea,
          isWeb && {
            width: phoneWidth,
            height: '100%',
            maxHeight: 860,
          },
        ]}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

        <TopHeaderR s={s} navigation={navigation} />

        <View style={styles.coverArea} />

        <View style={styles.profileWrap}>
          <View style={styles.photoFrame}>
            <Image source={require('../../../images/usuario.png')} style={styles.profilePhoto} resizeMode="cover" />
          </View>

          <Text style={styles.profileName}>{nombreCompleto}</Text>
          <View style={styles.roleRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.roleText}>{rolTexto}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rol:</Text>
              <Text style={styles.infoValue}>{rolTexto}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{usuario?.correo || 'No registrado'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefono:</Text>
              <Text style={styles.infoValue}>{usuario?.telefono || 'No registrado'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('ConfiguracionR')}>
            <Text style={styles.settingsText}>Configuracion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />
      </SafeAreaView>
    </View>
  );
}
