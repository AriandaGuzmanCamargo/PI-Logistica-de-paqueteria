import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import RecuperacionContrasenaScreen from '../screens/RecuperacionContrasenaScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MenuUsuarioScreen from '../screens/MenuUsuarioScreen';
import RastrearEnvioScreen from '../screens/RastrearEnvioScreen';
import DetalleEnvioScreen from '../screens/DetalleEnvioScreen';
import NuevoEnvioScreen from '../screens/NuevoEnvioScreen';
import PagoOpcionesScreen from '../screens/PagoOpcionesScreen';
import PagoTarjetaScreen from '../screens/PagoTarjetaScreen';
import PagoConfirmacionScreen from '../screens/PagoConfirmacionScreen';
import DireccionesGuardadasScreen from '../screens/DireccionesGuardadasScreen';
import ConfiguracionUsuarioScreen from '../screens/ConfiguracionUsuarioScreen';
import DatosPersonalesScreen from '../screens/DatosPersonalesScreen';
import CambiarContrasenaScreen from '../screens/CambiarContrasenaScreen';
import MisEnviosScreen from '../screens/MisEnviosScreen';
import NotificacionesScreen from '../screens/NotificacionesScreen';
import FormRemitenteScreen from '../screens/FormRemitenteScreen';
import FormDestinatarioScreen from '../screens/FormDestinatarioScreen';
import FormPaqueteScreen from '../screens/FormPaqueteScreen';
import FormResumenEnvioScreen from '../screens/FormResumenEnvioScreen';
import DashboardR from '../repartidor/screens/DashboardR';
import EntregasR from '../repartidor/screens/EntregasR';
import RutaR from '../repartidor/screens/RutaR';
import DetalleEntregaR from '../repartidor/screens/DetalleEntregaR';
import TomarFotoEntregaR from '../repartidor/screens/TomarFotoEntregaR';
import IncidenciasR from '../repartidor/screens/IncidenciasR';
import DetalleIncidenciaR from '../repartidor/screens/DetalleIncidenciaR';
import NotificacionesR from '../repartidor/screens/notificaciones';
import PerfilR from '../repartidor/screens/PerfilR';
import ConfiguracionR from '../repartidor/screens/ConfiguracionR';
import CambiarContrasenaR from '../repartidor/screens/CambiarContrasenaR';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="RecuperacionContrasena" component={RecuperacionContrasenaScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="DashboardR" component={DashboardR} />
      <Stack.Screen name="EntregasR" component={EntregasR} />
      <Stack.Screen name="RutaR" component={RutaR} />
      <Stack.Screen name="DetalleEntregaR" component={DetalleEntregaR} />
      <Stack.Screen name="TomarFotoEntregaR" component={TomarFotoEntregaR} />
      <Stack.Screen name="IncidenciasR" component={IncidenciasR} />
      <Stack.Screen name="DetalleIncidenciaR" component={DetalleIncidenciaR} />
      <Stack.Screen name="NotificacionesR" component={NotificacionesR} />
      <Stack.Screen name="PerfilR" component={PerfilR} />
      <Stack.Screen name="ConfiguracionR" component={ConfiguracionR} />
      <Stack.Screen name="CambiarContrasenaR" component={CambiarContrasenaR} />
      <Stack.Screen name="MenuUsuario" component={MenuUsuarioScreen} />
      <Stack.Screen name="RastrearEnvio" component={RastrearEnvioScreen} />
      <Stack.Screen name="DetalleEnvio" component={DetalleEnvioScreen} />
      <Stack.Screen name="NuevoEnvio" component={NuevoEnvioScreen} />
      <Stack.Screen name="PagoOpciones" component={PagoOpcionesScreen} />
      <Stack.Screen name="PagoTarjeta" component={PagoTarjetaScreen} />
      <Stack.Screen name="PagoConfirmacion" component={PagoConfirmacionScreen} />
      <Stack.Screen name="DireccionesGuardadas" component={DireccionesGuardadasScreen} />
      <Stack.Screen name="MisEnvios" component={MisEnviosScreen} />
      <Stack.Screen name="Notificaciones" component={NotificacionesScreen} />
      <Stack.Screen name="FormRemitente" component={FormRemitenteScreen} />
      <Stack.Screen name="FormDestinatario" component={FormDestinatarioScreen} />
      <Stack.Screen name="FormPaquete" component={FormPaqueteScreen} />
      <Stack.Screen name="FormResumenEnvio" component={FormResumenEnvioScreen} />
      <Stack.Screen name="ConfiguracionUsuario" component={ConfiguracionUsuarioScreen} />
      <Stack.Screen name="DatosPersonales" component={DatosPersonalesScreen} />
      <Stack.Screen name="CambiarContrasena" component={CambiarContrasenaScreen} />
    </Stack.Navigator>
  );
}
