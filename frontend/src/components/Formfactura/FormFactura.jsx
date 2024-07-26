import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import './FormFactura.css';

const FormFactura = ({ cliente, setCliente, total, setTotal, fecha, setFecha, editId, setEditId, getFacturas, setFacturas }) => {
  
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const clearForm = () => {
    setCliente('');
    setTotal('');
    setFecha('');
    setEditId(null);
  };

  const add = () => {
    if (editId === null) {
      Axios.post('http://localhost:3001/create', {
        cliente,
        total,
        fecha
      })
      .then(response => {
        getFacturas();
        clearForm();
        Swal.fire('Bien Hecho', 'Factura Agregada Con Éxito', 'success');
      })
      .catch(error => {
        Swal.fire('Por Favor', 'comlpeta todos los campos!', 'error');
      });
    } else {
      updateFactura(editId);
    }
  };

  const updateFactura = (idFactura) => {
    Axios.put('http://localhost:3001/update', {
      idFactura,
      cliente,
      total,
      fecha
    })
    .then(response => {
      getFacturas();
      clearForm();
      Swal.fire('Bien Hecho!', 'Factura Actualizada Con Éxito!', 'success');
    })
    .catch(error => {
      Swal.fire('Error', 'Algo salió mal :/!', 'error');
    });
  };

  return (
    <div className="card-body">
      <div className="container">
        <label>
          Cliente:
          <input
            type="text"
            name="cliente"
            placeholder="Ingrese el nombre del cliente"
            value={cliente}
            onChange={handleChange(setCliente)}
          />
        </label>
        <label>
          Total:
          <input
            type="text"
            name="total"
            placeholder="Ingrese el total de la factura"
            value={total}
            onChange={handleChange(setTotal)}
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            placeholder="Ingrese la fecha de la factura"
            value={fecha}
            onChange={handleChange(setFecha)}
          />
        </label>
      </div>
      <button className="btn btn-success" onClick={add}>
        {editId ? 'Actualizar Factura' : 'Registrar Factura'}
      </button>
    </div>
  );
};

export default FormFactura;
