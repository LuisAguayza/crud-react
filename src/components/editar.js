import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      empleado: {
        nombre: "",
        email: "",
      },
    };
    this.cambioValor = this.cambioValor.bind(this);
    this.actualizar = this.actualizar.bind(this);
  }

  cambioValor(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let empleado = { ...this.state.empleado };
    empleado[name] = value;
    this.setState({ empleado });
  }

  actualizar(event) {
    event.preventDefault();
    const { empleado } = this.state;
    fetch(Api + "Empleado/update?id=" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.props.history.push("/");
      })
      .catch(console.log);
  }

  componentDidMount() {
    fetch(Api + "Empleado/list-by-id?id=" + this.props.match.params.id)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.setState({
          datosCargados: true,
          empleado: datos,
        });
      });
  }

  render() {
    const { datosCargados, empleado } = this.state;
    if (!datosCargados) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div className="card">
          <div className="card-header">Editar Empleado</div>
          <div className="card-body">
            <form onSubmit={this.actualizar}>
              <div className="form-group">
                <label>Clave</label>
                <input
                  type="text"
                  readOnly
                  value={empleado.id}
                  className="form-control"
                  name="id"
                  id="id"
                  aria-describedby="helpId"
                />
                <small id="helpId" className="form-text text-muted">
                  Clave
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="form-control"
                  required
                  placeholder=""
                  value={empleado.nombre || ""}
                  onChange={this.cambioValor}
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el nombre del empleado
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  required
                  placeholder=""
                  value={empleado.email || ""}
                  onChange={this.cambioValor}
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el email del empleado
                </small>
              </div>
              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-info">
                  Editar empleado
                </button>
                <Link to={"/"} type="button" className="btn btn-danger">
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}

export default Editar;
