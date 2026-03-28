import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getDetalleIncidenciaRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0B1220' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0F1626' : '#EAF0FA';

  return StyleSheet.create({
    nativeRoot: {
      flex: 1,
      backgroundColor: bgWeb,
      padding: s(6),
    },
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
      borderRadius: s(20),
      overflow: 'hidden',
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
      paddingHorizontal: s(10),
    },
    contentContainer: {
      paddingTop: s(10),
      paddingBottom: s(12),
    },
    card: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: isDarkMode ? '#2E3C5D' : '#D8DFEF',
      backgroundColor: isDarkMode ? '#1D2740' : '#F3F7FE',
      paddingHorizontal: s(12),
      paddingVertical: s(12),
      gap: s(8),
    },
    label: {
      color: isDarkMode ? '#DCE8FF' : '#304D82',
      fontSize: s(14),
      fontWeight: '700',
      marginTop: s(2),
    },
    value: {
      color: isDarkMode ? '#BFD0F1' : '#5A6E98',
      fontSize: s(14),
      lineHeight: s(20),
    },
    photo: {
      width: '100%',
      height: s(200),
      borderRadius: s(8),
      borderWidth: 1,
      borderColor: '#D2DBEC',
      marginTop: s(2),
    },
  });
}
