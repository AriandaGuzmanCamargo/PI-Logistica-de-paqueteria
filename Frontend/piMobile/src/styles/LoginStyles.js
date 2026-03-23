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
  roleLabel: {
    color: '#586487',
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
    borderColor: colors.gold,
    backgroundColor: '#FFF3D4',
  },
  roleBtnText: {
    textAlign: 'center',
    color: '#5B6484',
    fontWeight: '600',
  },
  roleBtnTextActive: {
    color: '#8A6511',
    fontWeight: '700',
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
  errorText: {
    color: '#C43D3D',
    marginTop: -4,
    marginBottom: 10,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: colors.gold,
    borderRadius: 10,
    padding: 13,
    marginTop: 4,
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
    color: '#5F678A',
  },
  linkStrong: {
    color: colors.gold,
    fontWeight: '700',
  },
});

export default styles;
