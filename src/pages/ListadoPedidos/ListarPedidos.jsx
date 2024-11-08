import React, { useEffect, useState } from 'react';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { TableForOrderList } from '../../components/Tables/TableForOrderList';
import { getAllPedidosApiCall } from '../../db/PedidosApiCall';
import { getOnePersonaApiCall } from '../../db/personaApiCall';
import { updateEstadoPedidoApiCall } from '../../db/PedidosApiCall'; // Asegúrate de importar la función correctamente

export const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pedidosData = await getAllPedidosApiCall();
        const pedidosConPersonas = await Promise.all(
          pedidosData.map(async (pedido) => {
            let personaNombreCompleto;
            let persona;
            let dni;
            if(pedido.personaId == null){
              persona = pedido.extra;
              dni = persona.dni;
              personaNombreCompleto = `${persona.nombre} ${persona.apellido}`;
            }
            else{
              persona = await getOnePersonaApiCall(pedido.personaId);
              personaNombreCompleto = `${persona.data.nombre} ${persona.data.apellido}`;
              dni = persona.data.dni;
            }           
            
            return {
              ...pedido,
              personaNombreCompleto,
              dni // Agrega el nombre completo al pedido
            };
          })
        );
        setPedidos(pedidosConPersonas);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
        await updateEstadoPedidoApiCall(id, nuevoEstado); // Cambia el estado
        const updatedPedidos = await getAllPedidosApiCall(); // Vuelve a cargar los pedidos
        setPedidos(updatedPedidos); // Actualiza el estado
    } catch (e) {
        console.log(e);
    }
};

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Pedidos"}
        subtitle={"Listado de Pedidos Efectuados"}
        color={"text-teal-400"}
      />

      <div className="mt-6">
        <div className="overflow-x-auto sm:-mx-4">
          <div className="sm:px-4">
            {pedidos.length === 0 ? <h1>Loading</h1> :
              <TableForOrderList data={pedidos} onUpdateEstado={handleUpdateEstado}/> }
          </div>
        </div>
      </div>
    </section>
  );
};
