import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/MainLayout';
import styles from '../styles/IdiomaStyles';

export default function IdiomaScreen({ navigation }) {
  return (
    <MainLayout title="Idioma" navigation={navigation} backTo="ConfiguracionUsuario" activeTab="ConfiguracionUsuario">
      <View style={styles.card}>
        <View style={styles.selectedRow}><Text style={styles.selected}>Espanol</Text><Text style={styles.check}>Activo</Text></View>
        <TouchableOpacity style={styles.item}><Text style={styles.itemText}>English</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.item}><Text style={styles.itemText}>Francais</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.itemLast}><Text style={styles.itemText}>Deutsch</Text><Text style={styles.arrow}>Elegir</Text></TouchableOpacity>
      </View>
    </MainLayout>
  );
}
