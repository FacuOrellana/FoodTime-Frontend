import React, { useEffect, useState } from 'react';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { TableForOrderList } from '../../components/Tables/TableForOrderList';
import { getAllPedidosApiCall } from '../../db/PedidosApiCall';
import { getOnePersonaApiCall } from '../../db/personaApiCall'; // Asegúrate de importar la función correctamente

export const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pedidosData = await getAllPedidosApiCall();
        const pedidosConPersonas = await Promise.all(
          pedidosData.map(async (pedido) => {
            const persona = await getOnePersonaApiCall(pedido.personaId);
            const personaNombreCompleto = `${persona.data.nombre} ${persona.data.apellido}`;
            return {
              ...pedido,
              personaNombreCompleto // Agrega el nombre completo al pedido
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
              <TableForOrderList data={pedidos} /> }
          </div>
        </div>
      </div>
    </section>
  );
};
