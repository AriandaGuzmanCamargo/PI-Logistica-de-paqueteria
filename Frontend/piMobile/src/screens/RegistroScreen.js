import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/RegistroStyles';

export default function RegistroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Image source={require('../../images/logoSinFondo.png')} style={styles.brandLogo} resizeMode="contain" />
            <Text style={styles.heroText}>Sistema de Logistica de Transporte de Paqueteria</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Registrarse</Text>
            <Text style={styles.subtitle}>Crea tu cuenta para continuar.</Text>

          <TextInput style={styles.input} placeholder="Nombre completo" placeholderTextColor="#9AA4BF" />
          <TextInput style={styles.input} placeholder="Correo electronico" placeholderTextColor="#9AA4BF" />
          <TextInput style={styles.input} placeholder="Contrasena" placeholderTextColor="#9AA4BF" secureTextEntry />
          <TextInput style={styles.input} placeholder="Confirmar contrasena" placeholderTextColor="#9AA4BF" secureTextEntry />

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.primaryBtnText}>Registrarse</Text>
          </TouchableOpacity>
 <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Login')}>
              
          <Text style={styles.note}>Ya tienes cuenta? <Text style={styles.linkStrong}>Inicia sesion</Text></Text>

           
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
