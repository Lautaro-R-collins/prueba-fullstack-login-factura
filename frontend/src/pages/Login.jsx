import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!usuario || !password) {
      setError("Usuario y contraseña no pueden estar vacíos");
      return;
    }

    Axios.post('http://localhost:3001/usuarios/login', { username: usuario, password })
      .then(response => {
        if (response.data.message === 'Inicio de sesión exitoso') {
          // Guarda el token
          sessionStorage.setItem('token', response.data.token);
          navigate('/home');
        } else {
          setError("Credenciales incorrectas");
        }
      })
      .catch(error => {
        console.error("Hubo un error al iniciar sesión:", error);
        setError("Algo salió mal :/");
      });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <label>
        Usuario :
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </label>
      {error && !usuario && <p className="error-message">El usuario no puede estar vacío</p>}
      <label>
        Contraseña :
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && !password && <p className="error-message">La contraseña no puede estar vacía</p>}
      <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
      {error && usuario && password && <p className="error-message">{error}</p>}
      <div className="links">
        <Link to="/register">Registrarse</Link>
        <Link to="/update-password">Actualizar Clave</Link>
      </div>
    </div>
  );
};

export default Login;
