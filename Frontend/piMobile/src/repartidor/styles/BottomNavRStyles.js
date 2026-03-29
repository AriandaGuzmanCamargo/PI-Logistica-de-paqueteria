import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getBottomNavRStyles(s, isDarkMode = false) {
  return StyleSheet.create({
    bottomNav: {
      height: s(64),
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
      minWidth: s(66),
      borderRadius: s(12),
      paddingVertical: s(5),
      paddingHorizontal: s(6),
    },
    navItemActive: {
      backgroundColor: isDarkMode ? '#1D2D49' : '#E2EAF8',
    },
    navDotWrap: {
      position: 'relative',
      width: s(18),
      height: s(18),
      alignItems: 'center',
      justifyContent: 'center',
    },
    navIcon: {
      width: s(18),
      height: s(18),
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
      fontWeight: '700',
    },
  });
}
