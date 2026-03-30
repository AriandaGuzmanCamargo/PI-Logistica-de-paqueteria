import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  tabBtn: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EEF2FB',
    borderWidth: 1,
    borderColor: '#DDE3F0',
  },
  tabBtnActive: {
    backgroundColor: '#DDE8FA',
    borderColor: '#AFC3EB',
  },
  tab: {
    color: '#8891AE',
    fontSize: 12,
    fontWeight: '600',
  },
  tabActive: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  id: {
    color: colors.primaryDark,
    fontWeight: '800',
    fontSize: 18,
  },
  date: {
    color: '#8A93AE',
    marginTop: 3,
    fontSize: 12,
  },
  status: {
    color: colors.okText,
    marginTop: 6,
    fontWeight: '700',
  },
  link: {
    marginTop: 8,
    color: colors.muted,
    textAlign: 'center',
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