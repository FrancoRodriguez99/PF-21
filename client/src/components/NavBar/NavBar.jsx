import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } = useAuth0();

  return (
    <div id="navBar_general_container">
      <Link to="/">Inicio</Link>
      <Link to="/cart">Carro de Compras</Link>
      <Link to="addItem">Añadir Item</Link>

      {isLoading ? (
        "Cargando"
      ) : isAuthenticated ? (
        <div>
          Hola {user.name}! <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
}
