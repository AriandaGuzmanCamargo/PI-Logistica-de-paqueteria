import React, { useState } from 'react';
import {Image,Platform,SafeAreaView,ScrollView,StatusBar,Text,TextInput,
	TouchableOpacity,View,useWindowDimensions,
} from 'react-native';
import colors from '../../theme/colors';
import BottomNavR from '../components/BottomNavR';
import getIncidenciasRStyles from '../styles/IncidenciasRStyles';
import TopHeaderR from '../components/TopHeaderR';
import { useDarkMode } from '../context/DarkModeContext';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const INCIDENT_OPTIONS = [
	'Cliente no estaba en la direccion','Cliente rechazo el paquete','Direccion incorrecta',
	'Direccion incompleta','Acceso restringido','Paquete danado','Paquete extraviado',
	'Etiqueta ilegible','Retraso en la ruta','Otro',
];

export default function IncidenciasR({ navigation }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedIncident, setSelectedIncident] = useState('');
	const [comment, setComment] = useState('');
	const [modalState, setModalState] = useState({
		visible: false,
		title: '',
		message: '',
		onAccept: null,
	});
	const { isDarkMode } = useDarkMode();

	const showMessage = (title, message, onAccept = null) => {
		setModalState({ visible: true, title, message, onAccept });
	};

	const handleConfirmIncidencia = () => {
		if (!selectedIncident.trim()) {
			showMessage('Campo obligatorio', 'Debes elegir un tipo de incidencia.');
			return;
		}

		const newIncidentReport = {
			id: `INC-${Date.now()}`,
			trackingId: 'PAK123456789',
			type: selectedIncident,
			comment: comment.trim() || 'Sin comentario.',
			photo: require('../../../images/suv_10105478.png'),
		};

		showMessage('Reporte exitoso', 'La incidencia se registro correctamente.', () => {
			navigation.navigate('EntregasR', { newIncidentReport, initialFilter: 'Incidencias' });
		});
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
						<Text style={styles.idText}>PAK123456789</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.receiverRow}>
							<View style={styles.pinMarker}>
								<View style={styles.pinCenter} />
							</View>

							<View style={styles.receiverInfo}>
								<Text style={styles.receiverName}>Ana Martinez</Text>
								<Text style={styles.addressText}>L 103 Amalianense, Sulf, 123, Col. Roma Norte, CDMX</Text>
								<Text style={styles.phoneText}>+52 55 1234 5678</Text>
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
							placeholder="Escribe que ocurrio con detalle..."
							placeholderTextColor="#8A9ABB"
						/>

						<Text style={styles.label}>Evidencia</Text>
						<View style={styles.evidenceRow}>
							<Image
								source={require('../../../images/suv_10105478.png')}
								style={styles.evidenceImage}
								resizeMode="cover"
							/>

							<TouchableOpacity style={styles.uploadBtn}>
								<Text style={styles.uploadPlus}>+</Text>
								<Text style={styles.uploadText}>Subir Foto</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmIncidencia}>
							<Text style={styles.confirmText}>Confirmar Incidencia</Text>
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
