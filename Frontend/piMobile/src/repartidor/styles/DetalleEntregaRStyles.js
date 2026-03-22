import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getDetalleEntregaRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0B1220' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0F1626' : '#EAF0FA';
  const border = isDarkMode ? '#2E3C5D' : '#D8DFEF';

  return StyleSheet.create({
    nativeRoot: { flex: 1 },
    webRoot: {
      flex: 1,
      backgroundColor: bgWeb,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(12),
    },
    webPhoneFrame: {
      borderRadius: s(22),
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#C3CEE6',
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.primaryDark,
    },
    topHeader: {
      height: s(56),
      backgroundColor: colors.primaryDark,
      paddingHorizontal: s(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(10),
    },
    backText: {
      color: '#D9E4FF',
      fontWeight: '700',
      fontSize: s(18),
    },
    topHeaderTitle: {
      color: '#DDE7FA',
      fontSize: s(16),
      fontWeight: '700',
    },
    content: {
      flex: 1,
      backgroundColor: bgApp,
      paddingHorizontal: s(8),
      paddingTop: s(8),
      paddingBottom: s(10),
      gap: s(8),
    },
    idRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
      paddingHorizontal: s(6),
    },
    idDot: {
      width: s(14),
      height: s(14),
      borderRadius: s(7),
      backgroundColor: '#5B7CB9',
      borderWidth: 2,
      borderColor: '#E8EEF9',
    },
    idText: {
      color: isDarkMode ? '#E4ECFF' : '#2D4A82',
      fontWeight: '700',
      fontSize: s(22),
    },
    card: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: border,
      backgroundColor: isDarkMode ? '#1D2740' : '#F3F7FE',
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      gap: s(8),
    },
    receiverRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: s(8),
    },
    pinMarker: {
      width: s(20),
      height: s(20),
      borderRadius: s(10),
      backgroundColor: '#F0BD45',
      borderWidth: 2,
      borderColor: '#E7A728',
      marginTop: s(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    pinCenter: {
      width: s(7),
      height: s(7),
      borderRadius: s(4),
      backgroundColor: '#FFF3D8',
    },
    receiverInfo: {
      flex: 1,
      gap: s(3),
    },
    receiverName: {
      color: isDarkMode ? '#E4ECFF' : '#2D4A82',
      fontWeight: '700',
      fontSize: s(20),
      lineHeight: s(24),
    },
    addressText: {
      color: isDarkMode ? '#B8C5E2' : '#586D97',
      fontSize: s(12),
      lineHeight: s(17),
    },
    phoneText: {
      color: isDarkMode ? '#D7E2FF' : '#3B4E76',
      fontWeight: '700',
      fontSize: s(19),
    },
    infoLine: {
      color: isDarkMode ? '#B4C3E3' : '#60739B',
      fontSize: s(12),
      lineHeight: s(16),
    },
    infoStrong: {
      color: '#44547B',
      fontWeight: '700',
    },
    mapArea: {
      height: s(150),
      borderRadius: s(8),
      borderWidth: 1,
      borderColor: isDarkMode ? '#324360' : '#D4DCEC',
      backgroundColor: isDarkMode ? '#24314A' : '#DDE5F0',
      marginTop: s(2),
      marginBottom: s(6),
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: s(4),
    },
    metricText: {
      color: isDarkMode ? '#B4C3E3' : '#697A9F',
      fontSize: s(12),
    },
    actionRow: {
      flexDirection: 'row',
      gap: s(7),
      marginTop: s(2),
    },
    actionButton: {
      flex: 1,
      borderRadius: s(7),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(8),
      paddingHorizontal: s(6),
    },
    successBtn: {
      backgroundColor: '#E2B240',
    },
    failBtn: {
      backgroundColor: '#5B6FBA',
    },
    reportBtn: {
      marginTop: s(8),
      alignSelf: 'center',
      width: '72%',
      borderRadius: s(7),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(8),
      backgroundColor: '#CF5E5D',
    },
    actionText: {
      color: colors.white,
      fontWeight: '700',
      fontSize: s(12),
    },
  });
}
