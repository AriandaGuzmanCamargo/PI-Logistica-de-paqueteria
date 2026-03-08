import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getBottomNavRStyles(s, isDarkMode = false) {
  return StyleSheet.create({
    bottomNav: {
      height: s(58),
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#344766' : '#D5DDEF',
      backgroundColor: isDarkMode ? '#10192B' : '#ECF1FB',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: s(2),
      minWidth: s(54),
    },
    navDotWrap: {
      position: 'relative',
      width: s(14),
      height: s(14),
      alignItems: 'center',
      justifyContent: 'center',
    },
    navDot: {
      width: s(12),
      height: s(12),
      borderRadius: s(7),
      borderWidth: 2,
      borderColor: isDarkMode ? '#B8C8E8' : '#8D9DC1',
    },
    navIcon: {
      width: s(18),
      height: s(18),
    },
    navDotActive: {
      backgroundColor: isDarkMode ? '#74A2EA' : '#3D64A7',
      borderColor: isDarkMode ? '#74A2EA' : '#3D64A7',
    },
    navBadge: {
      position: 'absolute',
      top: -3,
      right: -4,
      minWidth: s(10),
      height: s(10),
      borderRadius: s(5),
      backgroundColor: '#E0AD36',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: s(2),
    },
    navBadgeText: {
      color: colors.white,
      fontSize: s(7),
      fontWeight: '700',
      lineHeight: s(8),
    },
    navLabel: {
      color: isDarkMode ? '#C9D7F2' : '#7081A7',
      fontSize: s(10),
      fontWeight: '600',
    },
    navLabelActive: {
      color: isDarkMode ? '#EEF4FF' : '#355A9C',
    },
  });
}
