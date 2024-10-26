import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TableForMenus } from "../../components/Tables/TableForMenus";
import { getAllMenusApiCall, deleteMenuApiCall } from "../../db/MenusApiCall";

export const GestionarMenus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getAllMenusApiCall()
      .then((menus) => {
        setMenus(menus);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteMenu = (id) => {
    console.log("id del menu " + id);
    deleteMenuApiCall(id);
    const newMenus = menus.filter((menu) => menu.id !== id);
    setMenus(newMenus);
  };

  return (
    <section className="p-4 font-sans text-gray-900 antialiased bg-[#f8f4f3] min-h-screen">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Gestionar Menús</h1>
    <p className="text-lg text-gray-600 mt-2">
      Crea, modifica y elimina menús fácilmente desde este módulo.
    </p>
  </div>

  <div className="flex justify-center">
    <Link to={"/GestionarMenus/Crear"}>
      <button className="w-80 bg-gradient-to-r from-blue-500 to-orange-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300">
        <span className="text-xl">Crear Menú</span>
      </button>
    </Link>
  </div>

  <div className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow-md sm:rounded-lg bg-white">
        <TableForMenus data={menus} deleteMenu={deleteMenu} />
      </div>
    </div>
  </div>
</section>


  );
};
