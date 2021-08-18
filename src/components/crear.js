import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";
import axiosFetch from "./axios";

class Crear extends React.Component {
  newEmpleado = {
    nombre: "",
    email: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      empleado: this.newEmpleado,
      errores: [],
    };
    this.cambioValor = this.cambioValor.bind(this);
    this.enviarDatos = this.enviarDatos.bind(this);
  }

  cambioValor(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let empleado = { ...this.state.empleado };
    empleado[name] = value;
    this.setState({ empleado, errores: [] });
  }

  validacion(element) {
    return this.state.errores.indexOf(element) !== -1;
  }

  enviarDatos(event) {
    event.preventDefault();
    const { empleado } = this.state;
    var errores = [];
    if (!empleado.nombre) errores.push("error_nombre");
    if (!empleado.email) errores.push("error_email");

    this.setState({ errores: errores });
    if (errores.length > 0) return false;
    // fetch(Api + "Empleado/save", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(empleado),
    // })

    // .then((respuesta) => respuesta.json())
    // .then((datos) => {
    //   this.props.history.push("/");
    // })
    // .catch(console.log);
    axiosFetch(empleado)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(console.log);
  }
  render() {
    const { empleado } = this.state;
    return (
      <div className="card">
        <div className="card-header">Empleados</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group mt-2">
              <label htmlFor="">Nombre:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                className={
                  (this.validacion("error_nombre") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                value={empleado.nombre || ""}
                onChange={this.cambioValor}
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className={
                  (this.validacion("error_email") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                value={empleado.email || ""}
                onChange={this.cambioValor}
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Escribe el email del empleado
              </small>
            </div>
            <div className="btn-group mt-2" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo empleado
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

export default Crear;
