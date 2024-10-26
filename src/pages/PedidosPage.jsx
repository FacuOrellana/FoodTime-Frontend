import { useNavigate } from "react-router-dom";
import "./stylesPedidos.css";

export const PedidosPage = () => {
  const navigate = useNavigate();

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

            {/* Card 2: Realizar un Pedido */}
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
                      onClick={() => navigate("/realizar-pedido")}
                    >
                      Ir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Ver Mis Pedidos */}
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
            <div className="p-4 md:w-1/3">
              <div className="h-full flex flex-col justify-between rounded-xl shadow-lg bg-gradient-to-r from-orange-100 to-yellow-200 overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                  src="https://cdn.pixabay.com/photo/2015/03/17/11/36/blackboard-677578_1280.jpg"
                  alt="gestionar menus"
                />
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h1 className="title-font text-lg font-semibold text-gray-800 mb-3">
                      Gestionar Menús
                    </h1>
                    <p className="leading-relaxed mb-5">
                      Este módulo está diseñado para que el personal de cocina pueda crear, modificar y dar de baja los menús. Mantén actualizada la oferta del restaurante de forma fácil y rápida.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      className="bg-gradient-to-r from-orange-400 to-amber-500 hover:scale-105 text-white px-4 py-2 rounded-lg transition-transform duration-300 inline-flex"
                      onClick={() => navigate("/GestionarMenus")}
                    >
                      Ir
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
