import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/MainLayoutStyles';

const tabs = [
  { label: 'Inicio', route: 'Dashboard' },
  { label: 'Envios', route: 'RastrearEnvio' },
  { label: 'Perfil', route: 'ConfiguracionUsuario' },
  { label: 'Menu', route: 'MenuUsuario' },
];

export default function MainLayout({
  title,
  navigation,
  backTo,
  children,
  activeTab,
  subtitle,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenWrap}>
        <View style={styles.bgBubbleTop} />
        <View style={styles.bgBubbleBottom} />

        <View style={styles.shell}>
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => (backTo ? navigation.navigate(backTo) : navigation.navigate('MenuUsuario'))}
              >
                <Text style={styles.circleBtnText}>{backTo ? 'Atras' : 'Menu'}</Text>
              </TouchableOpacity>

              <Image
                source={require('../../images/logoSinFondo.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />

              <View style={styles.rightGroup}>
                <View style={styles.iconCircle}>
                  <Image
                    source={require('../../images/bell_9972125.png')}
                    style={styles.bellIcon}
                    resizeMode="contain"
                  />
                </View>
                <TouchableOpacity style={styles.avatar}>
                  <Text style={styles.avatarText}>EP</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>

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
