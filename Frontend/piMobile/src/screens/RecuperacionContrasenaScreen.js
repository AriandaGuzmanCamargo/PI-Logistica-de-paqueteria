import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/RecuperacionContrasenaStyles';

export default function RecuperacionContrasenaScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Sistema de Logistica de Transporte de Paqueteria</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Recuperar Contrasena</Text>
            <Text style={styles.subtitle}>Ingresa tu correo para recuperar tu contrasena.</Text>

          <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" />
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.primaryBtnText}>Enviar Enlace de Recuperacion</Text>
          </TouchableOpacity>

            <Text style={styles.note}>Recordaste tu contrasena? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Inicia sesion</Text></Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
