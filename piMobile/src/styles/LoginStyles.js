import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3A4D8B',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  content: { width: '100%', maxWidth: 420 },
  hero: {
    alignItems: 'center',
    marginBottom: 18,
  },
  brandLogo: {
    width: 180,
    height: 78,
    marginBottom: 4,
  },
  heroText: {
    textAlign: 'center',
    color: '#CFD7EE',
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.line,
    width: '100%',
    shadowColor: '#3B486D',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  title: {
    color: '#3D4567',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7393',
    marginBottom: 18,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 4,
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
    color: '#5F678A',
  },
  linkStrong: {
    color: colors.gold,
    fontWeight: '700',
  },
  googleBtn: {
    textAlign: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingVertical: 12,
    color: '#5B6484',
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
  },
});

export default styles;
