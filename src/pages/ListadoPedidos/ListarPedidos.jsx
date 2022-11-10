import React, { useEffect, useState } from 'react'
import { PageTitles } from '../../components/PageTitles/PageTitles'
import { TableForOrderList } from '../../components/Tables/TableForOrderList'
import { getAllPedidosApiCall } from '../../db/PedidosApiCall';

export const ListarPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getAllPedidosApiCall()
      .then((pedidos) => {
        setPedidos(pedidos);
        console.log(pedidos);
      })
      .catch((e) => {
        console.log(e);
      });
      console.log("lista de pedidos: " + JSON.stringify(pedidos));
  }, [setPedidos]);

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
            
           { pedidos.length===0 ? <h1>Loading</h1> :
            <TableForOrderList data={pedidos} /> }
          </div>
        </div>
      </div>
    </section>
  );
};
