import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A2D50',
  },
  gradientBackground: {
    flex: 1,
  },
  keyboardWrap: {
    flex: 1,
  },
  waveOne: {
    position: 'absolute',
    width: '210%',
    height: 270,
    left: '-62%',
    top: '28%',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    transform: [{ rotate: '-6deg' }],
  },
  waveTwo: {
    position: 'absolute',
    width: '210%',
    height: 240,
    left: '-58%',
    top: '45%',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    transform: [{ rotate: '-4deg' }],
  },
  waveThree: {
    position: 'absolute',
    width: '225%',
    height: 250,
    left: '-70%',
    top: '60%',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    transform: [{ rotate: '-3deg' }],
  },
  waveFour: {
    position: 'absolute',
    width: '235%',
    height: 220,
    left: '-74%',
    top: '78%',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ rotate: '-2deg' }],
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 420,
    zIndex: 2,
  },
  heroRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 300,
    height: 230,
    marginBottom: -64,
  },
  heroText: {
    color: '#14286b',
    fontWeight: '700',
    fontSize: 32,
    fontFamily: 'serif',
    marginTop: -15,
    marginBottom: 25
  },
  card: {
    backgroundColor: '#F9F9FD',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E1E4F1',
    padding: 24,
    gap: 10,
    shadowColor: '#3B486D',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: '#3D4567',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7393',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F5FB',
    borderWidth: 1,
    borderColor: '#E1E4F1',
    borderRadius: 8,
    padding: 13,
    color: '#3E4768',
  },
  primaryBtn: {
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },
  primaryBtnGradient: {
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  note: {
    textAlign: 'center',
    marginTop: 10,
    color: '#5F678A',
  },
  linkStrong: {
    color: '#D4A235',
    fontWeight: '700',
  },
});

export default styles;