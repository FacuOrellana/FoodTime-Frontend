import React, { useState } from "react";
import Swal from "sweetalert2";

export const ProductCard = ({ menu }) => {
  const [counter, setCounter] = useState(0);
  const [lineaPedido, setLineaPedido] = useState([]);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decrementCounter = () => {
    counter > 0 && setCounter((prev) => prev - 1);
  };

  const confirmOrder = () => {
    if (counter > 0) {
      Swal.fire({
        icon: "success",
        title: "Menu agregado con Éxito al Carrito",
        showConfirmButton: false,
        timer: 800,
      });
      menu.cantidad = counter;
      setLineaPedido(menu);
      let menuItems = localStorage.getItem("lineaPedido") || '[]';
      menuItems = JSON.parse(menuItems); 
      menuItems.push(menu);
      localStorage.setItem("lineaPedido", JSON.stringify(menuItems));
    }
  };

  return (
    <div className="col-3 col-sm-12 col-md-6 col-lg-3 col-xl-3">
      <div className="border p-3 bg-blue-50 text-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-semibold text-orange-700">{menu.titulo}</h1>
        <h3 className="text-lg text-center text-gray-600">{menu.descripcion}</h3>

        <div className="flex justify-center mt-3 mb-6">
          <div className="bg-orange-200 text-orange-800 px-4 py-2 rounded-md w-24 text-center font-bold">
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
  increment,
  decrement,
  confirmOrder,
}) => {
  return (
    <section className="mt-4">
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-3 py-1 mr-2 rounded-sm hover:bg-orange-500 transition-all"
          onClick={decrement}
        >
          -
        </button>

        <div className="bg-gray-200 text-gray-900 px-3 py-1 mx-2 rounded-sm font-bold">
          {value}
        </div>

        <button
          className="bg-blue-600 text-white px-3 py-1 ml-2 rounded-sm hover:bg-orange-500 transition-all"
          onClick={increment}
        >
          +
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md w-full transition-all"
          onClick={confirmOrder}
        >
          Agregar
        </button>
      </div>
    </section>
  );
};
