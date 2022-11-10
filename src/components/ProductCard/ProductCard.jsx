import React, { useState } from "react";
import Swal from "sweetalert2";

export const ProductCard = ({ menu }) => {
  const [counter, setCounter] = useState(0);

  const counterMenus = {
    cantidadMenus1: 0,
    cantidadMenus2: 0
  }
  const [lineaPedido, setLineaPedido] = useState([]);
  

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decrementCounter = () => {
    counter > 0 && setCounter((prev) => prev - 1);
  };

  const confirmOrder = () => {
    counter > 0 &&
      Swal.fire({
        icon: "success",
        title: "Menu agregado con Exito al Carrito",
        showConfirmButton: false,
        timer: 800,
      });
      menu.cantidad = counter;
      setLineaPedido(menu)

      // //ls.get
      // let menus = localStorage.getItem('lineaPedido');
      // let lineaPedidoNew
      // if(menus === undefined) {
      //   lineaPedidoNew = []
      // }
      // else{
      //   lineaPedidoNew = [...lineaPedido, menu]
      // }
      // console.log("El objeto es: " + JSON.stringify(lineaPedidoNew));
      // localStorage.setItem('lineaPedido',JSON.stringify(lineaPedidoNew))
      let menuItems = localStorage.getItem("lineaPedido") || '[]';
      menuItems = JSON.parse(menuItems); 
      // declare and add the new item
      menuItems.push(menu);
      localStorage.setItem("lineaPedido", JSON.stringify(menuItems));

  };

  return (
    <div className="col-3 col-sm-12 col-md-6 col-lg-3 col-xl-3">
      <div className="border p-3 bg-gray-800 text-gray-100 rounded-lg">
        <h1 className="text-2xl text-center">{menu.titulo}</h1>
        <h3 className="text-lg text-center">{menu.descripcion}</h3>

        <div className="flex justify-center mt-3 mb-6">
          <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md w-24">
            $ {menu.precio}
          </div>
        </div>

        <hr />

        <SelectorButton
          value={counter}
          setValue={setCounter}
          increment={incrementCounter}
          decrement={decrementCounter}
          confirmOrder={confirmOrder}
        />
      </div>
    </div>
  );
};

export const SelectorButton = ({
  value,
  setValue,
  increment,
  decrement,
  confirmOrder,
}) => {
  return (
    <section className="mt-10">
      <div className="flex justify-center">
        <button
          className="bg-indigo-600 text-gray-100 px-3 py-1 mr-2 rounded-sm hover:bg-orange-400"
          onClick={decrement}
        >
          -
        </button>

        <div className="bg-gray-200 text-gray-900 px-3 py-1 ml-2 mr-2 rounded-sm font-bold">
          {value}
        </div>

        <button
          className="bg-indigo-600 text-gray-100 px-3 py-1 ml-2 rounded-sm hover:bg-orange-400"
          onClick={increment}
        >
          +
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-indigo-600 text-gray-100 hover:bg-teal-600 px-4 py-2 rounded-md w-100"
          onClick={confirmOrder}
        >
          Agregar
        </button>
      </div>
    </section>
  );
};
