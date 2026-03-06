import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  selectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#EEF3FC',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  selected: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  check: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLast: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.text,
    fontWeight: '600',
  },
  arrow: {
    color: '#9AA4BF',
    fontSize: 16,
  },
});

export default styles;
