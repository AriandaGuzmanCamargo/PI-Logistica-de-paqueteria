import React, { useMemo, useState } from 'react';
import {Image,Platform,SafeAreaView,ScrollView,StatusBar,Text,TextInput,
	TouchableOpacity,View,useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import getIncidenciasRStyles from '../styles/IncidenciasRStyles';
import TopHeaderR from '../components/TopHeaderR';
import { useDarkMode } from '../context/DarkModeContext';
import { getCurrentUser } from '../../services/sessionService';
import { createIncidenciaByUsuario } from '../../services/incidenciasService';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const INCIDENT_OPTIONS = [
	'Cliente no estaba en la dirección','Cliente rechazó el paquete','Dirección incorrecta',
	'Dirección incompleta','Acceso restringido','Paquete dañado','Paquete extraviado',
	'Etiqueta ilegible','Retraso en la ruta','Otro',
];

const FALLBACK_DELIVERY = {
	id: 'PAK123456789',
	name: 'Ana Martinez',
	address: 'Londres 247, Col. Juarez, Ciudad de Mexico',
	phone: '+52 55 1234 5678',
	id_envio: null,
};

export default function IncidenciasR({ navigation, route }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedIncident, setSelectedIncident] = useState('');
	const [comment, setComment] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedEvidence, setSelectedEvidence] = useState(null);
	const [modalState, setModalState] = useState({
		visible: false,
		title: '',
		message: '',
		onAccept: null,
	});
	const { isDarkMode } = useDarkMode();
	const delivery = useMemo(() => route?.params?.delivery || FALLBACK_DELIVERY, [route?.params?.delivery]);

	const showMessage = (title, message, onAccept = null) => {
		setModalState({ visible: true, title, message, onAccept });
	};

	const handlePickEvidence = async () => {
		if (Platform.OS === 'web') {
			showMessage('No disponible', 'La seleccion de imagen desde galeria esta habilitada en Android/iOS.');
			return;
		}

		try {
			const pickerModule = await import('expo-image-picker');
			const ImagePicker = pickerModule?.default || pickerModule;

			if (!ImagePicker?.requestMediaLibraryPermissionsAsync) {
				showMessage('No disponible', 'No se pudo inicializar el selector de imagen.');
				return;
			}

			const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permission.status !== 'granted') {
				showMessage('Permiso requerido', 'Debes permitir acceso a galeria para adjuntar evidencia.');
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				allowsEditing: true,
				quality: 0.7,
			});

			if (result.canceled) {
				return;
			}

			const firstAsset = Array.isArray(result.assets) ? result.assets[0] : null;
			if (!firstAsset?.uri) {
				showMessage('Sin imagen', 'No se pudo obtener la imagen seleccionada.');
				return;
			}

			setSelectedEvidence({
				uri: firstAsset.uri,
				fileName: firstAsset.fileName || null,
			});
		} catch {
			showMessage('Modulo faltante', 'Instala expo-image-picker para habilitar evidencia con imagen.');
		}
	};

	const handleConfirmIncidencia = async () => {
		if (!selectedIncident.trim()) {
			showMessage('Campo obligatorio', 'Debes elegir un tipo de incidencia.');
			return;
		}

		if (comment.trim().length < 5) {
			showMessage('Campo obligatorio', 'Agrega una descripcion de al menos 5 caracteres.');
			return;
		}

		const currentUser = getCurrentUser();
		const idUsuario = Number(currentUser?.id_usuario);
		const idEnvio = Number(delivery?.id_envio);

		if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
			showMessage('Sesion invalida', 'No hay sesion activa del conductor.');
			return;
		}

		if (!Number.isInteger(idEnvio) || idEnvio <= 0) {
			showMessage('Envio invalido', 'Abre la incidencia desde el detalle de una entrega real.');
			return;
		}

		try {
			setIsSubmitting(true);
			const created = await createIncidenciaByUsuario({
				idUsuario,
				idEnvio,
				tipoIncidencia: selectedIncident,
				descripcion: comment.trim(),
			});

		const newIncidentReport = {
			id: `INC-${created.id_incidencia}`,
			trackingId: delivery?.id || `ENV-${idEnvio}`,
			type: selectedIncident,
			comment: comment.trim() || 'Sin comentario.',
			photo: selectedEvidence?.uri ? { uri: selectedEvidence.uri } : require('../../../images/suv_10105478.png'),
		};

		showMessage('Reporte exitoso', 'La incidencia se registró correctamente.', () => {
			navigation.navigate('EntregasR', { newIncidentReport, initialFilter: 'Incidencias' });
		});
		} catch (error) {
			showMessage('No se pudo registrar', error.message || 'Intenta nuevamente.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const { width } = useWindowDimensions();
	const isWeb = Platform.OS === 'web';
	const phoneWidth = isWeb ? clamp(width - 24, 320, 390) : width;
	const scale = clamp(phoneWidth / 390, 0.88, 1.05);
	const s = (size) => Math.round(size * scale);
	const styles = getIncidenciasRStyles(s, isDarkMode);

	return (
		<View style={isWeb ? styles.webRoot : styles.nativeRoot}>
			<SafeAreaView
				style={[
					styles.safeArea,
					isWeb && styles.webPhoneFrame,
					isWeb && {
						width: phoneWidth,
						height: '100%',
						maxHeight: 860,
					},
				]}
			>
				<StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

				<TopHeaderR s={s} navigation={navigation} title="Reportar Incidencia" />

				<View style={styles.content}>
					<View style={styles.idRow}>
						<View style={styles.idDot} />
						<Text style={styles.idText}>{delivery.id || 'ENV-SIN-CODIGO'}</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.receiverRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinCenter} />
							</View>

							<View style={styles.receiverInfo}>
							<Text style={styles.receiverName}>{delivery.name || FALLBACK_DELIVERY.name}</Text>
								<Text style={styles.addressText}>{delivery.address || FALLBACK_DELIVERY.address}</Text>
								<Text style={styles.phoneText}>{delivery.phone || FALLBACK_DELIVERY.phone}</Text>
							</View>
						</View>

						<Text style={styles.label}>Tipo de Incidencia *</Text>
						<TouchableOpacity
							style={[styles.selectBox, isDropdownOpen && styles.selectBoxOpen]}
							onPress={() => setIsDropdownOpen((prev) => !prev)}
						>
							<Text style={styles.selectText}>{selectedIncident || 'Selecciona un tipo de incidencia'}</Text>
							<Text style={styles.selectArrow}>{isDropdownOpen ? '^' : 'v'}</Text>
						</TouchableOpacity>

						{isDropdownOpen ? (
							<View style={styles.optionsWrap}>
								<ScrollView nestedScrollEnabled>
									{INCIDENT_OPTIONS.map((option) => (
										<TouchableOpacity
											key={option}
											style={[
												styles.optionRow,
												selectedIncident === option && styles.optionRowActive,
											]}
											onPress={() => {
												setSelectedIncident(option);
												setIsDropdownOpen(false);
											}}
										>
											<Text
												style={[
													styles.optionText,
													selectedIncident === option && styles.optionTextActive,
												]}
											>
												{option}
											</Text>
										</TouchableOpacity>
									))}
								</ScrollView>
							</View>
						) : null}

						<Text style={styles.label}>Comentario</Text>
						<TextInput
							style={styles.inputBox}
							value={comment}
							onChangeText={setComment}
							multiline
							placeholder="Escribe qué ocurrió con detalle..."
							placeholderTextColor="#8A9ABB"
						/>

						<Text style={styles.label}>Evidencia</Text>
						<View style={styles.evidenceRow}>
							<Image
								source={selectedEvidence?.uri ? { uri: selectedEvidence.uri } : require('../../../images/suv_10105478.png')}
								style={styles.evidenceImage}
								resizeMode="cover"
							/>

							<TouchableOpacity style={styles.uploadBtn} onPress={handlePickEvidence}>
								<Text style={styles.uploadPlus}>+</Text>
								<Text style={styles.uploadText}>{selectedEvidence ? 'Cambiar foto' : 'Subir foto'}</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmIncidencia} disabled={isSubmitting}>
							<Text style={styles.confirmText}>{isSubmitting ? 'Guardando...' : 'Confirmar Incidencia'}</Text>
						</TouchableOpacity>
					</View>
				</View>

				<BottomNavR navigation={navigation} s={s} activeTab="Entregas" showRutaBadge />

				{modalState.visible ? (
					<View style={styles.modalOverlay}>
						<View style={styles.modalCard}>
							<Text style={styles.modalTitle}>{modalState.title}</Text>
							<Text style={styles.modalMessage}>{modalState.message}</Text>
							<TouchableOpacity
								style={styles.modalButton}
								onPress={() => {
									const acceptHandler = modalState.onAccept;
									setModalState({ visible: false, title: '', message: '', onAccept: null });
									if (acceptHandler) {
										acceptHandler();
									}
								}}
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
