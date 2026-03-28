import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import getConfiguracionRStyles from '../styles/ConfiguracionRStyles';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function ConfiguracionR({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { isDarkMode: darkModeEnabled, setIsDarkMode: setDarkModeEnabled } = useDarkMode();

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getConfiguracionRStyles(s, darkModeEnabled);

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

        <TopHeaderR s={s} navigation={navigation} title="Configuración" />

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate('CambiarContrasenaR')}>
              <Text style={styles.optionText}>Cambiar contraseña</Text>
              <Text style={styles.optionArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Preferencias</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Modo oscuro</Text>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#C8D3EA', true: '#5A78B6' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Activar/desactivar notificaciones</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#C8D3EA', true: '#5A78B6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </ScrollView>

        <BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />
      </SafeAreaView>
    </View>
  );
}
