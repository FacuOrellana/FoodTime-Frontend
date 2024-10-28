import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/userContext"; // Asegúrate de que la ruta sea correcta
import { Carrito } from "../pages/Carrito";
import { CrearMenu } from "../pages/ConfiguracionMenus/CrearMenu";
import { EditarMenu } from "../pages/ConfiguracionMenus/EditarMenu";
import { GestionarMenus } from "../pages/ConfiguracionMenus/GestionarMenus";
import { ConsultarMenu } from "../pages/ConfiguracionMenus/ConsultarMenu";
import { ListarPedidos } from "../pages/ListadoPedidos/ListarPedidos";
import { ResumenPedido } from "../pages/ListadoPedidos/ResumenPedido";
import NavbarLayout from "../components/Navbar/NavbarLayout";
import Login from "../pages/Login";

/* PAGES */
import { PedidosPage } from "../pages/PedidosPage";
import { RealizarPedido } from "../pages/RealizarPedido";

export const Main = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas que no utilizan NavbarLayout */}
          <Route path="/login" element={<Login />} />                
          <Route path="/" element={<Login />} />

          {/* Rutas que utilizan NavbarLayout */}
          <Route element={<NavbarLayout />}>
            <Route path="/pedidos" element={<PedidosPage />} />
            <Route path="/RealizarPedido" element={<RealizarPedido />} />
            <Route path="/RealizarPedido/Carrito" element={<Carrito />} />

            {/* GESTION DE PEDIDOS */}
            <Route path="/ListarPedido" element={<ListarPedidos />} />
            <Route path="/ListarPedido/:id" element={<ResumenPedido />} />

            {/* GESTION DE MENUS */}
            <Route path="/GestionarMenus" element={<GestionarMenus />} />
            <Route path="/GestionarMenus/Crear" element={<CrearMenu />} />
            <Route path="/GestionarMenus/:id" element={<EditarMenu />} />

            <Route path="/ConsultarMenu" element={<ConsultarMenu />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
