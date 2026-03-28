import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getRutaRStyles(s, isDarkMode = false) {
	const bgWeb = isDarkMode ? '#0B1220' : '#DCE5F5';
	const bgApp = isDarkMode ? '#0F1626' : '#EAF0FA';
	const border = isDarkMode ? '#2E3C5D' : '#D7DFEF';

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
		webPhoneFrame: {
			borderRadius: s(22),
			overflow: 'hidden',
			borderWidth: 1,
			borderColor: '#C3CEE6',
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
			marginTop: s(8),
		},
		contentContainer: {
			paddingHorizontal: s(10),
			paddingTop: s(10),
			paddingBottom: s(12),
			gap: s(10),
		},
		mapCard: {
			height: s(200),
			borderRadius: s(10),
			borderWidth: 1,
			borderColor: border,
			backgroundColor: isDarkMode ? '#24314A' : '#DDE5F0',
			overflow: 'hidden',
			position: 'relative',
		},
		mapOverlay: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			backgroundColor: 'rgba(15, 23, 42, 0.2)',
		},
		mapFallbackWrap: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: s(14),
			gap: s(8),
		},
		mapFallbackTitle: {
			color: isDarkMode ? '#E2EBFF' : '#314A78',
			fontSize: s(14),
			fontWeight: '700',
			textAlign: 'center',
		},
		mapFallbackText: {
			color: isDarkMode ? '#B7C7E8' : '#5A6F9A',
			fontSize: s(11),
			lineHeight: s(16),
			textAlign: 'center',
		},
		mapLoadingWrap: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			gap: s(8),
		},
		mapLoadingText: {
			color: isDarkMode ? '#D7E4FF' : '#39558C',
			fontSize: s(12),
			fontWeight: '600',
		},
		mapErrorText: {
			color: isDarkMode ? '#FFD2D2' : '#B33A3A',
			fontSize: s(11),
			textAlign: 'center',
			paddingHorizontal: s(12),
			lineHeight: s(15),
		},
		card: {
			borderRadius: s(10),
			borderWidth: 1,
			borderColor: border,
			backgroundColor: isDarkMode ? '#1D2740' : '#F4F7FD',
			paddingHorizontal: s(12),
			paddingVertical: s(11),
		},
		clientRow: {
			flexDirection: 'row',
			alignItems: 'flex-start',
			gap: s(8),
			marginBottom: s(7),
		},
		pinMarker: {
			width: s(20),
			height: s(20),
			borderRadius: s(10),
			backgroundColor: '#F0BD45',
			borderWidth: 2,
			borderColor: '#E7A728',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: s(2),
		},
		clientInfo: {
			flex: 1,
			gap: s(2),
		},
		clientName: {
			color: isDarkMode ? '#E4ECFF' : '#304D82',
			fontSize: s(28) > 28 ? 28 : s(22),
			fontWeight: '700',
			lineHeight: s(26),
		},
		clientAddress: {
			color: isDarkMode ? '#B8C5E2' : '#5B6F96',
			fontSize: s(12),
			lineHeight: s(18),
		},
		phone: {
			color: isDarkMode ? '#D9E4FF' : '#3D4E73',
			fontWeight: '700',
			fontSize: s(32) > 32 ? 32 : s(24),
			marginBottom: s(7),
		},
		metricsRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: s(10),
		},
		metricText: {
			color: isDarkMode ? '#B0C0E0' : '#7A88A8',
			fontSize: s(11),
		},
		metricStrong: {
			color: isDarkMode ? '#E2EBFF' : '#3F4E73',
			fontWeight: '700',
		},
		warningText: {
			color: isDarkMode ? '#FDE68A' : '#8A4B08',
			fontSize: s(11),
			lineHeight: s(15),
			marginBottom: s(8),
		},
		refreshBtn: {
			borderRadius: s(7),
			backgroundColor: isDarkMode ? '#314A78' : '#5D7FB7',
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: s(8),
			marginBottom: s(8),
		},
		refreshBtnText: {
			color: colors.white,
			fontSize: s(12),
			fontWeight: '600',
		},
		liveBtn: {
			borderRadius: s(7),
			backgroundColor: isDarkMode ? '#2F5A45' : '#4E9A72',
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: s(8),
			marginBottom: s(6),
		},
		liveBtnActive: {
			backgroundColor: isDarkMode ? '#7A2F2F' : '#C44E4E',
		},
		liveBtnText: {
			color: colors.white,
			fontSize: s(12),
			fontWeight: '700',
		},
		liveStatus: {
			color: isDarkMode ? '#86EFAC' : '#17613B',
			fontSize: s(11),
			fontWeight: '600',
			marginBottom: s(8),
		},
		startBtn: {
			borderRadius: s(7),
			backgroundColor: '#E4B23C',
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: s(9),
		},
		startBtnText: {
			color: colors.white,
			fontSize: s(22) > 22 ? 22 : s(18),
			fontWeight: '600',
		},
	});
}
