const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

// CORS para permitir solicitudes
app.use(cors());
app.use(express.json());

// conexion a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'factura'
});

// Conectarse a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    process.exit(1);
  }
  console.log('Conexión establecida con la base de datos.');
});

// rutas de usuario
const userRoutes = require('./userRoutes'); 
app.use('/usuarios', userRoutes);

// Endpoint para crear una nueva factura
app.post('/create', (req, res) => {
  const { cliente, total, fecha } = req.body; 

  // Inserta datos de la factura en la base de datos
  db.query('INSERT INTO factura (cliente, total, fecha) VALUES (?, ?, ?)', 
    [cliente, total, fecha], 
    (err, result) => {
      if (err) {
        console.log(err); 
        res.status(500).send(err); 
      } else {
        res.send("Factura registrada exitosamente"); 
      }
    }
  );
});

// Endpoint para recuperar todas las facturas
app.get('/facturas', (req, res) => {
  // Consulta todas las facturas en la base de datos
  db.query('SELECT * FROM factura', (err, result) => {
    if (err) {
      console.log(err); 
      res.status(500).send(err); 
    } else {
      res.send(result); 
    }
  });
});

// Endpoint para actualizar una factura existente
app.put('/update', (req, res) => {
  // Extraer los datos de la solicitud
  const { idFactura, cliente, total, fecha } = req.body;

  // Actualiza los datos de la factura en la base de datos
  db.query('UPDATE factura SET cliente = ?, total = ?, fecha = ? WHERE idFactura = ?', 
    [cliente, total, fecha, idFactura], 
    (err, result) => {
      if (err) {
        console.log(err); 
        res.status(500).send(err); 
      } else {
        res.send("Factura actualizada exitosamente"); 
      }
    }
  );
});

// Endpoint para eliminar una factura por su ID
app.delete('/delete/:idFactura', (req, res) => {
  // extraer idde la factura de la solicitud
  const idFactura = req.params.idFactura; 

  // Elimina la factura de la base de datos
  db.query('DELETE FROM factura WHERE idFactura = ?', [idFactura], (err, result) => {
    if (err) {
      console.log(err); 
      res.status(500).send(err); 
    } else {
      res.send("Factura eliminada exitosamente"); 
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
