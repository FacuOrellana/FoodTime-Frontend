import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageTitles } from "../components/PageTitles/PageTitles";
import { TableForCarrito } from "../components/Tables/TableForCarrito";
import { getCarritoConfirmacionMsg } from "../utils/messages";
import { getTotalArticulos, getTotalPedido } from "../utils/selector";
import { useUser } from "../context/userContext";
import { format, addMinutes, addHours, isBefore } from 'date-fns';

export const Carrito = ({ history }) => {
  const [totalPedido, setTotalPedido] = useState(0);
  const [totalArticulos, setTotalArticulos] = useState(0);
  const [lineasPedidos, setLineasPedidos] = useState([]);
  const [pedido, setPedido] = useState(null);
  const { user } = useUser();
  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
  const [tiempoEntrega, setTiempoEntrega] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");

  useEffect(() => {
    let menuItems = localStorage.getItem("lineaPedido") || "[]";
    menuItems = JSON.parse(menuItems);
    setLineasPedidos(menuItems);
    console.log(user);

    let articulosTotales = 0;
    let total = 0;
    menuItems.forEach((item) => {
      total += item.precio * item.cantidad;
      articulosTotales += item.cantidad;
    });
    setTotalArticulos(articulosTotales);
    setTotalPedido(total);

    const initialTime = addMinutes(new Date(), 30);
    setTiempoEntrega(format(initialTime, "yyyy-MM-dd HH:mm:ss"));
  }, []);

  const generateTimeOptions = () => {
    const options = [];
    options.push("INMEDIATO");

    let currentTime = addMinutes(new Date(), 45);

    // Redondear al siguiente intervalo de 15 minutos
    const minutes = currentTime.getMinutes();
    const nextInterval = Math.ceil(minutes / 15) * 15;
    currentTime = addMinutes(currentTime, nextInterval - minutes);

    // Hora límite de 2 horas después de la hora actual
    const limitTime = addHours(new Date(), 2); // Esto agrega 2 horas a la hora actual

    while (isBefore(currentTime, limitTime)) {
      options.push(format(currentTime, "HH:mm"));
      currentTime = addMinutes(currentTime, 15); // Sumar 15 minutos para la siguiente opción
    }

    return options;
  };


  const confirmOrderCarrito = () => {
    let menuItems = JSON.parse(localStorage.getItem("lineaPedido") || "[]");
    let arrayBack = menuItems.map((elemento) => ({
      id: null,
      pedidoId: null,
      menuId: elemento.id,
      cantidad: elemento.cantidad,
    }));

    const idPersona = user?.personaDto?.id;
    let tiempoEntregaFormato = null;
    if (tiempoEntrega && tiempoEntrega !== "INMEDIATO") {
      try {
        const today = new Date();
        const [hours, minutes] = tiempoEntrega.split(":").map(Number);

        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          throw new Error("Valores de tiempo no válidos: " + tiempoEntrega);
        }

        // Crear la fecha ajustada sin conversión automática a UTC
        const entregaDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes
        );

        if (isNaN(entregaDate.getTime())) {
          throw new Error("Fecha de entrega no es válida");
        }

        // Formatear en "yyyy-MM-dd HH:mm:ss" sin ajuste de zona horaria
        tiempoEntregaFormato = `${entregaDate.getFullYear()}-${String(entregaDate.getMonth() + 1).padStart(2, '0')}-${String(entregaDate.getDate()).padStart(2, '0')} ${String(entregaDate.getHours()).padStart(2, '0')}:${String(entregaDate.getMinutes()).padStart(2, '0')}:00`;
        console.log("Tiempo entrega en formato: " + tiempoEntregaFormato);
      } catch (error) {
        console.error("Error al procesar tiempoEntrega:", error);
      }
    }

    let pedidoExtra;

    if (user != null){
      pedidoExtra = null;
    }
    else{
      pedidoExtra = {
        id:null,
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        numeroTelefono: numeroTelefono,
        email: email
      }
    }

    let pedidoDto = {
      id: null,
      tiempoEntrega: tiempoEntregaFormato,
      metodoPago: metodoPago,
      ubicacion: ubicacion,
      total: totalPedido,
      personaId: idPersona,
      pedidoMenuList: arrayBack,
      extra: pedidoExtra,
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
      <PageTitles title={"Carrito de Compras"} subtitle={"Pedidos Seleccionados"} color={"text-orange-400"} />
      <div className="mt-6">
        <div className="overflow-x-auto sm:-mx-4">
          <div className="sm:px-4">
            {lineasPedidos.length === 0 ? (
              <h1 className="text-center text-lg text-gray-700 font-semibold">
                Todavía no se agregaron menús al pedido
              </h1>
            ) : (
              <TableForCarrito data={lineasPedidos} onRemove={handleRemove} />
            )}
          </div>
          <div className="mt-4 flex flex-col items-center space-y-4">
            <div className="w-2/3 max-w-md">
              <label className="block text-gray-700 text-lg font-semibold mb-2">Método de Pago:</label>
              <select
                className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)} // Actualiza correctamente el estado
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="TRANSFERENCIA">Transferencia</option>
                {user && user.tipoUsuario !== "PACIENTE" && (
                  <option value="CUENTA">Cuenta corriente</option>
                )}
              </select>
            </div>
            <div className="w-2/3 max-w-md">
              <label className="block text-gray-700 text-lg font-semibold mb-2">Tiempo de Entrega:</label>
              <select
                className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                value={tiempoEntrega}
                onChange={(e) => setTiempoEntrega(e.target.value)} // Cambia el tiempo de entrega
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="w-2/3 max-w-md">
              <label className="block text-gray-700 text-lg font-semibold mb-2">Ubicación:</label>
              <input
                type="text"
                className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)} // Asigna el valor de ubicación
              />
            </div>
          </div>
        </div>
      </div>
      {user === null && (
          <>

      {/* Separador de sección */}
      <div className="w-full border-t border-gray-300 mt-6 mb-4"></div>
        
        {/* Datos personales */}
        <h2 className="text-lg font-semibold text-gray-700">Datos personales</h2>
        <div className="grid grid-cols-3 gap-4 w-full max-w-20xl mt-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Apellido:</label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">DNI:</label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Número de Teléfono:</label>
            <input
              type="text"
              className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-sm"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </div>
        </div>
        </>)}
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
            <button className="ml-10 inline-flex justify-center rounded-md border border-transparent bg-red-600 text-gray-100 py-2 px-5 text-sm font-medium buttonStyleCustom hover:bg-orange-500 hover:text-gray-900"
              onClick={clearCarrito}
            >
              Cancelar
            </button>
          </Link>
          <Link to={"/RealizarPedido"}>
            <button
              className="ml-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-500 hover:bg-teal-500 py-2 px-5 text-sm font-medium text-white buttonStyleCustom"
              onClick={confirmOrderCarrito}
            >
              Realizar Pedido
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
