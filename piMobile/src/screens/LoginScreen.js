import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Sistema de Logistica de Transporte de Paqueteria</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Iniciar Sesion</Text>
            <Text style={styles.subtitle}>Bienvenido. Por favor inicie sesion para continuar.</Text>

          <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" />
          <TextInput style={styles.input} placeholder="Contrasena" placeholderTextColor="#9AA4BF" secureTextEntry />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.primaryBtnText}>Iniciar Sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('RecuperacionContrasena')}>
            <Text style={styles.link}>Olvidaste tu contrasena?</Text>
          </TouchableOpacity>
   <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.note}>No tienes cuenta? <Text style={styles.linkStrong}>Registrate</Text></Text>

         
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
