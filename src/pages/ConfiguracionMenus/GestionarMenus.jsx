import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { TableForMenus } from "../../components/Tables/TableForMenus"
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

  const deleteMenu = (id) =>
    {
        console.log("id del menu " + id);
        deleteMenuApiCall(id);
        const newMenus = menus.filter(menu => menu.id !== id );
        setMenus(newMenus);
        
    };

    //Funcion borrar
    // newMenus = menus.filter()
    // setMenus(newMenus)

    return (
        <section className='p-4'>

            <div className='flex justify-center'>
                <Link to={'/GestionarMenus/Crear'}>
                    <button className='w-80 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-indigo-700'>
                        <span className='font-bold text-xl'>Crear Menu</span>
                    </button>
                </Link>
            </div>

            <div className="mt-6">
                <div className="overflow-x-auto sm:-mx-4">
                    <div className="sm:px-4">
                        <TableForMenus data={menus} deleteMenu={deleteMenu} />
                    </div>
                </div>
            </div>

        </section>
    )
}