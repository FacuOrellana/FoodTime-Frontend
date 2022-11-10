import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Carrito } from '../pages/Carrito';
import { CrearMenu } from '../pages/ConfiguracionMenus/CrearMenu';
import { EditarMenu } from '../pages/ConfiguracionMenus/EditarMenu';
import { GestionarMenus } from '../pages/ConfiguracionMenus/GestionarMenus';
import { ListarPedidos } from '../pages/ListadoPedidos/ListarPedidos';
import { ResumenPedido } from '../pages/ListadoPedidos/ResumenPedido';

/* PAGES */

import { PedidosPage } from '../pages/PedidosPage';
import { RealizarPedido } from '../pages/RealizarPedido';

export const Main = () => {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path='/' element={<PedidosPage />}></Route>
                <Route exact path='/RealizarPedido' element={<RealizarPedido />} />
                <Route exact path='/RealizarPedido/Carrito' element={<Carrito />} />

                {/* GESTION DE PEDIDOS */}

                <Route exact path='/ListarPedido' element={<ListarPedidos />} />
                <Route exact path='/ListarPedido/:id' element={<ResumenPedido />} />

                {/* GESTION DE MENUS */}

                <Route exact path='/GestionarMenus' element={<GestionarMenus />} />
                <Route exact path='/GestionarMenus/Crear' element={<CrearMenu />} />
                <Route exact path='/GestionarMenus/:id' element={<EditarMenu />} />

            </Routes>

        </BrowserRouter>
    )
}