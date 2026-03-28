import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import getBottomNavRStyles from '../styles/BottomNavRStyles';
import { useDarkMode } from '../context/DarkModeContext';

function NavItem({ label, isActive, onPress, styles, showBadge, iconSource, hideLabel = false }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <View style={styles.navDotWrap}>
        {iconSource ? (
          <Image source={iconSource} style={styles.navIcon} resizeMode="contain" />
        ) : (
          <View style={[styles.navDot, isActive && styles.navDotActive]} />
        )}
        {showBadge ? (
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>1</Text>
          </View>
        ) : null}
      </View>
      {!hideLabel ? <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

export default function BottomNavR({
  navigation,
  s,
  activeTab,
  showRutaBadge = false,
}) {
  const { isDarkMode } = useDarkMode();
  const styles = getBottomNavRStyles(s, isDarkMode);

  const items = [
    { label: 'Inicio', route: 'DashboardR' },
    { label: 'Entregas', route: 'EntregasR' },
    { label: 'Ruta', route: 'RutaR', showBadge: showRutaBadge },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          isActive={activeTab === item.label}
          onPress={item.route ? () => navigation.navigate(item.route) : undefined}
          styles={styles}
          showBadge={Boolean(item.showBadge)}
          iconSource={item.iconSource}
          hideLabel={Boolean(item.hideLabel)}
        />
      ))}
    </View>
  );
}
