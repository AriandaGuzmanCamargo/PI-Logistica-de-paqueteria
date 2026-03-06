import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLast: {
    paddingHorizontal: 14,
    paddingVertical: 12,
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
    color: '#9AA4BF',
    fontSize: 16,
  },
  value: {
    color: colors.muted,
    fontSize: 13,
  },
  switchOn: {
    width: 40,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#61C5AD',
  },
  switchOff: {
    width: 40,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#CFD7EB',
  },
});

export default styles;
