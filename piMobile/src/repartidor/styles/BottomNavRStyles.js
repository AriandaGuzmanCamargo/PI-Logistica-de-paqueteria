import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getBottomNavRStyles(s) {
  return StyleSheet.create({
    bottomNav: {
      height: s(58),
      borderTopWidth: 1,
      borderTopColor: '#D5DDEF',
      backgroundColor: '#ECF1FB',
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
      borderColor: '#8D9DC1',
    },
    navDotActive: {
      backgroundColor: '#3D64A7',
      borderColor: '#3D64A7',
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
      color: '#7081A7',
      fontSize: s(10),
      fontWeight: '600',
    },
    navLabelActive: {
      color: '#355A9C',
    },
  });
}
