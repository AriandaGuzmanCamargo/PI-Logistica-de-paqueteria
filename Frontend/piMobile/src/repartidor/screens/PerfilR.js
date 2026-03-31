import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
import getPerfilRStyles from '../styles/PerfilR';
import { useDarkMode } from '../context/DarkModeContext';
import { clearCurrentUser, getCurrentUser, updatePerfilUsuarioRequest, getPerfilUsuarioRequest } from '../../services/authService';
import { selectAndConvertImage } from '../../utils/imageUtils';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function PerfilR({ navigation }) {
  const { isDarkMode } = useDarkMode();
  const [usuario, setUsuario] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [cargandoFoto, setCargandoFoto] = useState(false);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getPerfilRStyles(s, isDarkMode);

  useEffect(() => {
    const user = getCurrentUser();
    setUsuario(user);
    if (user?.id_usuario) {
      cargarPerfil(user.id_usuario);
    }
  }, []);

  const cargarPerfil = async (idUsuario) => {
    try {
      const profile = await getPerfilUsuarioRequest(idUsuario);
      if (profile?.foto_perfil_url) {
        setFotoPerfil(profile.foto_perfil_url);
      }
    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  };

  const handleCambiarFoto = async () => {
    try {
      setCargandoFoto(true);
      const imageData = await selectAndConvertImage();

      if (!imageData) {
        setCargandoFoto(false);
        return;
      }

      // Guardar temporalmente para mostrar mientras se carga
      setFotoPerfil(imageData.base64);

      // Actualizar la foto en el servidor
      const perfilActualizado = await updatePerfilUsuarioRequest(usuario.id_usuario, {
        foto_perfil_url: imageData.base64,
      });

      if (perfilActualizado?.foto_perfil_url) {
        setFotoPerfil(perfilActualizado.foto_perfil_url);
        Alert.alert('Éxito', 'Foto de perfil actualizada correctamente');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo actualizar la foto');
      // Restaurar la foto anterior en caso de error
      if (usuario?.id_usuario) {
        cargarPerfil(usuario.id_usuario);
      }
    } finally {
      setCargandoFoto(false);
    }
  };

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.coverArea} />

          <View style={styles.profileWrap}>
            <TouchableOpacity
              style={styles.photoFrame}
              onPress={handleCambiarFoto}
              disabled={cargandoFoto}
              activeOpacity={0.7}
            >
              {cargandoFoto && (
                <View style={[styles.profilePhoto, { justifyContent: 'center', alignItems: 'center' }]}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
              {!cargandoFoto && (
                <>
                  {fotoPerfil ? (
                    <Image
                      source={{ uri: fotoPerfil }}
                      style={styles.profilePhoto}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require('../../../images/usuario.png')}
                      style={styles.profilePhoto}
                      resizeMode="cover"
                    />
                  )}
                  <View style={styles.editPhotoOverlay}>
                    <Text style={styles.editPhotoText}>📷</Text>
                  </View>
                </>
              )}
            </TouchableOpacity>

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
                <Text style={styles.infoLabel}>Teléfono:</Text>
                <Text style={styles.infoValue}>{usuario?.telefono || 'No registrado'}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('ConfiguracionR')}>
              <Text style={styles.settingsText}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />
      </SafeAreaView>
    </View>
  );
}
