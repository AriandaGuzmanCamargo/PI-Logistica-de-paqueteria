import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import getDetalleIncidenciaRStyles from '../styles/DetalleIncidenciaRStyles';
import UserAvatarR from '../components/UserAvatarR';
import HeaderLogoR from '../components/HeaderLogoR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function DetalleIncidenciaR({ navigation, route }) {
  const report = route?.params?.report;
  const { isDarkMode } = useDarkMode();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getDetalleIncidenciaRStyles(s, isDarkMode);

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
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>{'<'}</Text>
            </TouchableOpacity>
            <HeaderLogoR s={s} />
            <Text style={styles.topHeaderTitle}>Detalle de Incidencia</Text>
          </View>

          <UserAvatarR s={s} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.label}>Codigo del paquete</Text>
            <Text style={styles.value}>{report?.trackingId || 'Sin codigo'}</Text>

            <Text style={styles.label}>Tipo de incidencia</Text>
            <Text style={styles.value}>{report?.type || 'Sin tipo de incidencia'}</Text>

            <Text style={styles.label}>Comentario</Text>
            <Text style={styles.value}>{report?.comment || 'Sin comentario'}</Text>

            <Text style={styles.label}>Fotografia</Text>
            {report?.photo ? (
              <Image source={report.photo} style={styles.photo} resizeMode="cover" />
            ) : (
              <Text style={styles.value}>Sin fotografia</Text>
            )}
          </View>
        </ScrollView>

        <BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />
      </SafeAreaView>
    </View>
  );
}
