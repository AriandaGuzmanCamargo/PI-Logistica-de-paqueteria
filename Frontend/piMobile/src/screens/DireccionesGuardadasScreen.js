import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { getCurrentUser } from '../services/sessionService';
import {
  createDireccionRequest,
  deleteDireccionRequest,
  getDireccionesByUsuario,
  updateDireccionRequest,
} from '../services/direccionesService';
import styles from '../styles/DireccionesGuardadasStyles';

const EMPTY_FORM = {
  alias: '',
  direccion: '',
  ciudad: '',
  estado: '',
  codigo_postal: '',
  referencias: '',
  es_predeterminada: false,
};

function normalizeDireccionForm(form) {
  return {
    alias: String(form.alias || '').trim(),
    direccion: String(form.direccion || '').trim(),
    ciudad: String(form.ciudad || '').trim(),
    estado: String(form.estado || '').trim(),
    codigo_postal: String(form.codigo_postal || '').trim(),
    referencias: String(form.referencias || '').trim(),
    es_predeterminada: Boolean(form.es_predeterminada),
  };
}

export default function DireccionesGuardadasScreen({ navigation }) {
  const [direcciones, setDirecciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDireccion, setEditingDireccion] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const modalTitle = useMemo(
    () => (editingDireccion ? 'Editar Direccion' : 'Nueva Direccion'),
    [editingDireccion]
  );

  const loadDirecciones = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
      }

      const data = await getDireccionesByUsuario(user.id_usuario);
      setDirecciones(data);
    } catch (error) {
      setErrorMessage(error.message || 'No se pudieron cargar las direcciones.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDirecciones();
    }, [loadDirecciones])
  );

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingDireccion(null);
    setForm(EMPTY_FORM);
  };

  const openCreateModal = () => {
    setEditingDireccion(null);
    setForm(EMPTY_FORM);
    setIsModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditingDireccion(item);
    setForm({
      alias: item.alias || '',
      direccion: item.direccion || '',
      ciudad: item.ciudad || '',
      estado: item.estado || '',
      codigo_postal: item.codigo_postal || '',
      referencias: item.referencias || '',
      es_predeterminada: Boolean(item.es_predeterminada),
    });
    setIsModalVisible(true);
  };

  const validateForm = (currentForm) => {
    if (!currentForm.alias || !currentForm.direccion || !currentForm.ciudad) {
      throw new Error('Alias, direccion y ciudad son obligatorios.');
    }

    if (currentForm.codigo_postal && !/^\d{4,10}$/.test(currentForm.codigo_postal)) {
      throw new Error('Codigo postal invalido. Usa solo digitos.');
    }
  };

  const handleSaveDireccion = async () => {
    try {
      setIsSubmitting(true);

      const user = getCurrentUser();

      if (!user?.id_usuario) {
        throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
      }

      const payload = normalizeDireccionForm(form);
      validateForm(payload);

      if (editingDireccion?.id_direccion) {
        await updateDireccionRequest(editingDireccion.id_direccion, {
          idUsuario: user.id_usuario,
          ...payload,
        });
      } else {
        await createDireccionRequest({
          idUsuario: user.id_usuario,
          ...payload,
        });
      }

      closeModal();
      await loadDirecciones();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo guardar la direccion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDireccion = (item) => {
    Alert.alert(
      'Eliminar direccion',
      `Se eliminara la direccion "${item.alias || 'Sin alias'}".`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsSubmitting(true);

              const user = getCurrentUser();

              if (!user?.id_usuario) {
                throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
              }

              await deleteDireccionRequest(item.id_direccion, {
                idUsuario: user.id_usuario,
              });

              await loadDirecciones();
            } catch (error) {
              Alert.alert('Error', error.message || 'No se pudo eliminar la direccion.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  const renderDireccion = (item) => (
    <View style={styles.row} key={item.id_direccion}>
      <View style={styles.infoWrap}>
        <Text style={styles.item}>{item.alias}</Text>
        <Text style={styles.addressLine}>{item.direccion}</Text>
        <Text style={styles.secondaryLine}>
          {[item.ciudad, item.estado, item.codigo_postal].filter(Boolean).join(', ')}
        </Text>
        {item.es_predeterminada ? <Text style={styles.badge}>Predeterminada</Text> : null}
      </View>

      <View style={styles.actionsWrap}>
        <TouchableOpacity style={styles.actionButton} onPress={() => openEditModal(item)} disabled={isSubmitting}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteDireccion(item)}
          disabled={isSubmitting}
        >
          <Text style={[styles.actionText, styles.deleteText]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MainLayout title="Direcciones Guardadas" navigation={navigation} backTo="Dashboard" activeTab="MenuUsuario">
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Administra tus direcciones frecuentes.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={openCreateModal} disabled={isSubmitting}>
          <Text style={styles.primaryButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.stateWrap}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.stateText}>Cargando direcciones...</Text>
        </View>
      ) : null}

      {!isLoading && errorMessage ? (
        <View style={styles.stateWrap}>
          <Text style={[styles.stateText, styles.stateError]}>{errorMessage}</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && direcciones.length === 0 ? (
        <View style={styles.stateWrap}>
          <Text style={styles.stateText}>Aun no tienes direcciones guardadas.</Text>
        </View>
      ) : null}

      {!isLoading && !errorMessage && direcciones.length > 0 ? (
        <View style={styles.card}>{direcciones.map(renderDireccion)}</View>
      ) : null}

      <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>

            <ScrollView contentContainerStyle={styles.formWrap} keyboardShouldPersistTaps="handled">
              <TextInput
                style={styles.input}
                value={form.alias}
                onChangeText={(value) => setForm((prev) => ({ ...prev, alias: value }))}
                placeholder="Alias (Casa, Oficina, etc.)"
                placeholderTextColor="#8C93AD"
              />

              <TextInput
                style={styles.input}
                value={form.direccion}
                onChangeText={(value) => setForm((prev) => ({ ...prev, direccion: value }))}
                placeholder="Direccion completa"
                placeholderTextColor="#8C93AD"
              />

              <TextInput
                style={styles.input}
                value={form.ciudad}
                onChangeText={(value) => setForm((prev) => ({ ...prev, ciudad: value }))}
                placeholder="Ciudad"
                placeholderTextColor="#8C93AD"
              />

              <TextInput
                style={styles.input}
                value={form.estado}
                onChangeText={(value) => setForm((prev) => ({ ...prev, estado: value }))}
                placeholder="Estado / Provincia"
                placeholderTextColor="#8C93AD"
              />

              <TextInput
                style={styles.input}
                value={form.codigo_postal}
                onChangeText={(value) => setForm((prev) => ({ ...prev, codigo_postal: value }))}
                placeholder="Codigo postal"
                keyboardType="numeric"
                placeholderTextColor="#8C93AD"
              />

              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={form.referencias}
                onChangeText={(value) => setForm((prev) => ({ ...prev, referencias: value }))}
                placeholder="Referencias"
                placeholderTextColor="#8C93AD"
                multiline
              />

              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Marcar como predeterminada</Text>
                <Switch
                  value={form.es_predeterminada}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, es_predeterminada: value }))}
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.secondaryButton} onPress={closeModal} disabled={isSubmitting}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSaveDireccion} disabled={isSubmitting}>
                <Text style={styles.primaryButtonText}>{isSubmitting ? 'Guardando...' : 'Guardar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
}
