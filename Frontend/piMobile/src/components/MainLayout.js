import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/MainLayoutStyles';

const tabs = [
  { label: 'Inicio', route: 'Dashboard' },
  { label: 'Envios', route: 'RastrearEnvio' },
  { label: 'Menu', route: 'MenuUsuario' },
];

export default function MainLayout({
  title,
  navigation,
  backTo,
  children,
  activeTab,
  subtitle,
}) {  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrap}>
        <View style={styles.bgBubbleTop} />
        <View style={styles.bgBubbleBottom} />

        <View style={styles.shell}>
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View style={styles.brandWrap}>
                <Image
                  source={require('../../images/logoSinFondo.png')}
                  style={styles.brandLogo}
                  resizeMode="contain"
                />
                <Text style={styles.brandText}>Metzvia</Text>
              </View>

              <View style={styles.rightGroup}>
                <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.navigate('Notificaciones')}>
                  <Image
                    source={require('../../images/bell_9972125.png')}
                    style={styles.bellIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.avatar} onPress={() => navigation.navigate('ConfiguracionUsuario')}>
                  <Image
                    source={require('../../images/usuario.png')}
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

          <ScrollView contentContainerStyle={styles.mainArea} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          <View style={styles.bottomNav}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab.route} onPress={() => navigation.navigate(tab.route)}>
                <Text style={[styles.navLink, activeTab === tab.route && styles.navLinkActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
