import React, { useEffect, useMemo, useRef, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  actualizarPerfilSupervisor,
  cambiarContrasenaSupervisor,
  cambiarContrasenaUsuarioPorAdmin,
  eliminarUsuarioGestionPorAdmin,
  crearUsuarioGestionPorAdmin,
  getPerfilSupervisor,
  getUsuariosGestionAdmin,
  getWebUser,
} from '../../services/supervisorService';

const ESTADOS_MX = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'CDMX',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

function userDisplayRole(rol) {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'supervisor') return 'Supervisor';
  if (rol === 'operador') return 'Operador';
  if (rol === 'conductor') return 'Conductor';
  return 'Usuario';
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('No se pudo procesar la imagen.'));
    image.src = dataUrl;
  });
}

async function compressImage(file) {
  const dataUrl = await fileToDataUrl(file);
  const image = await loadImage(dataUrl);

  const maxSize = 720;
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('No se pudo crear el canvas para comprimir imagen.');
  }

  context.drawImage(image, 0, 0, width, height);

  let quality = 0.82;
  let output = canvas.toDataURL('image/jpeg', quality);
  const maxLength = 1_100_000;

  while (output.length > maxLength && quality > 0.45) {
    quality -= 0.1;
    output = canvas.toDataURL('image/jpeg', quality);
  }

  return output;
}

export default function MiCuentaSupervisor() {
  const currentUser = getWebUser();
  const isAdmin = currentUser?.rol === 'admin';

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const [perfil, setPerfil] = useState(null);
  const [formPerfil, setFormPerfil] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    ciudad: '',
    foto_perfil_url: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    contrasenaActual: '',
    nuevaContrasena: '',
    confirmarContrasena: '',
  });

  const [adminUsers, setAdminUsers] = useState([]);
  const [adminRoleFilter, setAdminRoleFilter] = useState('todos');
  const [selectedManagedUserId, setSelectedManagedUserId] = useState('');
  const [managedPasswordForm, setManagedPasswordForm] = useState({
    nuevaContrasena: '',
    confirmarContrasena: '',
  });
  const [savingManagedPassword, setSavingManagedPassword] = useState(false);
  const [deletingManagedUser, setDeletingManagedUser] = useState(false);
  const [savingCreateUser, setSavingCreateUser] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    rol: 'operador',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    ciudad: '',
    contrasena: '',
    confirmarContrasena: '',
    licencia: '',
    tipo_licencia: 'B',
    fecha_contratacion: '',
  });

  function showToast(type, text) {
    setToast({ type, text });

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3200);
  }

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadProfileData() {
      try {
        setLoading(true);

        const profileData = await getPerfilSupervisor();
        if (!mounted) return;

        setPerfil(profileData);
        setFormPerfil({
          nombre: profileData.nombre || '',
          apellido: profileData.apellido || '',
          correo: profileData.correo || '',
          telefono: profileData.telefono || '',
          ciudad: profileData.ciudad || '',
          foto_perfil_url: profileData.foto_perfil_url || '',
        });

        if (isAdmin) {
          const users = await getUsuariosGestionAdmin(adminRoleFilter === 'todos' ? 'todos' : adminRoleFilter);
          if (!mounted) return;
          setAdminUsers(users);
          if (users.length > 0) {
            setSelectedManagedUserId(String(users[0].id_usuario));
          } else {
            setSelectedManagedUserId('');
          }
        }
      } catch (loadError) {
        if (!mounted) return;
        showToast('error', loadError.message || 'No se pudo cargar la informacion de perfil.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfileData();

    return () => {
      mounted = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    let mounted = true;

    async function reloadManagedUsers() {
      if (!isAdmin) return;

      try {
        const users = await getUsuariosGestionAdmin(adminRoleFilter === 'todos' ? 'todos' : adminRoleFilter);
        if (!mounted) return;
        setAdminUsers(users);
        if (users.length > 0) {
          setSelectedManagedUserId(String(users[0].id_usuario));
        } else {
          setSelectedManagedUserId('');
        }
      } catch (loadError) {
        if (!mounted) return;
        showToast('error', loadError.message || 'No se pudieron cargar los usuarios gestionables.');
      }
    }

    reloadManagedUsers();

    return () => {
      mounted = false;
    };
  }, [isAdmin, adminRoleFilter]);

  const selectedManagedUser = useMemo(() => {
    if (!selectedManagedUserId) return null;
    return adminUsers.find((user) => String(user.id_usuario) === String(selectedManagedUserId)) || null;
  }, [adminUsers, selectedManagedUserId]);

  async function reloadAdminUsersWithFilter(roleValue) {
    if (!isAdmin) return;

    const role = roleValue === 'todos' ? 'todos' : roleValue;
    const users = await getUsuariosGestionAdmin(role);
    setAdminUsers(users);
    if (users.length > 0) {
      setSelectedManagedUserId(String(users[0].id_usuario));
    } else {
      setSelectedManagedUserId('');
    }
  }

  function clearFeedback() {
    // Intencionalmente vacio: ahora el feedback se muestra con alertas.
  }

  async function handleUpdateProfile(event) {
    event.preventDefault();

    try {
      clearFeedback();
      setSavingProfile(true);

      const updated = await actualizarPerfilSupervisor(formPerfil);
      setPerfil(updated);
      showToast('ok', 'Perfil actualizado correctamente.');
    } catch (updateError) {
      showToast('error', updateError.message || 'No se pudo actualizar el perfil.');
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleChangeOwnPassword(event) {
    event.preventDefault();

    try {
      clearFeedback();
      setSavingPassword(true);

      await cambiarContrasenaSupervisor(passwordForm);
      setPasswordForm({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: '',
      });
      showToast('ok', 'Contraseña actualizada correctamente.');
    } catch (passwordError) {
      showToast('error', passwordError.message || 'No se pudo actualizar la contraseña.');
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleAdminChangePassword(event) {
    event.preventDefault();

    if (!selectedManagedUser) {
      return;
    }

    try {
      clearFeedback();
      setSavingManagedPassword(true);

      await cambiarContrasenaUsuarioPorAdmin({
        idUsuario: selectedManagedUser.id_usuario,
        nuevaContrasena: managedPasswordForm.nuevaContrasena,
        confirmarContrasena: managedPasswordForm.confirmarContrasena,
      });

      setManagedPasswordForm({
        nuevaContrasena: '',
        confirmarContrasena: '',
      });

      showToast('ok', `Contraseña actualizada para ${selectedManagedUser.nombre} ${selectedManagedUser.apellido}.`);
    } catch (adminPasswordError) {
      showToast('error', adminPasswordError.message || 'No se pudo cambiar la contraseña del usuario.');
    } finally {
      setSavingManagedPassword(false);
    }
  }

  async function handlePhotoFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      clearFeedback();
      const content = await compressImage(file);

      setFormPerfil((prev) => ({
        ...prev,
        foto_perfil_url: content,
      }));

      showToast('ok', 'Imagen preparada correctamente. Guarda perfil para aplicar cambios.');
    } catch (imageError) {
      showToast('error', imageError.message || 'No se pudo procesar la imágen seleccionada.');
    }
  }

  async function handleCreateManagedUser(event) {
    event.preventDefault();

    try {
      clearFeedback();
      setSavingCreateUser(true);

      const created = await crearUsuarioGestionPorAdmin(createUserForm);

      setCreateUserForm({
        rol: 'operador',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        ciudad: '',
        contrasena: '',
        confirmarContrasena: '',
        licencia: '',
        tipo_licencia: 'B',
        fecha_contratacion: '',
      });

      setAdminRoleFilter('todos');
      await reloadAdminUsersWithFilter('todos');
      setSelectedManagedUserId(String(created.id_usuario));

      showToast('ok', `Usuario ${created.rol} creado correctamente.`);
    } catch (createError) {
      showToast('error', createError.message || 'No se pudo crear el usuario.');
    } finally {
      setSavingCreateUser(false);
    }
  }

  async function handleDeleteManagedUser() {
    if (!selectedManagedUser) {
      return;
    }

    const fullName = `${selectedManagedUser.nombre || ''} ${selectedManagedUser.apellido || ''}`.trim();
    const confirmed = window.confirm(
      `Se eliminara el usuario ${fullName || selectedManagedUser.correo}. Esta acción lo dejara inactivo. ¿Deseas continuar?`
    );

    if (!confirmed) {
      return;
    }

    try {
      clearFeedback();
      setDeletingManagedUser(true);

      await eliminarUsuarioGestionPorAdmin(selectedManagedUser.id_usuario);

      await reloadAdminUsersWithFilter(adminRoleFilter);
      setManagedPasswordForm({
        nuevaContrasena: '',
        confirmarContrasena: '',
      });

      showToast('ok', `Usuario ${fullName || selectedManagedUser.correo} eliminado correctamente.`);
    } catch (deleteError) {
      showToast('error', deleteError.message || 'No se pudo eliminar el usuario.');
    } finally {
      setDeletingManagedUser(false);
    }
  }

  const avatarUrl = formPerfil.foto_perfil_url || perfil?.foto_perfil_url || '/piWeb/images/usuario.png';

  return (
    <>
      <style>{`
        .perfil-page {
          max-width: 1220px;
          margin: 0 auto;
          padding: 24px 18px 36px;
        }
        .perfil-top {
          display: grid;
          grid-template-columns: minmax(320px, 380px) 1fr;
          gap: 18px;
          align-items: stretch;
        }
        .perfil-card-pro,
        .perfil-panel-pro {
          background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(243,247,255,0.96));
          border: 1px solid #d8e2fa;
          border-radius: 18px;
          box-shadow: 0 12px 32px rgba(38,67,115,0.12);
        }
        .perfil-card-pro {
          padding: 18px;
          position: sticky;
          top: 88px;
          height: fit-content;
        }
        .perfil-avatar-big {
          width: 132px;
          height: 132px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          margin: 0 auto 10px;
          border: 5px solid #fff;
          box-shadow: 0 8px 22px rgba(37,61,107,0.28);
        }
        .perfil-name {
          margin: 0;
          text-align: center;
          color: #1b2f56;
          font-size: 31px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .perfil-role {
          margin: 6px 0 14px;
          text-align: center;
          color: #49628f;
          font-size: 17px;
          font-weight: 700;
        }
        .perfil-role .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          background: #4caf50;
          margin-right: 7px;
        }
        .perfil-mini-meta {
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #d6e0f8;
          border-radius: 12px;
          background: #f5f8ff;
        }
        .perfil-mini-meta p {
          margin: 6px 0;
          color: #354b75;
          font-size: 14px;
        }
        .perfil-panel-pro {
          padding: 16px;
        }
        .perfil-section {
          border: 1px solid #d7e1f8;
          border-radius: 14px;
          padding: 14px;
          background: #ffffff;
          margin-bottom: 14px;
        }
        .perfil-section h3 {
          margin: 0 0 10px;
          font-size: 18px;
          color: #1f3660;
        }
        .perfil-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .perfil-input {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .perfil-input label {
          color: #49628f;
          font-size: 12px;
          font-weight: 700;
        }
        .perfil-input input,
        .perfil-input select {
          border: 1px solid #cfdcf9;
          border-radius: 9px;
          padding: 10px 12px;
          font-size: 14px;
          color: #1f335d;
          background: #f8faff;
          outline: none;
        }
        .perfil-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .btn-main,
        .btn-alt {
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn-main {
          background: linear-gradient(135deg, #1a2d50, #3b6aaa);
          color: #fff;
        }
        .btn-alt {
          border-color: #c8d7f8;
          background: #f4f8ff;
          color: #32568f;
        }
        .admin-grid {
          display: grid;
          grid-template-columns: minmax(260px, 320px) 1fr;
          gap: 12px;
        }
        .admin-list {
          border: 1px solid #d4dff9;
          border-radius: 12px;
          max-height: 360px;
          overflow: auto;
          background: #f9fbff;
        }
        .admin-user {
          padding: 10px;
          border-bottom: 1px solid #e4ecfb;
          cursor: pointer;
        }
        .admin-user.active {
          background: #eaf1ff;
        }
        .admin-user__name {
          font-size: 14px;
          font-weight: 700;
          color: #1f3966;
          margin: 0 0 2px;
        }
        .admin-user__meta {
          font-size: 12px;
          color: #59739f;
          margin: 0;
        }
        .toast-wrap {
          position: fixed;
          right: 18px;
          top: 86px;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .toast {
          min-width: 300px;
          max-width: 420px;
          border-radius: 11px;
          padding: 12px 14px;
          box-shadow: 0 10px 24px rgba(27, 48, 86, 0.22);
          border: 1px solid transparent;
          font-size: 14px;
          font-weight: 700;
          animation: toastIn 0.18s ease-out;
        }
        .toast--ok {
          background: #ecfff1;
          color: #1d7a43;
          border-color: #bdeccc;
        }
        .toast--error {
          background: #fff0f2;
          color: #b4232f;
          border-color: #f7c6cf;
        }
        @keyframes toastIn {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .perfil-note-ok {
          color: #1c7a41;
          font-size: 13px;
          font-weight: 700;
        }
        .perfil-note-error {
          color: #b4232f;
          font-size: 13px;
          font-weight: 700;
        }
        @media (max-width: 980px) {
          .perfil-top { grid-template-columns: 1fr; }
          .perfil-card-pro { position: static; }
          .admin-grid { grid-template-columns: 1fr; }
          .perfil-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="tablero-operador tablero-operador--sin-sidebar">
        {toast ? (
          <div className="toast-wrap">
            <div className={`toast ${toast.type === 'ok' ? 'toast--ok' : 'toast--error'}`}>
              {toast.text}
            </div>
          </div>
        ) : null}
        <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
        <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

        <main className="panel-principal panel-principal--full panel-principal--supervisor">
          <header className="barra-superior barra-superior--con-logo barra-superior--supervisor-fija">
            <div className="barra-superior__left">
              <button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menu">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
              <div className="header-logo">
                <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
              </div>
              <h1 className="barra-superior__titulo">Supervisor</h1>
            </div>
          </header>

          <section className="perfil-page">
            {loading ? <p style={{ color: '#5a6d8a' }}>Cargando perfil...</p> : null}

            {!loading && perfil ? (
              <div className="perfil-top">
                <aside className="perfil-card-pro">
                  <img src={avatarUrl} alt="Avatar" className="perfil-avatar-big" />
                  <h2 className="perfil-name">{`${perfil.nombre || ''} ${perfil.apellido || ''}`.trim()}</h2>
                  <p className="perfil-role"><span className="dot"></span>{userDisplayRole(perfil.rol)}</p>

                  <div className="perfil-mini-meta">
                    <p><strong>Correo:</strong> {perfil.correo || '-'}</p>
                    <p><strong>Teléfono:</strong> {perfil.telefono || '-'}</p>
                    <p><strong>Ciudad:</strong> {perfil.ciudad || '-'}</p>
                    <p><strong>Registro:</strong> {perfil.fecha_registro ? new Date(perfil.fecha_registro).toLocaleDateString() : '-'}</p>
                  </div>
                </aside>

                <div className="perfil-panel-pro">
                  <section className="perfil-section">
                    <h3>Editar perfil</h3>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="perfil-form-grid">
                        <div className="perfil-input">
                          <label>Nombre</label>
                          <input
                            value={formPerfil.nombre}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, nombre: event.target.value }))}
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Apellido</label>
                          <input
                            value={formPerfil.apellido}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, apellido: event.target.value }))}
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Correo</label>
                          <input
                            value={formPerfil.correo}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, correo: event.target.value }))}
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Teléfono</label>
                          <input
                            value={formPerfil.telefono}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, telefono: event.target.value }))}
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Estado</label>
                          <select
                            value={formPerfil.ciudad}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, ciudad: event.target.value }))}
                          >
                            <option value="">Selecciona un estado...</option>
                            {ESTADOS_MX.map((estado) => (
                              <option key={estado} value={estado}>{estado}</option>
                            ))}
                          </select>
                        </div>
                        <div className="perfil-input">
                          <label>Foto de perfil (URL)</label>
                          <input
                            value={formPerfil.foto_perfil_url}
                            onChange={(event) => setFormPerfil((prev) => ({ ...prev, foto_perfil_url: event.target.value }))}
                            placeholder="https://... o carga una imagen"
                          />
                        </div>
                      </div>

                      <div className="perfil-actions">
                        <input type="file" accept="image/*" onChange={handlePhotoFile} />
                        <button type="submit" className="btn-main" disabled={savingProfile}>
                          {savingProfile ? 'Guardando...' : 'Guardar perfil'}
                        </button>
                      </div>
                    </form>
                  </section>

                  <section className="perfil-section">
                    <h3>Cambiar mi contraseña</h3>
                    <form onSubmit={handleChangeOwnPassword}>
                      <div className="perfil-form-grid">
                        <div className="perfil-input">
                          <label>Contraseña actual</label>
                          <input
                            type="password"
                            value={passwordForm.contrasenaActual}
                            onChange={(event) =>
                              setPasswordForm((prev) => ({ ...prev, contrasenaActual: event.target.value }))
                            }
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Nueva contraseña</label>
                          <input
                            type="password"
                            value={passwordForm.nuevaContrasena}
                            onChange={(event) =>
                              setPasswordForm((prev) => ({ ...prev, nuevaContrasena: event.target.value }))
                            }
                          />
                        </div>
                        <div className="perfil-input">
                          <label>Confirmar contraseña</label>
                          <input
                            type="password"
                            value={passwordForm.confirmarContrasena}
                            onChange={(event) =>
                              setPasswordForm((prev) => ({ ...prev, confirmarContrasena: event.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <div className="perfil-actions">
                        <button type="submit" className="btn-main" disabled={savingPassword}>
                          {savingPassword ? 'Actualizando...' : 'Actualizar contraseña'}
                        </button>
                      </div>
                    </form>
                  </section>

                  {isAdmin ? (
                    <section className="perfil-section">
                      <h3>Gestión de perfiles (Operadores y Conductores)</h3>

                      <form onSubmit={handleCreateManagedUser} style={{ marginBottom: '12px' }}>
                        <div className="perfil-form-grid">
                          <div className="perfil-input">
                            <label>Rol nuevo</label>
                            <select
                              value={createUserForm.rol}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, rol: event.target.value }))
                              }
                            >
                              <option value="operador">Operador</option>
                              <option value="conductor">Conductor</option>
                            </select>
                          </div>
                          <div className="perfil-input">
                            <label>Nombre</label>
                            <input
                              value={createUserForm.nombre}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, nombre: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="perfil-input">
                            <label>Apellido</label>
                            <input
                              value={createUserForm.apellido}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, apellido: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="perfil-input">
                            <label>Correo</label>
                            <input
                              type="email"
                              value={createUserForm.correo}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, correo: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="perfil-input">
                            <label>Teléfono</label>
                            <input
                              value={createUserForm.telefono}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, telefono: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="perfil-input">
                            <label>Estado</label>
                            <select
                              value={createUserForm.ciudad}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, ciudad: event.target.value }))
                              }
                              required
                            >
                              <option value="">Selecciona un estado...</option>
                              {ESTADOS_MX.map((estado) => (
                                <option key={estado} value={estado}>{estado}</option>
                              ))}
                            </select>
                          </div>
                          <div className="perfil-input">
                            <label>Contraseña</label>
                            <input
                              type="password"
                              value={createUserForm.contrasena}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, contrasena: event.target.value }))
                              }
                              required
                            />
                          </div>
                          <div className="perfil-input">
                            <label>Confirmar contraseña</label>
                            <input
                              type="password"
                              value={createUserForm.confirmarContrasena}
                              onChange={(event) =>
                                setCreateUserForm((prev) => ({ ...prev, confirmarContrasena: event.target.value }))
                              }
                              required
                            />
                          </div>
                          {createUserForm.rol === 'conductor' ? (
                            <>
                              <div className="perfil-input">
                                <label>Licencia</label>
                                <input
                                  value={createUserForm.licencia}
                                  onChange={(event) =>
                                    setCreateUserForm((prev) => ({ ...prev, licencia: event.target.value }))
                                  }
                                  required
                                />
                              </div>
                              <div className="perfil-input">
                                <label>Tipo de licencia</label>
                                <select
                                  value={createUserForm.tipo_licencia}
                                  onChange={(event) =>
                                    setCreateUserForm((prev) => ({ ...prev, tipo_licencia: event.target.value }))
                                  }
                                >
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                </select>
                              </div>
                              <div className="perfil-input">
                                <label>Fecha de contratacion</label>
                                <input
                                  type="date"
                                  value={createUserForm.fecha_contratacion}
                                  onChange={(event) =>
                                    setCreateUserForm((prev) => ({ ...prev, fecha_contratacion: event.target.value }))
                                  }
                                  required
                                />
                              </div>
                            </>
                          ) : null}
                        </div>

                        <div className="perfil-actions">
                          <button type="submit" className="btn-main" disabled={savingCreateUser}>
                            {savingCreateUser ? 'Creando...' : 'Agregar usuario'}
                          </button>
                        </div>
                      </form>

                      <div className="perfil-actions" style={{ marginBottom: '8px' }}>
                        <select
                          value={adminRoleFilter}
                          onChange={(event) => setAdminRoleFilter(event.target.value)}
                        >
                          <option value="todos">Todos</option>
                          <option value="operador">Operadores</option>
                          <option value="conductor">Conductores</option>
                        </select>
                      </div>

                      <div className="admin-grid">
                        <div className="admin-list">
                          {adminUsers.length === 0 ? (
                            <p style={{ padding: '10px', color: '#6679a2' }}>No hay usuarios para mostrar.</p>
                          ) : (
                            adminUsers.map((user) => (
                              <div
                                key={user.id_usuario}
                                className={`admin-user ${String(user.id_usuario) === String(selectedManagedUserId) ? 'active' : ''}`}
                                onClick={() => setSelectedManagedUserId(String(user.id_usuario))}
                              >
                                <p className="admin-user__name">{`${user.nombre} ${user.apellido}`.trim()}</p>
                                <p className="admin-user__meta">{user.rol} · {user.correo}</p>
                              </div>
                            ))
                          )}
                        </div>

                        <div>
                          {selectedManagedUser ? (
                            <>
                              <div className="perfil-mini-meta" style={{ marginBottom: '10px' }}>
                                <p><strong>Nombre:</strong> {`${selectedManagedUser.nombre} ${selectedManagedUser.apellido}`}</p>
                                <p><strong>Rol:</strong> {userDisplayRole(selectedManagedUser.rol)}</p>
                                <p><strong>Correo:</strong> {selectedManagedUser.correo || '-'}</p>
                                <p><strong>Teléfono:</strong> {selectedManagedUser.telefono || '-'}</p>
                                <p><strong>Ciudad:</strong> {selectedManagedUser.ciudad || '-'}</p>
                                <p><strong>Contraseña actual:</strong> {selectedManagedUser.contrasena || '-'}</p>
                              </div>

                              <form onSubmit={handleAdminChangePassword}>
                                <div className="perfil-form-grid">
                                  <div className="perfil-input">
                                    <label>Nueva contraseña del usuario</label>
                                    <input
                                      type="password"
                                      value={managedPasswordForm.nuevaContrasena}
                                      onChange={(event) =>
                                        setManagedPasswordForm((prev) => ({ ...prev, nuevaContrasena: event.target.value }))
                                      }
                                    />
                                  </div>
                                  <div className="perfil-input">
                                    <label>Confirmar contraseña</label>
                                    <input
                                      type="password"
                                      value={managedPasswordForm.confirmarContrasena}
                                      onChange={(event) =>
                                        setManagedPasswordForm((prev) => ({ ...prev, confirmarContrasena: event.target.value }))
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="perfil-actions">
                                  <button type="submit" className="btn-main" disabled={savingManagedPassword}>
                                    {savingManagedPassword ? 'Guardando...' : 'Cambiar contraseña del usuario'}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-alt"
                                    disabled={deletingManagedUser}
                                    onClick={handleDeleteManagedUser}
                                    style={{ borderColor: '#f3b4bd', color: '#b4232f', background: '#fff5f6' }}
                                  >
                                    {deletingManagedUser ? 'Eliminando...' : 'Eliminar usuario'}
                                  </button>
                                </div>
                              </form>
                            </>
                          ) : (
                            <p style={{ color: '#61789e' }}>Selecciona un operador o conductor para ver su perfil.</p>
                          )}
                        </div>
                      </div>
                    </section>
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </>
  );
}
