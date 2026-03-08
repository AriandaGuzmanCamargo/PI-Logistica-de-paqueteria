import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getCambiarContrasenaRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0A101C' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0E1524' : '#EAF0FA';
  const panelBg = isDarkMode ? '#1A253A' : '#EDF2FC';
  const panelBorder = isDarkMode ? '#344766' : '#D9E1F0';

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
      backgroundColor: bgApp,
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
    backText: {
      color: '#D9E4FF',
      fontWeight: '700',
      fontSize: s(18),
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
      paddingBottom: s(12),
    },
    card: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: panelBorder,
      backgroundColor: panelBg,
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      gap: s(8),
    },
    label: {
      color: isDarkMode ? '#DCE8FF' : '#304D82',
      fontSize: s(14),
      fontWeight: '700',
      marginTop: s(2),
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D7DFEF',
      borderRadius: s(8),
      backgroundColor: isDarkMode ? '#151F33' : '#F8FBFF',
      minHeight: s(42),
      paddingHorizontal: s(10),
      color: isDarkMode ? '#D6E3FA' : '#5A6E98',
      fontSize: s(14),
    },
    saveBtn: {
      marginTop: s(8),
      borderRadius: s(8),
      backgroundColor: '#3D64A7',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(10),
    },
    saveText: {
      color: colors.white,
      fontSize: s(15),
      fontWeight: '700',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(21, 33, 61, 0.35)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: s(24),
    },
    modalCard: {
      width: '100%',
      maxWidth: s(300),
      borderRadius: s(12),
      backgroundColor: isDarkMode ? '#162238' : colors.white,
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D7DFEF',
      paddingHorizontal: s(16),
      paddingVertical: s(14),
      gap: s(8),
      alignItems: 'center',
    },
    modalTitle: {
      color: isDarkMode ? '#EBF2FF' : '#2D4A82',
      fontSize: s(18),
      fontWeight: '700',
      textAlign: 'center',
    },
    modalMessage: {
      color: isDarkMode ? '#C4D2EE' : '#5A6E98',
      fontSize: s(14),
      textAlign: 'center',
      lineHeight: s(20),
    },
    modalButton: {
      marginTop: s(6),
      minWidth: s(120),
      borderRadius: s(8),
      backgroundColor: '#3D64A7',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(8),
      paddingHorizontal: s(14),
    },
    modalButtonText: {
      color: colors.white,
      fontSize: s(14),
      fontWeight: '700',
    },
  });
}
