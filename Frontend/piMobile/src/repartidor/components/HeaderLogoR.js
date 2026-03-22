import React from 'react';
import { Image } from 'react-native';
import getHeaderLogoRStyles from '../styles/HeaderLogoRStyles';

export default function HeaderLogoR({ s }) {
  const styles = getHeaderLogoRStyles(s);

  return (
    <Image
      source={require('../../../images/logoSinFondo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}
