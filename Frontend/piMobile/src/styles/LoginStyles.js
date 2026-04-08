import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F2742',
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
  hero: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brandLogo: {
    width: 300,
    height: 230,
    marginBottom: -64,
  },
  heroText: {
    textAlign: 'center',
    color: '#F0F5FF',
    fontWeight: '700',
    fontSize: 35,
    marginBottom: 24,
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D7DFEA',
    width: '100%',
    shadowColor: '#3B486D',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: {
    color: '#25324A',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#5F6B84',
    marginBottom: 20,
    marginTop: 4,
  },
  roleLabel: {
    color: '#43516F',
    fontWeight: '600',
    marginBottom: 8,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface2,
    borderRadius: 10,
    paddingVertical: 10,
  },
  roleBtnActive: {
    borderColor: '#1D4E89',
    backgroundColor: '#EAF2FF',
  },
  roleBtnText: {
    textAlign: 'center',
    color: '#52607F',
    fontWeight: '600',
  },
  roleBtnTextActive: {
    color: '#1D4E89',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#EEF3F8',
    borderWidth: 1,
    borderColor: '#D7DFEA',
    borderRadius: 8,
    padding: 13,
    color: '#25324A',
    marginBottom: 12,
  },
  passwordWrap: {
    position: 'relative',
  },
  inputPassword: {
    paddingRight: 44,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 2,
  },
  errorText: {
    color: '#B42318',
    marginTop: -4,
    marginBottom: 10,
    fontWeight: '600',
  },
  primaryBtn: {
    borderRadius: 10,
    marginTop: 4,
    overflow: 'hidden',
  },
  primaryBtnGradient: {
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  primaryBtnDisabled: {
    opacity: 0.7,
  },
  primaryBtnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    color: '#6D79A2',
    marginTop: 12,
    fontSize: 13,
  },
  note: {
    textAlign: 'center',
    marginTop: 14,
    color: '#52607F',
  },
  linkStrong: {
    color: '#C99A2E',
    fontWeight: '700',
  },
});

export default styles;