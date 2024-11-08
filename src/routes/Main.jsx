import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/userContext"; // Asegúrate de que la ruta sea correcta
import { Carrito } from "../pages/Carrito";
import { CrearMenu } from "../pages/ConfiguracionMenus/CrearMenu";
import { EditarMenu } from "../pages/ConfiguracionMenus/EditarMenu";
import { GestionarMenus } from "../pages/ConfiguracionMenus/GestionarMenus";
import { CrearInsumo } from "../pages/ConfiguracionInsumos/CrearInsumo";
import { EditarInsumo } from "../pages/ConfiguracionInsumos/EditarInsumo";
import { GestionarInsumos } from "../pages/ConfiguracionInsumos/GestionarInsumos";
import { GestionarUsuarios } from "../pages/ConfiguracionUsuarios/GestionarUsuarios";
import { CrearUsuario } from "../pages/ConfiguracionUsuarios/CrearUsuario";
import { EditarUsuario } from "../pages/ConfiguracionUsuarios/EditarUsuario";
import { ConsultarMenu } from "../pages/ConfiguracionMenus/ConsultarMenu";
import { ListarPedidos } from "../pages/ListadoPedidos/ListarPedidos";
import { ResumenPedido } from "../pages/ListadoPedidos/ResumenPedido";
import { PedidosByPersona } from "../pages/Reportes/PedidosByPersona"
import NavbarLayout from "../components/Navbar/NavbarLayout";
import Login from "../pages/Login";
import Registro from "../pages/Registro";

/* PAGES */
import { PedidosPage } from "../pages/PedidosPage";
import { RealizarPedido } from "../pages/RealizarPedido";
import { PedidosByDni } from "../pages/Reportes/PedidosByDni";
import { InsumosPorFecha } from "../pages/Reportes/InsumosPorFecha";

export const Main = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas que no utilizan NavbarLayout */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
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
            
            {/* GESTION DE INSUMOS */}
            <Route path="/GestionarInsumos" element={<GestionarInsumos />} />
            <Route path="/GestionarInsumos/Crear" element={<CrearInsumo />} />
            <Route path="/GestionarInsumos/:id" element={<EditarInsumo />} />
            
            {/* GESTION DE INSUMOS */}
            <Route path="/GestionarUsuarios" element={<GestionarUsuarios />} />
            <Route path="/GestionarUsuarios/Crear" element={<CrearUsuario />} />
            <Route path="/GestionarUsuarios/:id" element={<EditarUsuario />} />

            <Route path="/ConsultarMenu" element={<ConsultarMenu />} />

            {/* SECCION DE REPORTES */ }
            
            <Route path="/PedidosByPersona/:id" element={<PedidosByPersona />} />
            <Route path="/PedidosByDni" element={<PedidosByDni />} />
            <Route path="/VerInsumosPorFecha" element={<InsumosPorFecha />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
