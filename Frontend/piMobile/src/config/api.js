import Constants from 'expo-constants';
import { Platform } from 'react-native';

const fromEnv = process.env.EXPO_PUBLIC_API_URL;

const getHostFromExpo = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    null;

  if (!hostUri) {
    return null;
  }

  return hostUri.split(':')[0];
};

const getDefaultApiUrl = () => {
  const host = getHostFromExpo();

  if (host) {
    return `http://${host}:3000`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  return 'http://localhost:3000';
};

export const API_BASE_URL = fromEnv || getDefaultApiUrl();
