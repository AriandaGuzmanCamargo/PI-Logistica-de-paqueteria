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
  actionsRow: {
    marginTop: 6,
    marginBottom: 4,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#2F66B0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionBtnDisabled: {
    opacity: 0.65,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  cardRead: {
    opacity: 0.85,
    borderColor: '#CBD7EA',
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
  linkBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#E8F0FF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  linkBtnText: {
    color: '#1E4C92',
    fontWeight: '700',
    fontSize: 12,
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