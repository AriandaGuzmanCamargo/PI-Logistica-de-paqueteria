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
  heroRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  brandLogo: {
    width: 200,
    height: 150,
    marginBottom: -25,
  },
  heroText: {
    color: '#14286b',
    fontWeight: '700',
    fontSize: 32,
    fontFamily: 'serif',
    marginTop: -15,
    marginBottom: 25,
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
    fontSize: 20,
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
    backgroundColor: '#1e5b9d',
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
    color: '#5B9FE6',
    fontWeight: '700',
  },
});

export default styles;