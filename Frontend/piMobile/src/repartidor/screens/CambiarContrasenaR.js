import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import HeaderLogoR from '../components/HeaderLogoR';
import UserAvatarR from '../components/UserAvatarR';
import getCambiarContrasenaRStyles from '../styles/CambiarContrasenaRStyles';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function CambiarContrasenaR({ navigation }) {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [modalState, setModalState] = useState({
    visible: false,
    title: '',
    message: '',
  });
  const { isDarkMode } = useDarkMode();

  const showMessage = (title, message) => {
    setModalState({ visible: true, title, message });
  };

  const handleSaveChanges = () => {
    const hasInvalidFields =
      !actual.trim() ||
      !nueva.trim() ||
      !confirmacion.trim() ||
      nueva !== confirmacion;

    if (hasInvalidFields) {
      showMessage('Campos incompletos', 'Los campos no se llenaron correctamente.');
      return;
    }

    showMessage('Exito', 'Contrasena cambiada exitosamente.');
  };

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
  const scale = clamp(phoneWidth / 390, 0.88, 1.05);
  const s = (size) => Math.round(size * scale);
  const styles = getCambiarContrasenaRStyles(s, isDarkMode);

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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>{'<'}</Text>
            </TouchableOpacity>
            <HeaderLogoR s={s} />
            <Text style={styles.topHeaderTitle}>Cambiar Contraseña</Text>
          </View>
          <UserAvatarR s={s} />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Contraseña actual</Text>
            <TextInput
              value={actual}
              onChangeText={setActual}
              style={styles.input}
              secureTextEntry
              placeholder="Ingresa tu contraseña actual"
              placeholderTextColor="#8A9ABB"
            />

            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
              value={nueva}
              onChangeText={setNueva}
              style={styles.input}
              secureTextEntry
              placeholder="Ingresa tu nueva contraseña"
              placeholderTextColor="#8A9ABB"
            />

            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
              value={confirmacion}
              onChangeText={setConfirmacion}
              style={styles.input}
              secureTextEntry
              placeholder="Confirma tu nueva contraseña"
              placeholderTextColor="#8A9ABB"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
              <Text style={styles.saveText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>

        <BottomNavR navigation={navigation} s={s} activeTab="Perfil" showRutaBadge />

        {modalState.visible ? (
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{modalState.title}</Text>
              <Text style={styles.modalMessage}>{modalState.message}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalState({ visible: false, title: '', message: '' })}
              >
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
}
