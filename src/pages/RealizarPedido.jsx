import React, { useEffect, useState } from "react";
import { PageTitles } from "../components/PageTitles/PageTitles";
import { ProductCard } from "../components/ProductCard/ProductCard";

import { getAllMenusApiCall } from "../db/MenusApiCall";

export const RealizarPedido = () => {
  const [data, setData] = useState([]);
  //counter card

  useEffect(() => {
    getAllMenusApiCall()
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Pedidos"}
        subtitle={"Seleccionar Elementos"}
        color={"text-red-600"}
      />

      <div className="row mt-10">
        {data.map((menu) => (
          <ProductCard menu={menu} />
        ))}
      </div>
    </section>
  );
};
