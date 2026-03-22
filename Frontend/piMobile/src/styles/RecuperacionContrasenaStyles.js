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
    padding: 24,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: '#3B486D',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 26,
    color: '#3D4567',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7393',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
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
    marginTop: 12,
  },
  primaryBtnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  note: {
    textAlign: 'center',
    color: '#5F678A',
    marginTop: 14,
  },
  link: {
    color: colors.gold,
    fontWeight: '700',
  },
});

export default styles;
