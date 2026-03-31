import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import TopHeaderR from '../components/TopHeaderR';
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
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

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

    showMessage('Éxito', 'Contraseña cambiada exitosamente.');
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

        <TopHeaderR s={s} navigation={navigation} title="Cambiar Contraseña" />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.label}>Contraseña actual</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={actual}
                onChangeText={setActual}
                style={styles.passwordInput}
                secureTextEntry={!showActual}
                placeholder="Ingresa tu contraseña actual"
                placeholderTextColor="#8A9ABB"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowActual(!showActual)}>
                <Feather name={showActual ? 'eye' : 'eye-off'} size={s(20)} color="#8A9ABB" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nueva contraseña</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={nueva}
                onChangeText={setNueva}
                style={styles.passwordInput}
                secureTextEntry={!showNueva}
                placeholder="Ingresa tu nueva contraseña"
                placeholderTextColor="#8A9ABB"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNueva(!showNueva)}>
                <Feather name={showNueva ? 'eye' : 'eye-off'} size={s(20)} color="#8A9ABB" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={confirmacion}
                onChangeText={setConfirmacion}
                style={styles.passwordInput}
                secureTextEntry={!showConfirmacion}
                placeholder="Confirma tu nueva contraseña"
                placeholderTextColor="#8A9ABB"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmacion(!showConfirmacion)}>
                <Feather name={showConfirmacion ? 'eye' : 'eye-off'} size={s(20)} color="#8A9ABB" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
              <Text style={styles.saveText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

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
