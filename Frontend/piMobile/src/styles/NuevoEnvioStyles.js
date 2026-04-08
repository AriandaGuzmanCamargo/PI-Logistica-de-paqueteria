import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  tab: {
    color: '#7F8A9D',
    fontSize: 11,
  },
  tabActive: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
  },
  vehicleRow: {
    backgroundColor: '#EEF3FC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vehicleImage: {
    width: 34,
    height: 34,
  },
  vehicleText: {
    flex: 1,
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
    gap: 8,
  },
  sectionTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    color: colors.text,
    fontSize: 14,
  },
  stateWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  stateText: {
    color: colors.muted,
    fontSize: 13,
  },
  errorText: {
    color: '#B42318',
    fontWeight: '600',
  },
  arrow: {
    color: '#7E89A8',
    fontSize: 12,
    fontWeight: '700',
  },
  btnPrimary: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 2,
  },
  btnPrimaryText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  btn: {
    backgroundColor: colors.primary,
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