import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  searchWrap: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E1E4F199',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface2,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 13,
  },
  searchBtn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
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
  id: {
    fontWeight: '800',
    color: colors.primaryDark,
    fontSize: 18,
  },
  date: {
    color: '#8A93AE',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CADCC',
    marginRight: 8,
  },
  timelineText: {
    color: colors.text,
    fontSize: 14,
  },
  timelineRowCurrent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  dotCurrent: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  timelineCurrentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  timelineLocation: {
    color: '#9AA4BF',
    fontSize: 12,
    marginTop: 2,
  },
  timelineDate: {
    color: '#9AA4BF',
    fontSize: 11,
    marginTop: 2,
  },
  timelineObservacion: {
    color: '#8891AE',
    fontSize: 11,
    marginTop: 2,
    fontStyle: 'italic',
  },
  errorWrap: {
    backgroundColor: '#FFE5E5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    fontWeight: '500',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    color: colors.text,
    fontSize: 14,
  },
  link: {
    marginTop: 2,
    color: colors.muted,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;
