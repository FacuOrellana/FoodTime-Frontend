import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTitles } from "../components/PageTitles/PageTitles";
import { TableForCarrito } from "../components/Tables/TableForCarrito";
import { carritoCompras } from "../db/datosPrueba";
import { getCarritoConfirmacionMsg } from "../utils/messages";
import { getTotalArticulos, getTotalPedido } from "../utils/selector";
import { useUser } from "../context/userContext";
import { format } from 'date-fns';

export const Carrito = ({ history }) => {
  const [totalPedido, setTotalPedido] = useState(0);
  const [totalArticulos, setTotalArticulos] = useState(0);
  const [lineasPedidos, setLineasPedidos] = useState([]);
  const [pedido, setPedido] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    setTotalPedido(getTotalPedido(carritoCompras));
    setTotalArticulos(getTotalArticulos(carritoCompras));
    let menuItems = localStorage.getItem("lineaPedido") || "[]";
    menuItems = JSON.parse(menuItems);
    setLineasPedidos(menuItems);

    let articulosTotales = 0;
    let total = 0;
    menuItems.forEach((item) => {
      total += item.precio * item.cantidad;
      articulosTotales += item.cantidad;
    });
    setTotalArticulos(articulosTotales);
    setTotalPedido(total);
  }, []);

  const confirmOrderCarrito = () => {
    let menuItems = JSON.parse(localStorage.getItem("lineaPedido") || "[]");
    let arrayBack = menuItems.map((elemento) => ({
      id: null,
      pedidoId: null,
      menuId: elemento.id,
      cantidad: elemento.cantidad,
    }));

    const idPersona = user?.personaDto?.id;

    const d1 = new Date();
  d1.setMinutes(d1.getMinutes() + 30);
  const tiempoEntrega = format(d1, "yyyy-MM-dd HH:mm:ss");

    let pedidoDto = {
      id: null,
      tiempoEntrega: tiempoEntrega,
      metodoPago: "EFECTIVO",
      total: totalPedido,
      personaId: idPersona,
      pedidoMenuList: arrayBack,
      estadoPedido: "PENDIENTE"
    };

    console.log(pedidoDto);
    setPedido(pedidoDto);
    getCarritoConfirmacionMsg(pedidoDto);
    clearCarrito();
  };

  const clearCarrito = () => {
    localStorage.clear();
  };

  const handleRemove = (id) => {
    const updatedData = lineasPedidos.filter(item => item.id !== id);
    setLineasPedidos(updatedData);
    setTotalPedido(getTotalPedido(updatedData));
    setTotalArticulos(getTotalArticulos(updatedData));
    localStorage.setItem("lineaPedido", JSON.stringify(updatedData));
  };


  return (
    <section className="p-4">
      <PageTitles
        title={"Carrito de Compras"}
        subtitle={"Pedidos Seleccionados"}
        color={"text-orange-400"}
      />
      <div className="mt-6">
        <div className="overflow-x-auto sm:-mx-4">
          <div className="sm:px-4">
            {lineasPedidos.length === 0 ? (
              <h1>Loading</h1>
            ) : (
              <TableForCarrito data={lineasPedidos} onRemove={handleRemove} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-16 bg-teal-800 p-3 text-white rounded-lg">
        <div className="flex justify-between">
          <h1 className="mt-2 text-xl">
            Total del Resumen de Compra:{" "}
            <span className="text-gray-900 font-bold text-xl ml-5 bg-teal-400 rounded-md p-2">
              $ {totalPedido}
            </span>
          </h1>
          <h1 className="ml-10 mt-2 text-xl">
            Cantidad de Articulos:{" "}
            <span className="text-gray-900 font-bold text-xl ml-5 bg-cyan-400 rounded-md p-2">
              {totalArticulos}
            </span>
          </h1>
        </div>
        <div className="flex justify-end">
          <Link to={"/RealizarPedido"}>
            <button className="ml-10 inline-flex justify-center rounded-md border border-transparent bg-red-600 text-gray-100 py-2 px-5 text-sm font-medium buttonStyleCustom hover:bg-orange-500 hover:text-gray-900'"
              onClick={clearCarrito}
            >
              Cancelar
            </button>
          </Link>
          <button
            className="ml-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-500 hover:bg-teal-500 py-2 px-5 text-sm font-medium text-white buttonStyleCustom"
            onClick={confirmOrderCarrito}
          >
            Realizar Pedido
          </button>
        </div>
      </div>
    </section>
  );
};
