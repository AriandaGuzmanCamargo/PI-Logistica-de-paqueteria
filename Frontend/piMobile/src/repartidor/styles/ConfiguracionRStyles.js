import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getConfiguracionRStyles(s, isDarkMode = false) {
  const bgWeb = isDarkMode ? '#0A101C' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0E1524' : '#EAF0FA';

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
      backgroundColor: bgApp,
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
    },
    contentContainer: {
      paddingTop: s(10),
      paddingBottom: s(12),
      gap: s(10),
    },
    sectionCard: {
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D9E1F0',
      backgroundColor: isDarkMode ? '#1A253A' : '#EDF2FC',
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      gap: s(8),
    },
    sectionTitle: {
      color: isDarkMode ? '#ECF2FF' : '#2F4E8D',
      fontSize: s(18),
      fontWeight: '700',
    },
    optionRow: {
      minHeight: s(42),
      borderRadius: s(8),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D7DFEF',
      backgroundColor: isDarkMode ? '#172238' : '#F7FAFF',
      paddingHorizontal: s(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: s(8),
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
      flexShrink: 1,
    },
    optionIconWrap: {
      width: s(25),
      height: s(25),
      borderRadius: s(13),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#263958' : '#E4ECFA',
      borderWidth: 1,
      borderColor: isDarkMode ? '#395278' : '#D4DFF2',
    },
    optionText: {
      color: isDarkMode ? '#D8E4FA' : '#4E679D',
      fontSize: s(14),
      fontWeight: '600',
      flexShrink: 1,
    },
    optionArrow: {
      color: isDarkMode ? '#ECF2FF' : '#4D679D',
      fontSize: s(16),
      fontWeight: '700',
    },
  });
}
