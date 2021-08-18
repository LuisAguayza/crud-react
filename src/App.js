import "./App.css";

import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import List from "./components/List";
import Crear from "./components/crear";
import Editar from "./components/editar";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="navbar-brand" to={"/"}>
            Sistema
          </Link>
          <Link className="navbar-brand" to={"/crear"}>
            Crear Empleado
          </Link>
        </div>
      </nav>
      <div className="container">
        <br></br>
        <Route exact path="/" component={List}></Route>
        <Route exact path="/crear" component={Crear}></Route>
        <Route exact path="/editar/:id" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default App;
