import * as ImagePicker from 'expo-image-picker';

/**
 * Solicita permiso de acceso a la galería de fotos
 */
export const requestPhotoLibraryPermission = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error al solicitar permiso de galería:', error);
    return false;
  }
};

/**
 * Abre el selector de imágenes del dispositivo
 * @returns {Promise<ImagePicker.ImagePickerResult>}
 */
export const pickImage = async () => {
  try {
    const hasPermission = await requestPhotoLibraryPermission();
    if (!hasPermission) {
      throw new Error('Permiso de galería denegado');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0];
    }

    return null;
  } catch (error) {
    console.error('Error al seleccionar imagen:', error);
    throw error;
  }
};

/**
 * Convierte una imagen a base64 usando FileReader
 * @param {string} imageUri - URI de la imagen
 * @returns {Promise<string>} - Imagen en formato data URL (base64)
 */
export const imageToBase64 = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error al convertir imagen a base64:', error);
    throw error;
  }
};

/**
 * Selecciona una imagen y la convierte a base64
 * @returns {Promise<{uri: string, base64: string}>} - Información de la imagen
 */
export const selectAndConvertImage = async () => {
  try {
    const image = await pickImage();
    if (!image) {
      return null;
    }

    const base64 = await imageToBase64(image.uri);
    return {
      uri: image.uri,
      base64,
      width: image.width,
      height: image.height,
    };
  } catch (error) {
    console.error('Error en selectAndConvertImage:', error);
    throw error;
  }
};
