import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  step: {
    color: colors.primaryDark,
    fontWeight: '700',
    marginBottom: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  title: {
    color: colors.primaryDark,
    fontWeight: '800',
    marginBottom: 2,
  },
  row: {
    color: colors.text,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#EDF2FD',
    borderRadius: 10,
    padding: 13,
  },
  btnSecondaryText: {
    color: colors.primaryDark,
    textAlign: 'center',
    fontWeight: '700',
  },
  btn: {
    flex: 1,
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;