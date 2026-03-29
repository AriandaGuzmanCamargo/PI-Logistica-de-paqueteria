import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import getBottomNavRStyles from '../styles/BottomNavRStyles';
import { useDarkMode } from '../context/DarkModeContext';

function NavIcon({ iconSet, iconName, activeIconName, isActive, size, color }) {
  const selectedName = isActive && activeIconName ? activeIconName : iconName;

  if (iconSet === 'material') {
    return <MaterialCommunityIcons name={selectedName} size={size} color={color} />;
  }

  if (iconSet === 'feather') {
    return <Feather name={selectedName} size={size} color={color} />;
  }

  return <Ionicons name={selectedName} size={size} color={color} />;
}

function NavItem({ label, isActive, onPress, styles, showBadge, iconSource, hideLabel = false, iconSet, iconName, activeIconName }) {
  const iconColor = isActive ? '#2C5498' : '#8192B5';

  return (
    <TouchableOpacity style={[styles.navItem, isActive && styles.navItemActive]} onPress={onPress}>
      <View style={styles.navDotWrap}>
        {iconSource ? (
          <Image source={iconSource} style={styles.navIcon} resizeMode="contain" />
        ) : (
          <NavIcon
            iconSet={iconSet}
            iconName={iconName}
            activeIconName={activeIconName}
            isActive={isActive}
            size={16}
            color={iconColor}
          />
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
    { label: 'Inicio', route: 'DashboardR', iconSet: 'ion', iconName: 'home-outline', activeIconName: 'home' },
    {
      label: 'Entregas',
      route: 'EntregasR',
      iconSet: 'material',
      iconName: 'truck-delivery-outline',
      activeIconName: 'truck-delivery',
    },
    { label: 'Ruta', route: 'RutaR', showBadge: showRutaBadge, iconSet: 'material', iconName: 'map-marker-path' },
    { label: 'Perfil', route: 'PerfilR', iconSet: 'ion', iconName: 'person-outline', activeIconName: 'person' },
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
          iconSet={item.iconSet}
          iconName={item.iconName}
          activeIconName={item.activeIconName}
        />
      ))}
    </View>
  );
}
