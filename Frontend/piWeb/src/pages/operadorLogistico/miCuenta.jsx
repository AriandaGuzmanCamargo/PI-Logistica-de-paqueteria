import React, { useEffect, useRef, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import { actualizarFotoPerfilOperador, getPerfilOperador } from '../../services/operadorService';

function formatDate(value) {
  if (!value) return '-';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '-';
  return parsed.toLocaleDateString();
}

function roleText(value) {
  const role = String(value || '').toLowerCase();
  if (role === 'admin') return 'Administrador';
  if (role === 'supervisor') return 'Supervisor';
  if (role === 'operador') return 'Operador Logístico';
  if (role === 'conductor') return 'Conductor';
  if (role === 'cliente') return 'Cliente';
  return value || 'Usuario';
}

export default function MiCuenta() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError('');
        const profileData = await getPerfilOperador();

        if (!mounted) return;
        setPerfil(profileData);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError.message || 'No se pudo cargar el perfil del operador.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Selecciona una imagen válida.');
      setSuccess('');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError('La imagen supera 3 MB. Elige una imagen más ligera.');
      setSuccess('');
      return;
    }

    try {
      setSavingPhoto(true);
      setError('');
      setSuccess('');

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'));
        reader.readAsDataURL(file);
      });

      const updated = await actualizarFotoPerfilOperador(dataUrl);
      setPerfil(updated);
      setSuccess('Foto de perfil actualizada correctamente.');
    } catch (updateError) {
      setError(updateError.message || 'No se pudo actualizar la foto de perfil.');
    } finally {
      setSavingPhoto(false);
    }
  }

  const avatarUrl = perfil?.foto_perfil_url || '/piWeb/images/usuario.png';
  const nombreCompleto = `${perfil?.nombre || ''} ${perfil?.apellido || ''}`.trim() || 'Operador';

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

    <div id="menuContainer" className="menu-overlay"><MenuOperador /></div>
    <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

    <main className="panel-principal panel-principal--full">
      <header className="barra-superior barra-superior--con-logo">
        <div className="barra-superior__left">
          <button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menú">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div className="header-logo">
            <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
          </div>
          <h1 className="barra-superior__titulo">Operador logístico</h1>
        </div>
      </header>

      <h2 className="titulo-pagina-operador">Mi Cuenta</h2>

      <section className="modulo-cuenta">
        <div className="cuenta-fondo-superior"></div>

        <div className="cuenta-perfil-principal">
          <img src={avatarUrl} alt="Foto de perfil" className="cuenta-perfil-principal__avatar" />
          <h2>{loading ? 'Cargando...' : nombreCompleto}</h2>
          <p className="cuenta-perfil-principal__estado">
            <span className="cuenta-perfil-principal__punto"></span>
            {roleText(perfil?.rol)}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          <button
            type="button"
            className="cuenta-perfil-principal__foto-btn"
            onClick={openFilePicker}
            disabled={loading || savingPhoto}
          >
            {savingPhoto ? 'Guardando foto...' : 'Cambiar foto de perfil'}
          </button>
          <p className="cuenta-perfil-principal__hint">Solo puedes editar tu foto de perfil.</p>
        </div>

        <div className="cuenta-datos">
          {error ? <p className="cuenta-feedback cuenta-feedback--error">{error}</p> : null}
          {success ? <p className="cuenta-feedback cuenta-feedback--ok">{success}</p> : null}

          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Nombre:</span>
            <span className="cuenta-datos__valor">{loading ? 'Cargando...' : nombreCompleto}</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Trabajo:</span>
            <span className="cuenta-datos__valor">{loading ? 'Cargando...' : roleText(perfil?.rol)}</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Email:</span>
            <span className="cuenta-datos__valor">{loading ? 'Cargando...' : (perfil?.correo || '-')}</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Teléfono:</span>
            <span className="cuenta-datos__valor">{loading ? 'Cargando...' : (perfil?.telefono || '-')}</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Registro:</span>
            <span className="cuenta-datos__valor">{loading ? 'Cargando...' : formatDate(perfil?.fecha_registro)}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
  );
}
