import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import '../FacturaTable/FacturaTable.css';

const FacturaTable = ({ facturaList, setEditId, setCliente, setTotal, setFecha, getFacturas }) => {

  // Función para editar los datos de las facturas
  const editFactura = (factura) => {
    setCliente(factura.cliente);
    setTotal(factura.total);
    setFecha(factura.fecha);
    setEditId(factura.idFactura);
  };

  // Función para borrar factura
  const deleteFactura = (idFactura) => {
    Swal.fire({
      title: 'Eliminar Factura',
      text: '¿Estás seguro que deseas eliminar la factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Sí, eliminar factura!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${idFactura}`)
          .then(response => {
            getFacturas();
            Swal.fire('Operación Exitosa', 'Factura eliminada.', 'success');
          })
          .catch(error => {
            alert("Algo salió mal :/!", error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Acción Cancelada', 'La factura está segura :)', 'error');
      }
    });
  };

  return (
    <div className="lista">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID Factura</th>
            <th scope="col">Cliente</th>
            <th scope="col">Total</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturaList.map((val, key) => (
            <tr key={key}>
              <td>{val.idFactura}</td>
              <td>{val.cliente}</td>
              <td>{val.total}</td>
              <td>{val.fecha}</td>
              <td>
                <button className="btn btn-primary" onClick={() => editFactura(val)}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteFactura(val.idFactura)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturaTable;
