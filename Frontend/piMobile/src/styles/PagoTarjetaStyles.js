import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStrong: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '700',
  },
  chip: {
    backgroundColor: '#F2C44E',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    overflow: 'hidden',
  },
  row: {
    color: colors.text,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 12,
    color: colors.text,
  },
  btn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 2,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;