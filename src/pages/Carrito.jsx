import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTitles } from "../components/PageTitles/PageTitles";
import { TableForCarrito } from "../components/Tables/TableForCarrito";
import { carritoCompras } from "../db/datosPrueba";
import { getCarritoConfirmacionMsg } from "../utils/messages";
import { getTotalArticulos, getTotalPedido } from "../utils/selector";

export const Carrito = ({ history }) => {
  console.log(history);

  const [totalPedido, setTotalPedido] = useState(0);
  const [totalArticulos, setTotalArticulos] = useState(0);
  const [lineasPedidos, setLineasPedidos] = useState([]);
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    setTotalPedido(getTotalPedido(carritoCompras));
    setTotalArticulos(getTotalArticulos(carritoCompras));
    let menuItems = localStorage.getItem("lineaPedido") || "[]";
    menuItems = JSON.parse(menuItems);
    let articulosTotales = 0;
    let total = 0;
    menuItems.forEach((item) => {
      total = total + item.precio * item.cantidad;
      articulosTotales = articulosTotales + item.cantidad;
    });
    setTotalArticulos(articulosTotales);
    setTotalPedido(total);
    setLineasPedidos(menuItems);
  }, []);

  const confirmOrderCarrito = () => {
    let menuItems = localStorage.getItem("lineaPedido") || "[]";
    menuItems = JSON.parse(menuItems);
    
    let arrayBack = [];

    menuItems.forEach((elemento) => {
      let menuBack = {
        titulo: elemento.titulo,
        descripcion: elemento.descripcion,
        precio: elemento.precio,
        disponibilidad: elemento.disponibilidad,
        tipoMenu: elemento.tipoMenu
      }
      let sendBack = {
        menu: menuBack,
        cantidad: elemento.cantidad
      }
      arrayBack.push(sendBack)
    })

    let d1 = new Date (),
    d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() + 30 );
    console.log(d2);

    let pedidoBack = {
      Estado: 0,
      LineaPedidos: arrayBack,
      Fecha: d1,
      Total: totalPedido,
      tipoEntrega: 0,
      HoraEntrega: d2,
    };

    setPedido(pedidoBack);
        
    console.log(pedidoBack);
    getCarritoConfirmacionMsg(pedidoBack);
    clearCarrito();
  };

  const clearCarrito = () => {
    localStorage.clear();
  }

  // [{Menu1, cantidad= 2},{Menu2, cantidad = 2},{ Menu1, cantidad = 5}]
  // [{Menu1, cantidad= 7},{Menu2, cantidad = 2}]
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
              <TableForCarrito data={lineasPedidos} />
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
            <button className="ml-10 inline-flex justify-center rounded-md border border-transparent bg-red-600 text-gray-100 py-2 px-5 text-sm font-medium  buttonStyleCustom hover:bg-orange-500 hover:text-gray-900'"
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
