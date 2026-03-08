import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import getBottomNavRStyles from '../styles/BottomNavRStyles';

function NavItem({ label, isActive, onPress, styles, showBadge }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <View style={styles.navDotWrap}>
        <View style={[styles.navDot, isActive && styles.navDotActive]} />
        {showBadge ? (
          <View style={styles.navBadge}>
            <Text style={styles.navBadgeText}>1</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function BottomNavR({
  navigation,
  s,
  activeTab,
  showRutaBadge = false,
  fourthLabel = 'Alertas',
}) {
  const styles = getBottomNavRStyles(s);

  const items = [
    { label: 'Inicio', route: 'DashboardR' },
    { label: 'Entregas', route: 'EntregasR' },
    { label: 'Ruta', route: 'RutaR', showBadge: showRutaBadge },
    { label: fourthLabel, route: null },
    { label: 'Perfil', route: null },
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
        />
      ))}
    </View>
  );
}
