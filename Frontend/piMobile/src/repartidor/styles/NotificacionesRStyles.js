import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getNotificacionesRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0A101C' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0E1524' : '#EAF0FA';
  const border = isDarkMode ? '#344766' : '#D9E1F0';

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
      paddingHorizontal: s(12),
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
    },
    contentContainer: {
      paddingTop: s(10),
      paddingBottom: s(12),
      gap: s(10),
    },
    sectionCard: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: border,
      backgroundColor: isDarkMode ? '#1A253A' : '#EDF2FC',
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      gap: s(8),
    },
    sectionTitle: {
      color: isDarkMode ? '#ECF2FF' : '#2F4E8D',
      fontSize: s(19),
      fontWeight: '700',
    },
    listWrap: {
      gap: s(8),
    },
    notificationCard: {
      borderRadius: s(9),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D7DFEF',
      backgroundColor: isDarkMode ? '#182338' : '#F6F9FF',
      paddingHorizontal: s(10),
      paddingVertical: s(9),
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: s(8),
    },
    notificationDot: {
      width: s(11),
      height: s(11),
      borderRadius: s(6),
      marginTop: s(3),
    },
    dotAssigned: {
      backgroundColor: '#E0A72E',
    },
    dotConfirmed: {
      backgroundColor: '#3D64A7',
    },
    notificationBody: {
      flex: 1,
      gap: s(2),
    },
    notificationId: {
      color: isDarkMode ? '#E2ECFF' : '#3E5E97',
      fontSize: s(13),
      fontWeight: '700',
    },
    notificationText: {
      color: isDarkMode ? '#C9D6EE' : '#536A95',
      fontSize: s(13),
      lineHeight: s(18),
    },
  });
}
