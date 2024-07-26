import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Register.css';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!usuario || !password || !nombre) {
      setError("Todos los campos son obligatorios");
      return;
    }

    Axios.post('http://localhost:3001/usuarios/create', { username: usuario, password, nombre })
      .then(response => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          setError("Hubo un problema con el registro");
        }
      })
      .catch(error => {
        console.error("Hubo un error al registrarse:", error);
        setError("Algo salió mal :/");
      });
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <label>
        Nombre :
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Usuario :
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </label>
      <label>
        Contraseña :
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn btn-success" onClick={handleRegister}>Registrarse</button>
      {error && <p className="error-message">{error}</p>}
      <div className="links">
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default Register;
