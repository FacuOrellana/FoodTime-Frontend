import React, { useEffect, useState } from "react";
import { PageTitles } from "../components/PageTitles/PageTitles";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { getAllMenusApiCall } from "../db/MenusApiCall";

export const RealizarPedido = () => {
  const [data, setData] = useState([]);

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
    <section className="px-8 py-6 bg-orange-50 rounded-lg shadow-lg">
      <PageTitles
        title="Gestión de Pedidos"
        subtitle="Seleccionar Elementos"
        color="text-orange-600"
      />

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {data.map((menu) => (
          <ProductCard key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  );
};
