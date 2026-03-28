import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../theme/colors';

export default function TopHeaderR({ s, navigation, title, subtitle }) {
  const styles = getStyles(s);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.brandWrap}>
            <Image
              source={require('../../../images/logoSinFondo.png')}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Text style={styles.brandText}>Metzvia</Text>
          </View>

          <View style={styles.rightGroup}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('NotificacionesR')}>
              <Image
                source={require('../../../images/bell_9972125.png')}
                style={styles.bellIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('PerfilR')}>
              <Image
                source={require('../../../images/usuario.png')}
                style={styles.avatarIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {(title || subtitle) ? (
        <View style={styles.pageHeading}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : null}
    </>
  );
}

function getStyles(s) {
  return StyleSheet.create({
    header: {
      backgroundColor: colors.primaryDark,
      paddingHorizontal: s(14),
      paddingTop: s(10),
      paddingBottom: s(12),
      borderBottomLeftRadius: s(14),
      borderBottomRightRadius: s(14),
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    brandWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
    },
    brandLogo: {
      width: s(120),
      height: s(52),
      marginLeft: s(-22),
      transform: [{ scale: 1.55 }],
    },
    brandText: {
      color: colors.white,
      fontSize: s(22),
      fontWeight: '700',
      fontFamily: 'serif',
      marginLeft: s(-18),
    },
    rightGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s(8),
    },
    iconCircle: {
      width: s(28),
      height: s(28),
      borderRadius: s(14),
      backgroundColor: '#FFFFFF2E',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bellIcon: {
      width: s(14),
      height: s(14),
    },
    avatar: {
      width: s(38),
      height: s(38),
      borderRadius: s(19),
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#DCE3F5',
    },
    avatarIcon: {
      width: s(18),
      height: s(18),
    },
    pageHeading: {
      paddingHorizontal: s(14),
      paddingTop: s(12),
      paddingBottom: s(6),
    },
    title: {
      color: colors.primaryDark,
      fontSize: s(21),
      fontWeight: '600',
    },
    subtitle: {
      color: colors.muted,
      fontSize: s(12),
      marginTop: s(2),
    },
  });
}
