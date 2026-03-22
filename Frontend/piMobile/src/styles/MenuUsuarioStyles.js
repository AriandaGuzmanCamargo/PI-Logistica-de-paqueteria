import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  arrow: {
    color: colors.muted,
    fontWeight: '700',
  },
  logout: {
    marginTop: 10,
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    padding: 13,
  },
  logoutText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default styles;
