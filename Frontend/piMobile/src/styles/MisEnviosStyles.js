import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  tab: {
    color: '#8891AE',
    fontSize: 11,
  },
  tabActive: {
    color: colors.primaryDark,
    fontSize: 11,
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
});

export default styles;