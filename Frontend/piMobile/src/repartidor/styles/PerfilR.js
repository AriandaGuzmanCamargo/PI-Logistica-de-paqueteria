import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getPerfilRStyles(s, isDarkMode = false) {
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
		topHeaderTitle: {
			color: colors.white,
			fontSize: s(16),
			fontWeight: '700',
		},
		coverArea: {
			height: s(92),
			backgroundColor: isDarkMode ? '#1A2438' : '#CCD7EE',
		},
		profileWrap: {
			flex: 1,
			alignItems: 'center',
			paddingHorizontal: s(16),
			marginTop: s(-55),
		},
		photoFrame: {
			width: s(112),
			height: s(112),
			borderRadius: s(56),
			padding: s(4),
			backgroundColor: '#E6ECF8',
			borderWidth: 2,
			borderColor: '#F4F7FD',
		},
		profilePhoto: {
			width: '100%',
			height: '100%',
			borderRadius: s(52),
		},
		profileName: {
			marginTop: s(10),
			color: isDarkMode ? '#E4ECFF' : '#2F4E8D',
			fontSize: s(34) > 34 ? 34 : s(30),
			fontWeight: '700',
		},
		roleRow: {
			marginTop: s(4),
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(8),
		},
		onlineDot: {
			width: s(12),
			height: s(12),
			borderRadius: s(6),
			backgroundColor: '#72C5B5',
		},
		roleText: {
			color: isDarkMode ? '#B8C5E2' : '#6B7C9F',
			fontSize: s(17),
			fontWeight: '700',
		},
		infoCard: {
			width: '100%',
			marginTop: s(18),
			borderTopWidth: 1,
			borderTopColor: isDarkMode ? '#2E3C5D' : '#DDE4F3',
			paddingTop: s(12),
			gap: s(10),
		},
		infoRow: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: s(10),
		},
		infoLabel: {
			color: isDarkMode ? '#DBE7FF' : '#3D5D95',
			fontSize: s(16),
			fontWeight: '700',
			minWidth: s(80),
		},
		infoValue: {
			color: isDarkMode ? '#B8C5E2' : '#7283A5',
			fontSize: s(16),
			fontWeight: '500',
			flexShrink: 1,
		},
		logoutBtn: {
			marginTop: s(20),
			width: '100%',
			borderRadius: s(9),
			paddingVertical: s(11),
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#CF5E5D',
		},
		settingsBtn: {
			marginTop: s(16),
			width: '100%',
			borderRadius: s(9),
			paddingVertical: s(11),
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#3D64A7',
		},
		settingsText: {
			color: colors.white,
			fontWeight: '700',
			fontSize: s(16),
		},
		logoutText: {
			color: colors.white,
			fontWeight: '700',
			fontSize: s(16),
		},
	});
}
