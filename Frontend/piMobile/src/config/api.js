import Constants from 'expo-constants';
import { Platform } from 'react-native';

const fromEnv = process.env.EXPO_PUBLIC_API_URL;
const fallbackLanHost = process.env.EXPO_PUBLIC_API_HOST;

const normalizeHost = (rawHost) => {
  if (!rawHost || typeof rawHost !== 'string') {
    return null;
  }

  const trimmed = rawHost.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      return new URL(trimmed).hostname;
    } catch (_error) {
      return null;
    }
  }

  // Ejemplos: "192.168.0.101:8081", "exp://192.168.0.101:8081", "fe80::1"
  const noScheme = trimmed.includes('://') ? trimmed.split('://')[1] : trimmed;

  if (noScheme.startsWith('[') && noScheme.includes(']')) {
    return noScheme.slice(1, noScheme.indexOf(']'));
  }

  return noScheme.split(':')[0];
};

const getHostFromExpo = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.expoConfig?.extra?.expoClient?.hostUri,
    Constants.expoGoConfig?.debuggerHost,
    Constants.expoGoConfig?.packagerOpts?.hostUri,
    Constants.expoGoConfig?.developer?.tool,
    Constants.manifest2?.extra?.expoClient?.hostUri,
    Constants.manifest?.debuggerHost,
    Constants.manifest?.hostUri,
  ];

  for (const candidate of candidates) {
    const host = normalizeHost(candidate);
    if (host) {
      return host;
    }
  }

  return null;
};

const getDefaultApiUrl = () => {
  if (fallbackLanHost) {
    return `http://${fallbackLanHost}:3000`;
  }

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
