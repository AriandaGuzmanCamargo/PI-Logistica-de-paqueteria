import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getEntregasRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0A101C' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0E1524' : '#EAF0FA';
  const cardBg = isDarkMode ? '#1A253A' : '#EDF2FC';
  const itemBg = isDarkMode ? '#182338' : '#F6F9FF';
  const border = isDarkMode ? '#344766' : '#D7DFEF';
  const textPrimary = isDarkMode ? '#E4ECFF' : '#2C4A8A';
  const textSecondary = isDarkMode ? '#B8C5E2' : '#556A95';

  return StyleSheet.create({
    nativeRoot: { flex: 1 },
    webRoot: {
      flex: 1,
      backgroundColor: bgWeb,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(12),
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.primaryDark,
    },
    topHeader: {
      height: s(56),
      backgroundColor: colors.primaryDark,
      paddingHorizontal: s(14),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
    },
    topHeaderTitle: {
      color: colors.white,
      fontSize: s(16),
      fontWeight: '700',
    },
    content: {
      flex: 1,
      backgroundColor: bgApp,
      paddingHorizontal: s(10),
      paddingTop: s(10),
    },
    secondTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
      marginBottom: s(10),
    },
    secondTitle: {
      color: textPrimary,
      fontSize: s(30),
      fontWeight: '700',
      lineHeight: s(32),
    },
    searchWrap: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D5DEEF',
      borderRadius: s(8),
      backgroundColor: isDarkMode ? '#151F33' : '#F3F7FE',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: s(10),
      marginBottom: s(10),
    },
    searchInput: {
      flex: 1,
      color: textSecondary,
      fontSize: s(13),
      paddingHorizontal: s(8),
      paddingVertical: s(9),
    },
    filtersRow: {
      borderRadius: s(8),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D6DEEE',
      backgroundColor: isDarkMode ? '#151F33' : '#ECF2FD',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: s(8),
      paddingVertical: s(8),
      marginBottom: s(12),
      gap: s(10),
    },
    filterText: {
      color: isDarkMode ? '#DFE9FF' : '#3F5E98',
      fontWeight: '700',
      fontSize: s(12),
    },
    filterTextMuted: {
      color: isDarkMode ? '#BFD0EE' : '#4E679D',
      fontWeight: '600',
      fontSize: s(12),
    },
    sectionCard: {
      flex: 1,
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D9E1F0',
      backgroundColor: cardBg,
      paddingHorizontal: s(8),
      paddingTop: s(10),
    },
    sectionTitle: {
      color: isDarkMode ? '#ECF2FF' : '#2F4E8D',
      fontSize: s(22),
      fontWeight: '700',
      marginBottom: s(8),
    },
    listContent: {
      paddingBottom: s(14),
      gap: s(8),
    },
    deliveryCard: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: border,
      backgroundColor: itemBg,
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      gap: s(6),
    },
    deliveryTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: s(8),
    },
    codeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(6),
      flex: 1,
    },
    pinWrap: {
      width: s(18),
      height: s(18),
      borderRadius: s(9),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EED8A8',
    },
    pinBlue: {
      backgroundColor: '#C8D5F0',
    },
    pinDot: {
      width: s(7),
      height: s(7),
      borderRadius: s(4),
      backgroundColor: '#E0A72E',
    },
    pinDotBlue: {
      backgroundColor: '#3E5F9A',
    },
    deliveryCode: {
      color: isDarkMode ? '#D3DFF5' : '#667AA6',
      fontSize: s(14),
      fontWeight: '500',
    },
    actionBtn: {
      minWidth: s(94),
      borderRadius: s(8),
      backgroundColor: '#6EA9E6',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(8),
      paddingHorizontal: s(8),
    },
    actionBtnDone: {
      backgroundColor: '#75B9C8',
    },
    actionText: {
      color: colors.white,
      fontWeight: '700',
      fontSize: s(14),
    },
    deliveryName: {
      color: isDarkMode ? '#E4ECFF' : '#2B4579',
      fontSize: s(21),
      fontWeight: '700',
      lineHeight: s(24),
    },
    deliveryAddress: {
      color: isDarkMode ? '#C3D0E8' : '#536A95',
      fontSize: s(13),
      lineHeight: s(18),
    },
    incidentTypeSummary: {
      color: isDarkMode ? '#D4E1FF' : '#385890',
      fontSize: s(13),
      fontWeight: '700',
      lineHeight: s(18),
      marginTop: s(2),
    },
    detailsBtn: {
      alignSelf: 'flex-start',
      marginTop: s(4),
      borderRadius: s(8),
      backgroundColor: '#3D64A7',
      paddingVertical: s(7),
      paddingHorizontal: s(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsBtnText: {
      color: colors.white,
      fontSize: s(13),
      fontWeight: '700',
    },
    emptyText: {
      color: isDarkMode ? '#B7C6E6' : '#5C7099',
      textAlign: 'center',
      fontSize: s(13),
      fontWeight: '600',
      paddingVertical: s(14),
    },
  });
}
