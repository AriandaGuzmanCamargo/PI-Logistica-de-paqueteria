import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  notice: {
    marginTop: 20,
    backgroundColor: '#FFF7DE',
    borderWidth: 1,
    borderColor: '#F3DD9A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  code: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginTop: 8,
  },
  title: {
    color: '#6A5A2C',
    fontWeight: '700',
    marginTop: 4,
  },
  btn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 8,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;
