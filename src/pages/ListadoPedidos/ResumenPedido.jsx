import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { TableForMenusPedido } from '../../components/Tables/TableForMenusPedido';
import { getPedidoApiCall } from '../../db/PedidosApiCall';
import { getOnePersonaApiCall } from '../../db/personaApiCall';
import { getMenuApiCall } from '../../db/MenusApiCall'; 

export const ResumenPedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState({});
  const [loadState, setLoadState] = useState(false);
  const [pedidoMenus, setPedidoMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPedidoApiCall(id);
        let personaNombreCompleto;
        let persona;
        if (data.personaId == null) {
          persona = data.extra;
          personaNombreCompleto = `${persona.nombre} ${persona.apellido}`;
        }
        else {
          persona = await getOnePersonaApiCall(data.personaId);
          personaNombreCompleto = `${persona.data.nombre} ${persona.data.apellido}`;
        }

        

        setPedido({
          ...data,
          nombrePersona: personaNombreCompleto
        });
        // Obtener los menús correspondientes a los pedidoMenu
        const menuPromises = data.pedidoMenuList.map(pedidoMenuItem => getMenuApiCall(pedidoMenuItem.menuId));       

        const menusData = await Promise.all(menuPromises);

        // Asociar los menús obtenidos con sus cantidades
        const menusWithQuantity = menusData.map((menu, index) => ({
          ...menu,
          cantidad: data.pedidoMenuList[index].cantidad // Agrega la cantidad del pedidoMenu
        }));
        setPedidoMenus(menusWithQuantity); // Guarda los menús con las cantidades
        setLoadState(true);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className='p-4'>
      <PageTitles title={'Resumen de Pedido'} subtitle={'Detalles del Pedido Seleccionado'} color={'text-teal-400'} />

      {loadState && (
        <div className='row mt-10'>
          <div className='col-5 h-auto'>
            <div className='bg-gray-800 p-3 rounded-md mb-10'>
              <DetallesPedidoTitleComponent title={'Detalles del Pedido'} />
              <hr style={{ color: 'white' }} />
              <DetallesPedidoComponent title={'Usuario'} value={pedido.nombrePersona} />
              <DetallesPedidoComponent title={'Ubicacion'} value={pedido.ubicacion} />
              <DetallesPedidoComponent   title={'Fecha de Pedido'} value={pedido.tiempoEntrega ? new Date(pedido.tiempoEntrega).toLocaleString() : "INMEDIATO"}/>
              <DetallesPedidoComponent title={'Total a Pagar'} value={pedido.total} />

              <div className='row mt-6'>
                <div className='col-6 flex'>
                  <i className="fa-solid fa-circle-check text-gray-100 mt-2"></i>
                  <h2 className='text-lg text-gray-100 ml-5'>Estado del Pedido :</h2>
                </div>
                <div className='col-6'>
                  {pedido.estadoPedido === 'Entregado' ? (
                    <p className="bg-cyan-400 text-gray-900 p-2 rounded-md w-full text-center">{pedido.estadoPedido}</p>
                  ) : (
                    <p className="bg-orange-400 text-gray-900 p-2 rounded-md w-full text-center">{pedido.estadoPedido}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='col-7 h-auto'>
            <div className='bg-gray-800 p-3 rounded-md '>
              <DetallesPedidoTitleComponent title={'Menus del Pedido'} />

              <div className="mt-6">
                <div className="overflow-x-auto sm:-mx-4">
                  <div className="sm:px-4">
                    <TableForMenusPedido data={pedidoMenus || []} />
                  </div>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='mt-3'>
                  <Link to={'/ListarPedido'} className='bg-indigo-400 text-gray-100 text-center p-3 rounded-md text-md hover:bg-blue-600 hover:text-gray-100 font-semibold'>
                    Volver al Listado
                  </Link>
                </div>
                <div className='mt-2'>
                  <div className='flex justify-end'>
                    <h1 className='text-2xl text-gray-100 font-bold mr-5 mt-1'>Total:</h1>
                    <span className="bg-teal-400 text-gray-800 px-3 py-2 rounded-md font-bold text-lg">
                      ${new Intl.NumberFormat("de-DE").format(pedido.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export const DetallesPedidoTitleComponent = ({ title }) => {
  return (
    <h1 className='text-2xl text-gray-900 text-center mb-14 mt-3'>
      <span className='bg-gray-100 p-3 rounded-lg font-bold'>{title}</span>
    </h1>
  );
};

export const DetallesPedidoComponent = ({ title, value }) => {
  return (
    <div className='row mt-6'>
      <div className='col-6 flex'>
        <i className="fa-solid fa-circle-check text-gray-100 mt-2"></i>
        <h2 className='text-lg text-gray-100 ml-5'>{title} :</h2>
      </div>
      <div className='col-6'>
        <input disabled value={value} className='bg-gray-100 rounded-md p-1 w-full text-center font-semibold' />
      </div>
    </div>
  );
};
