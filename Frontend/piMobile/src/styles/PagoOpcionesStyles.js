import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    marginTop: 2,
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLast: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
  arrow: {
    color: '#7E89A8',
    fontSize: 12,
    fontWeight: '700',
  },
  notice: {
    backgroundColor: '#FFF7DE',
    borderWidth: 1,
    borderColor: '#F3DD9A',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  noticeText: {
    color: '#6A5A2C',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 13,
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;
