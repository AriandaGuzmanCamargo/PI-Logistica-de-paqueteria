import { StyleSheet } from 'react-native';

export default function getHeaderLogoRStyles(s) {
  return StyleSheet.create({
    logo: {
      width: s(92),
      height: s(92),
      marginLeft: -6,
    },
  });
}
