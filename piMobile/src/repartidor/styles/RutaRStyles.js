import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function getRutaRStyles(s) {
	return StyleSheet.create({
		nativeRoot: { flex: 1 },
		webRoot: {
			flex: 1,
			backgroundColor: '#DCE5F5',
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: s(12),
		},
		topHeader: {
			height: s(56),
			backgroundColor: colors.primaryDark,
			alignItems: 'center',
			justifyContent: 'center',
		},
		topHeaderTitle: {
			color: colors.white,
			fontSize: s(16),
			fontWeight: '700',
		},
		content: {
			flex: 1,
			backgroundColor: '#EAF0FA',
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
			borderColor: '#D7DFEF',
			backgroundColor: '#DDE5F0',
			overflow: 'hidden',
		},
		card: {
			borderRadius: s(10),
			borderWidth: 1,
			borderColor: '#D7DFEF',
			backgroundColor: '#F4F7FD',
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
			color: '#304D82',
			fontSize: s(28) > 28 ? 28 : s(22),
			fontWeight: '700',
			lineHeight: s(26),
		},
		clientAddress: {
			color: '#5B6F96',
			fontSize: s(12),
			lineHeight: s(18),
		},
		phone: {
			color: '#3D4E73',
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
			color: '#7A88A8',
			fontSize: s(11),
		},
		metricStrong: {
			color: '#3F4E73',
			fontWeight: '700',
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
