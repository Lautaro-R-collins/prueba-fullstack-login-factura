import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//componentes
import FormFactura from './components/Formfactura/FormFactura.jsx';
import FacturaTable from './components/FacturaTable/FacturaTable.jsx';
import Header from './components/Header/header.jsx';
import Footer from './components/footer.jsx';
//paginas
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';

function App() {
  const [cliente, setCliente] = useState('');
  const [total, setTotal] = useState('');
  const [fecha, setFecha] = useState('');
  const [editId, setEditId] = useState(null);
  const [facturaList, setFacturas] = useState([]);

  // Función para obtener las facturas
  const getFacturas = () => {
    Axios.get('http://localhost:3001/facturas')
      .then(response => {
        setFacturas(response.data);
      })
      .catch(error => {
        alert("Algo salió mal :/!", error);
      });
  };

  useEffect(() => {
    getFacturas();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/home" element={
            <>
              <FormFactura
                cliente={cliente}
                setCliente={setCliente}
                total={total}
                setTotal={setTotal}
                fecha={fecha}
                setFecha={setFecha}
                editId={editId}
                setEditId={setEditId}
                getFacturas={getFacturas}
                setFacturas={setFacturas} 
              />
              <FacturaTable
                facturaList={facturaList}
                setCliente={setCliente}
                setTotal={setTotal}
                setFecha={setFecha}
                setEditId={setEditId}
                getFacturas={getFacturas}
              />
            </>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
