import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3A4D8B',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 420,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandLogo: {
    width: 180,
    height: 76,
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
    borderWidth: 1,
    borderColor: colors.line,
    padding: 24,
    gap: 10,
    shadowColor: '#3B486D',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 28,
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
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
  },
  primaryBtn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 6,
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
    color: colors.gold,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    padding: 13,
  },
  secondaryBtnText: {
    color: '#5B6484',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
