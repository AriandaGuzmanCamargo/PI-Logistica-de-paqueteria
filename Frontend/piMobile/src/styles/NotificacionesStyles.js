import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  roleWrap: {
    marginTop: 8,
    marginBottom: 4,
  },
  roleText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 15,
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
  message: {
    color: colors.text,
    marginTop: 8,
    lineHeight: 20,
  },
  deliveryMeta: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  deliveryPhoto: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#E7ECF4',
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