import { useNavigate } from "react-router-dom";
import "./stylesPedidos.css";
import { useUser } from "../context/userContext";

export const PedidosPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Función para verificar permisos
  const hasPermission = (permission) => user?.permisos.includes(permission);

  return (
    <div className="container font-sans text-gray-900">
      <section className="body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">

            {/* Card 1: Consultar Menú */}
            
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-cyan-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg"
                    alt="menu"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Consultar Menú
                      </h1>
                      <p className="leading-relaxed mb-5">
                        En este módulo podrás explorar todas las opciones de menú disponibles y con detalles sobre cada plato.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/ConsultarMenu")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-orange-100 to-amber-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2022/01/28/12/17/fast-food-6974507_1280.jpg"
                    alt="realizar pedido"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Realizar un Pedido
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Aquí podrás seleccionar los platos de tu preferencia y personalizar tu pedido. Añade al carrito y finaliza tu orden fácilmente.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-orange-400 to-amber-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/RealizarPedido")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-pink-100 to-orange-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2017/08/07/23/32/office-2609180_1280.jpg"
                    alt="mis pedidos"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Ver Mis Pedidos
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Revisa el historial de tus pedidos realizados, con detalles de cada uno, incluyendo el estado del pedido.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-pink-400 to-orange-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/ver-mis-pedidos")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            {/* Card 4: Gestionar Menús */}
            {hasPermission("COCINA") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-red-100 to-blue-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2015/03/17/11/36/blackboard-677578_1280.jpg"
                    alt="gestionar menus"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Gestionar de menus
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Este módulo está diseñado para que el personal de cocina pueda crear, modificar y dar de baja los menús. Mantén actualizada la oferta del restaurante de forma fácil y rápida.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-red-400 to-blue-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/GestionarMenus")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Módulo: Gestión de Insumos */}
            {hasPermission("COCINA") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-sky-100 to-cyan-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2016/03/05/19/02/salad-1238249_1280.jpg"
                    alt="gestionar insumos"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Gestión de Insumos
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Administra los insumos necesarios para la preparación de los menús.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-sky-400 to-cyan-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/GestionarInsumos")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Módulo: Ver pedidos por fecha */}
            {hasPermission("COCINA") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-blue-100 to-sky-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://cdn.pixabay.com/photo/2016/11/22/21/26/notebook-1850613_1280.jpg"
                    alt="ver pedidos por fecha"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Ver Pedidos por Fecha
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Consulta y organiza los pedidos según la fecha de solicitud o entrega. Optimiza la preparación en función de las fechas.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-blue-400 to-sky-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/VerPedidosPorFecha")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Módulo: Gestión de Pedidos */}
            {hasPermission("COCINA") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-cyan-100 to-teal-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://img.freepik.com/free-photo/man-using-digital-tablet-while-having-croissant-cafa_1170-636.jpg?t=st=1730051989~exp=1730055589~hmac=2164b20c29ebdb7ccd5810b84962935578e9e7f46c3483324b5a45102cbb5df9&w=1380"
                    alt="gestión de pedidos"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Gestión de Pedidos
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Supervisa y administra los pedidos en curso. Asegúrate de que cada orden esté preparada y entregada a tiempo.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/ListarPedido")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasPermission("USUARIOS") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-purple-100 to-indigo-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://img.freepik.com/free-photo/hands-holding-tablet-with-icons_1134-90.jpg?t=st=1730052417~exp=1730056017~hmac=f0b59c02b1aed1921f19d95183b7a75f6b41e0f2fcacd5442fd85342f37c9f43&w=1380"
                    alt="gestión de usuarios"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Gestión de Usuarios
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Administra las cuentas de usuario, asigna roles y gestiona permisos. Mantén un control efectivo sobre el acceso al sistema.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/GestionarUsuarios")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Módulo: Gestión de Dietas */}
            {hasPermission("DIETAS") && (
              <div className="p-4 md:w-1/3">
                <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-green-100 to-lime-200 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src="https://img.freepik.com/free-photo/healthy-menu-recipe-food-diet_53876-122837.jpg?t=st=1730053514~exp=1730057114~hmac=25b31611ed5ea30f679ebb363d348626ce71de62bb9a8a6e9e87c91413b8a60c&w=1380"
                    alt="gestión de dietas"
                  />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                        Gestión de Dietas
                      </h1>
                      <p className="leading-relaxed mb-5">
                        Administra las dietas personalizadas y las necesidades alimenticias especiales de los clientes. Mantén un control sobre las opciones de dieta disponibles.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <button
                        className="bg-gradient-to-r from-green-400 to-lime-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                        onClick={() => navigate("/GestionarDietas")}
                      >
                        Ir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </section>
    </div>
  );
};
