import { MenuButton } from "../components/MenuButton/MenuButton";
import "./stylesPedidos.css";

export const PedidosPage = () => {

    return (
        <div className="container">
            <MenuButton title={'Hacer un pedido'} link={'/RealizarPedido'} />
            <MenuButton title={'Listar pedidos'} link={'/ListarPedido'} />
            <MenuButton title={'Gestionar Menus'} link={'/GestionarMenus'} />
        </div>
    );
};
