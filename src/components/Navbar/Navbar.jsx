import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext";


export const Navbar = () => {
  const { user } = useUser();
  let location = useLocation();

  return (
    <div className="font-sans text-white bg-gradient-to-r from-orange-400 to-blue-600 px-4 py-3 shadow-md flex items-center justify-between">
      {/* Logo y nombre del usuario */}
      <span className="text-xl font-bold flex items-center">
        <i className="fas fa-clipboard-user me-2"></i> {user ? user.personaDto.nombre + " " +user.personaDto.apellido  : "Invitado"}
      </span>
      
      {/* Grupo de botones alineado a la derecha */}
      <div className="flex space-x-4">
        {/* Botón de Inicio */}
        <Link
          to={'/pedidos'}
          className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <i className="fas fa-home me-2"></i> Inicio
        </Link>

        {/* Botón de Carrito, solo si no está en la ruta del carrito */}
        {location.pathname !== "/RealizarPedido/Carrito" && (
          <Link
            to={'/RealizarPedido/Carrito'}
            className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            <i className="fas fa-shopping-cart me-2"></i> Carrito
          </Link>
        )}
        <Link to={'/login'}>
        <button className="bg-gradient-to-r from-red-500 to-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300">
          <i className="fas fa-sign-out-alt me-2"></i> Salir
        </button>
        </Link>
      </div>
    </div>
  );
};
