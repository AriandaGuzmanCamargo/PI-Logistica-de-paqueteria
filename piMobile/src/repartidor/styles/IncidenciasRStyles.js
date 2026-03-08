import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getIncidenciasRStyles(s, isDarkMode = false) {
  const panelBorder = isDarkMode ? '#344766' : '#D7DFEF';
  const panelBg = isDarkMode ? '#151F33' : '#F8FBFF';
  const bgWeb = isDarkMode ? '#0A101C' : '#DCE5F5';
  const bgApp = isDarkMode ? '#0E1524' : '#EAF0FA';
  const basePanel = {
    borderWidth: 1,
    borderColor: panelBorder,
    borderRadius: s(8),
    backgroundColor: panelBg,
  };

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
      borderColor: isDarkMode ? '#344766' : '#D8DFEF',
      backgroundColor: isDarkMode ? '#1A253A' : '#F3F7FE',
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
    label: {
      color: isDarkMode ? '#DCE8FF' : '#304D82',
      fontSize: s(14),
      fontWeight: '700',
      marginTop: s(2),
    },
    selectBox: {
      ...basePanel,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: s(10),
      paddingVertical: s(10),
    },
    selectBoxOpen: {
      borderColor: isDarkMode ? '#6F86B1' : '#AFC0E3',
    },
    selectText: {
      color: isDarkMode ? '#CBD9F7' : '#6A7DA1',
      fontSize: s(14),
    },
    selectArrow: {
      color: isDarkMode ? '#D6E2FA' : '#4F6798',
      fontSize: s(16),
      fontWeight: '700',
    },
    optionsWrap: {
      ...basePanel,
      maxHeight: s(170),
      overflow: 'hidden',
    },
    optionRow: {
      paddingHorizontal: s(10),
      paddingVertical: s(9),
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#2C3D5B' : '#E7ECF7',
    },
    optionRowActive: {
      backgroundColor: isDarkMode ? '#263653' : '#EDF3FF',
    },
    optionText: {
      color: isDarkMode ? '#BFD0F1' : '#5A6E98',
      fontSize: s(13),
    },
    optionTextActive: {
      color: isDarkMode ? '#E9F0FF' : '#2F4F8F',
      fontWeight: '700',
    },
    inputBox: {
      ...basePanel,
      minHeight: s(46),
      paddingHorizontal: s(10),
      paddingVertical: s(10),
      color: isDarkMode ? '#CBD9F7' : '#6A7DA1',
      fontSize: s(14),
      textAlignVertical: 'top',
    },
    evidenceRow: {
      flexDirection: 'row',
      gap: s(8),
      alignItems: 'center',
    },
    evidenceImage: {
      width: s(150),
      height: s(68),
      borderRadius: s(7),
      borderWidth: 1,
      borderColor: isDarkMode ? '#344766' : '#D2DBEC',
    },
    uploadBtn: {
      flex: 1,
      minHeight: s(46),
      ...basePanel,
      borderRadius: s(7),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: s(6),
    },
    uploadPlus: {
      color: isDarkMode ? '#BFD1F4' : '#4266A6',
      fontSize: Math.min(s(20), 26),
      lineHeight: s(20),
    },
    uploadText: {
      color: isDarkMode ? '#D6E3FB' : '#4969A8',
      fontSize: Math.min(s(13), 16),
      fontWeight: '600',
    },
    confirmBtn: {
      marginTop: s(8),
      borderRadius: s(7),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: s(10),
      backgroundColor: '#E25551',
    },
    confirmText: {
      color: colors.white,
      fontWeight: '700',
      fontSize: s(16),
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
      borderColor: panelBorder,
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
