import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getUserAvatarRStyles(s) {
  return StyleSheet.create({
    avatarCircle: {
      width: s(30),
      height: s(30),
      borderRadius: s(15),
      backgroundColor: '#D6E3FB',
      borderWidth: 2,
      borderColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: s(14),
    },
  });
}
