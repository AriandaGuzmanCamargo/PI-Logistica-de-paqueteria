import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Login ---
import Login from './pages/login';
import RecuperarContrasenaAdmin from './pages/recuperarContrasenaAdmin';

// --- Operador Logístico ---
import DashboardOperador from './pages/operadorLogistico/dashboardOperador';
import DatosPaquete from './pages/operadorLogistico/datosPaquete';
import DetalleEnvio from './pages/operadorLogistico/detalleEnvio';
import EnviosOperador from './pages/operadorLogistico/enviosOperador';
import Incidencias from './pages/operadorLogistico/incidencias';
import MiCuenta from './pages/operadorLogistico/miCuenta';
import RegistrarPaquete from './pages/operadorLogistico/registrarPaquete';

// --- Supervisor ---
import DashboardSupervisor from './pages/supervisor/dashboardSupervisor';
import DetalleEnvioSupervisor from './pages/supervisor/detalleEnvioSupervisor';
import EntregasRepartidorSupervisor from './pages/supervisor/entregasRepartidorSupervisor';
import EnviosSupervisor from './pages/supervisor/enviosSupervisor';
import GestRepartidorSupervisor from './pages/supervisor/gestRepartidorSupervisor';
import IncidenciasSupervisor from './pages/supervisor/incidenciasSupervisor';
import MiCuentaSupervisor from './pages/supervisor/miCuentaSupervisor';
import ResportesSupervisor from './pages/supervisor/resportesSupervisor';
import RutaRepartidorSupervisor from './pages/supervisor/rutaRepartidorSupervisor';

// --- CSS ---
import '../styles/operadorComun.css';
import '../styles/dashboard.css';
import '../styles/enviosOperador.css';
import '../styles/detalleEnvio.css';
import '../styles/incidencias.css';
import '../styles/miCuenta.css';
import '../styles/registrarPaquete.css';
import '../styles/supervisor.css';
import '../styles/reportesSupervisor.css';
import '../styles/stylesLogueo.css';

export default function App() {
  return (
    <Routes>
      {/* Redirigir raíz al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/piWeb" element={<Navigate to="/login" replace />} />
      <Route path="/login.html" element={<Navigate to="/login" replace />} />
      <Route path="/piWeb/login.html" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-contrasena-admin" element={<RecuperarContrasenaAdmin />} />
      <Route path="/recuperacion-contrasena" element={<Navigate to="/recuperar-contrasena-admin" replace />} />
      <Route path="/recuperacionContraseña.html" element={<Navigate to="/recuperar-contrasena-admin" replace />} />

      {/* Operador Logístico */}
      <Route path="/operador/dashboard" element={<DashboardOperador />} />
      <Route path="/piWeb/operador/dashboard" element={<DashboardOperador />} />
      <Route path="/operador/datos-paquete" element={<DatosPaquete />} />
      <Route path="/operador/detalle-envio" element={<DetalleEnvio />} />
      <Route path="/operador/envios" element={<EnviosOperador />} />
      <Route path="/operador/incidencias" element={<Incidencias />} />
      <Route path="/operador/mi-cuenta" element={<MiCuenta />} />
      <Route path="/operador/registrar-paquete" element={<RegistrarPaquete />} />

      {/* Supervisor */}
      <Route path="/supervisor/dashboard" element={<DashboardSupervisor />} />
      <Route path="/piWeb/supervisor/dashboard" element={<DashboardSupervisor />} />
      <Route path="/supervisor/detalle-envio" element={<DetalleEnvioSupervisor />} />
      <Route path="/supervisor/entregas-repartidor" element={<EntregasRepartidorSupervisor />} />
      <Route path="/piWeb/supervisor/entregas-repartidor" element={<EntregasRepartidorSupervisor />} />
      <Route path="/supervisor/envios" element={<EnviosSupervisor />} />
      <Route path="/supervisor/gestion-repartidores" element={<GestRepartidorSupervisor />} />
      <Route path="/supervisor/incidencias" element={<IncidenciasSupervisor />} />
      <Route path="/supervisor/mi-cuenta" element={<MiCuentaSupervisor />} />
      <Route path="/supervisor/reportes" element={<ResportesSupervisor />} />
      <Route path="/supervisor/ruta-repartidor" element={<RutaRepartidorSupervisor />} />
      <Route path="/piWeb/supervisor/ruta-repartidor" element={<RutaRepartidorSupervisor />} />

      {/* Compatibilidad con rutas antiguas .html */}
      <Route path="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" element={<RutaRepartidorSupervisor />} />
      <Route path="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" element={<EntregasRepartidorSupervisor />} />

      {/* Evita pantalla en blanco si la ruta no coincide */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
