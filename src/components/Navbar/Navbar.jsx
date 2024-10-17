import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {

    let location = useLocation();

    return (
        <div className="navbar navbar-dark bg-dark px-4">

            <span className="navbar-brand">
                <i className="fas fa-duotone fa-clipboard-user me-2"></i>
                Sebastian E.
            </span>
            <div className="SS">
                <Link to={'/'} className="btn btn-secondary" >
                    <i className="fas fa-yin-yang me-2"></i>
                    <span>Inicio</span>
                </Link>
            </div>

            {location.pathname !== "/RealizarPedido/Carrito" && (
                <Link to={'/RealizarPedido/Carrito'} className="btn btn-secondary">
                    <i className="fas fa-shopping-cart me-2"></i>
                    <span>Carrito</span>
                </Link>
            )}

            <button className="btn btn-outline-danger" >
                <i className="fas fa-sign-out-alt me-2"></i>
                <span>Salir</span>
            </button>
            
        </div>
    );
};