import { Platform } from 'react-native';

const fromEnv = process.env.EXPO_PUBLIC_API_URL;

const getDefaultApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001';
  }

  return 'http://localhost:3001';
};

export const API_BASE_URL = fromEnv || getDefaultApiUrl();
