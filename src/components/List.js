import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: false, empleados: [] };
  }

  cargarDatos() {
    fetch(Api + "Empleado/listAll")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.setState({ datosCargados: true, empleados: datos });
      })
      .catch(console.log);
  }

  eliminarRegistro = (id) => {
    fetch(Api + "Empleado/delete?id=" + id, {
      method: "DELETE",
    })
      .then(() => {
        this.cargarDatos();
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { datosCargados, empleados } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-success" to={"/crear"}>
              Agregar Nuevo Empleado
            </Link>
          </div>
          <div className="card-body">
            <h4>Lista de Empleados</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.email}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link
                          className="btn btn-warning"
                          to={"/editar/" + empleado.id}
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.eliminarRegistro(empleado.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}

export default List;
