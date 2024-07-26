const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'factura'  
});

// Conéctate a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    process.exit(1);
  }
  console.log('Conexión establecida con la base de datos.');
});

// Secreto para JWT
const JWT_SECRET = 'prueba_de_ingreso';

// Actualizar contraseña
router.put('/update-password',
  body('oldPassword').notEmpty().withMessage('La contraseña antigua es obligatoria'),
  body('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ error: 'Token de sesión no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = decoded.id;

      console.log('ID de usuario:', userId); 

      const selectQuery = 'SELECT password FROM usuario WHERE idUsuario = ?';
      db.query(selectQuery, [userId], (err, results) => {
        if (err) {
          console.error('Error al verificar la contraseña antigua:', err);
          return res.status(500).json({ error: 'Error del servidor' });
        }

        console.log('Contraseña actual:', results.length > 0 ? results[0].password : 'No encontrado'); 

        if (results.length === 0 || results[0].password !== oldPassword) {
          return res.status(401).json({ error: 'Contraseña antigua incorrecta' });
        }

        const updateQuery = 'UPDATE usuario SET password = ? WHERE idUsuario = ?';
        db.query(updateQuery, [newPassword, userId], (err, results) => {
          if (err) {
            console.error('Error al actualizar la contraseña:', err);
            return res.status(500).json({ error: 'Error del servidor' });
          }

          res.status(200).json({ message: 'Contraseña actualizada con éxito' });
        });
      });
    } catch (err) {
      console.error('Error al verificar el token:', err);
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
);

module.exports = router;