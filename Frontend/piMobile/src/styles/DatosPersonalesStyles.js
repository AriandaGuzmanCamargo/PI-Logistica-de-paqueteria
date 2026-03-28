import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    gap: 8,
  },
  label: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 13,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    color: colors.text,
    minHeight: 44,
  },
  row: {
    color: colors.text,
    fontSize: 14,
    marginTop: 8,
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 13,
    marginTop: 8,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  stateWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  stateText: {
    marginTop: 8,
    color: colors.text,
    fontSize: 14,
    textAlign: 'center',
  },
  stateError: {
    color: '#D32F2F',
    fontWeight: '600',
  },
});

export default styles;