import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './UpdatePassword.css';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword) {
      setError('Ambos campos son obligatorios');
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('No se encontró un token de sesión');
      return;
    }

    console.log('Token:', token); // Añadir esta línea para depuración

    Axios.put('http://localhost:3001/usuarios/update-password', { oldPassword, newPassword }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data); // Añadir esta línea para depuración
        setSuccess('Contraseña actualizada con éxito');
        setError('');
      })
      .catch(error => {
        console.error('Hubo un error al actualizar la contraseña:', error.response ? error.response.data : error.message); // Mejorar el manejo de errores
        setError('Algo salió mal :/');
        setSuccess('');
      });
  };

  return (
    <div className="update-password-container">
      <h2>Actualizar Contraseña</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <label>
        Contraseña Antigua:
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </label>
      <label>
        Nueva Contraseña:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button type="button" className="btn" onClick={handleUpdatePassword}>Actualizar Contraseña</button>
      <div className="links">
        <Link to="/login">Volver al inicio de sesión</Link>
      </div>
    </div>
  );
};

export default UpdatePassword;
