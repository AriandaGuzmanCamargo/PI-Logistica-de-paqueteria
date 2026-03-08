import React from 'react';
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
import HeaderLogoR from '../components/HeaderLogoR';
import UserAvatarR from '../components/UserAvatarR';
import getPerfilRStyles from '../styles/PerfilR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function PerfilR({ navigation }) {
	const { isDarkMode } = useDarkMode();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getPerfilRStyles(s, isDarkMode);

  const handleLogout = () => {
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

        <View style={styles.topHeader}>
          <View style={styles.topHeaderLeft}>
            <HeaderLogoR s={s} />
            <Text style={styles.topHeaderTitle}>Perfil Repartidor</Text>
          </View>
          <UserAvatarR s={s} />
        </View>

        <View style={styles.coverArea} />

        <View style={styles.profileWrap}>
          <View style={styles.photoFrame}>
            <Image source={require('../../../images/usuario.png')} style={styles.profilePhoto} resizeMode="cover" />
          </View>

          <Text style={styles.profileName}>Juan Perez</Text>
          <View style={styles.roleRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.roleText}>Repartidor</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rol:</Text>
              <Text style={styles.infoValue}>Repartidor</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>juanperes@email.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefono:</Text>
              <Text style={styles.infoValue}>+32 55 1234 5678</Text>
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
