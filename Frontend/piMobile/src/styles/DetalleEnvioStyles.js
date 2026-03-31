import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginTop: 2,
  },
  title: {
    color: colors.muted,
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    color: colors.text,
    fontSize: 14,
  },
  deliveryImage: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: colors.surface2,
  },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 13,
  },
  status: {
    color: colors.okText,
    backgroundColor: colors.ok,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '700',
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
  actionsWrap: {
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
  saveBtn: {
    backgroundColor: '#1565C0',
  },
  cancelBtn: {
    backgroundColor: '#B71C1C',
  },
  actionBtnText: {
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