import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getDashboardRStyles(s, isDarkMode = false) {
	const bgApp = isDarkMode ? '#0F1626' : '#EAF0FA';
	const bgWeb = isDarkMode ? '#0B1220' : '#DCE4F3';
	const cardBg = isDarkMode ? '#1D2740' : '#EEF2FB';
	const panelBorder = isDarkMode ? '#2E3C5D' : '#D9E0EF';
	const textPrimary = isDarkMode ? '#E4ECFF' : '#2D467C';
	const textSecondary = isDarkMode ? '#B8C5E2' : '#8090B8';
	const textMuted = isDarkMode ? '#AAB8D7' : '#7583A6';
	const cardBase = {
		borderRadius: s(10),
		borderWidth: 1,
		borderColor: panelBorder,
	};
	const iconBase = {
		width: s(24),
		height: s(24),
		borderRadius: s(8),
		alignItems: 'center',
		justifyContent: 'center',
	};
	const rowBetween = {
		flexDirection: 'row',
		justifyContent: 'space-between',
	};

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
			flex: 4,
			backgroundColor: colors.primaryDark,
			borderRadius: s(20),
			overflow: 'hidden',
		},
		header: {
			height: s(56),
			backgroundColor: colors.primaryDark,
			paddingHorizontal: s(12),
			...rowBetween,
			alignItems: 'center',
		},
		brandWrap: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(8),
		},
		brandText: {
			color: colors.white,
			fontSize: s(16),
			fontWeight: '700',
			letterSpacing: 0.2,
		},
		headerRight: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(8),
		},
		content: {
			backgroundColor: bgApp,
			paddingHorizontal: s(10),
			paddingTop: s(10),
			paddingBottom: s(12),
			gap: s(8),
		},
		welcome: {
			color: textPrimary,
			fontSize: s(24),
			fontWeight: '700',
		},
		serviceRow: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(6),
			marginTop: s(-2),
		},
		onlineDot: {
			width: s(7),
			height: s(7),
			borderRadius: s(4),
			backgroundColor: '#4CB36C',
		},
		serviceText: {
			color: textSecondary,
			fontSize: s(12),
		},
		statsRow: {
			flexDirection: 'row',
			gap: s(8),
		},
		statCard: {
			flex: 1,
			borderRadius: s(9),
			borderWidth: 1,
			borderColor: isDarkMode ? '#324566' : '#D9E1F1',
			backgroundColor: isDarkMode ? '#1F2B45' : '#F6F8FE',
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(8),
			paddingHorizontal: s(8),
			paddingVertical: s(8),
		},
		statIconBlue: {
			...iconBase,
			backgroundColor: '#61A2D8',
		},
		statIconGold: {
			...iconBase,
			backgroundColor: '#F1D078',
		},
		statIconText: {
			color: colors.white,
			fontWeight: '700',
			fontSize: s(9),
		},
		statTitle: {
			color: isDarkMode ? '#D5E2FF' : '#2A4D8C',
			fontWeight: '700',
			fontSize: s(13),
			lineHeight: s(15),
		},
		statValue: {
			color: isDarkMode ? '#E8F0FF' : '#365484',
			fontWeight: '700',
			fontSize: s(16),
			lineHeight: s(18),
		},
		card: {
			...cardBase,
			backgroundColor: cardBg,
			padding: s(9),
		},
		singleBox: {
			height: s(170),
			...cardBase,
			borderColor: isDarkMode ? '#334363' : '#D1D8E5',
			backgroundColor: isDarkMode ? '#24314A' : '#DDE3EE',
		},
		searchRow: {
			marginBottom: s(8),
		},
		searchInputWrap: {
			flex: 1,
			borderWidth: 1,
			borderColor: isDarkMode ? '#324360' : '#D6DEEE',
			borderRadius: s(8),
			backgroundColor: isDarkMode ? '#18233A' : '#F5F8FE',
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: s(8),
		},
		searchPrefix: {
			color: textMuted,
			fontSize: s(11),
			fontWeight: '700',
		},
		searchInput: {
			flex: 1,
			color: isDarkMode ? '#D5E3FF' : '#4A5D85',
			fontSize: s(12),
			paddingHorizontal: s(6),
			paddingVertical: s(8),
		},
		sortRow: {
			marginBottom: s(8),
		},
		sortText: {
			color: textMuted,
			fontSize: s(11),
		},
		singleRecord: {
			paddingVertical: s(8),
			gap: s(5),
			...cardBase,
			backgroundColor: isDarkMode ? '#1B2941' : '#E8EDF8',
			paddingHorizontal: s(8),
		},
		recordTopRow: {
			...rowBetween,
			alignItems: 'center',
		},
		recordIdWrap: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(6),
		},
		recordDot: {
			width: s(10),
			height: s(10),
			borderRadius: s(5),
			borderWidth: 2,
			borderColor: '#EAA729',
		},
		recordId: {
			color: isDarkMode ? '#B9C6E4' : '#5B6B90',
			fontSize: s(10),
		},
		recordTime: {
			color: isDarkMode ? '#C9D8F7' : '#4F6795',
			fontWeight: '600',
			fontSize: s(12),
		},
		recordBottomRow: {
			...rowBetween,
			alignItems: 'flex-end',
			gap: s(8),
		},
		recordInfo: {
			flex: 1,
		},
		recordName: {
			color: isDarkMode ? '#E1EAFE' : '#27467B',
			fontWeight: '700',
			fontSize: s(16),
			lineHeight: s(19),
		},
		recordAddress: {
			color: isDarkMode ? '#B5C4E3' : '#4F638D',
			fontSize: s(11),
		},
		recordActionBtn: {
			borderRadius: s(7),
			minWidth: s(96),
			paddingHorizontal: s(10),
			paddingVertical: s(5),
			alignItems: 'center',
			backgroundColor: '#F2AB2A',
		},
		recordActionText: {
			color: colors.white,
			fontWeight: '700',
			fontSize: s(10),
		},
		tipCard: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			marginBottom: s(6),
		},
		tipTextWrap: {
			flex: 1,
			paddingRight: s(8),
		},
		tipTitle: {
			color: isDarkMode ? '#DCE8FF' : '#405D8E',
			fontWeight: '700',
			fontSize: s(15),
			marginBottom: s(3),
		},
		tipBody: {
			color: isDarkMode ? '#B8C4DE' : '#617399',
			fontSize: s(11),
			marginBottom: s(5),
		},
		tipLink: {
			color: '#3F67A8',
			fontWeight: '600',
			fontSize: s(12),
		},
	});
}
