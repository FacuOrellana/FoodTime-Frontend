import { Link } from "react-router-dom";
import { getMenuApiCall } from "../../db/MenusApiCall";

export const TableForMenus = ({ data, deleteMenu }) => {

    const headers = ['Id', 'Titulo', 'Descripcion', 'Tipo Menu', 'Precio', 'Disponibilidad', 'Acciones'];

    

    const getMenu = () =>
    {
        getMenuApiCall(data.id);
    };

    return (
        <table className="table border text-center">
            <thead className="border-b bg-gray-800 rounded-2xl">
                <tr>
                    {headers.map((item) => (
                        <th scope="col" className="text-sm font-medium text-gray-100 px-0 py-4 text-center">{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr className="bg-white border-b" id={item.id}>
                        <td className="text-md text-gray-900  px-6 py-4 whitespace-nowrap font-bold">
                            {item.id}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.titulo}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.descripcion}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.tipoMenu}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-teal-200 text-gray-800 p-2 rounded-md">$ {item.precio}</span>
                        </td>
                        <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {
                                (item.disponibilidad)
                                    ? <span className="bg-cyan-400 text-gray-900 p-2 rounded-md font-bold">Disponible</span>
                                    : <span className="bg-red-400 text-gray-900 p-2 rounded-md font-bold">No Disponible</span>
                            }
                        </td>

                        <td className='flex justify-center border-none mt-1'>
                            <button className="bg-rose-500 text-gray-100 p-2 w-14 rounded-md mr-5" onClick={()=>deleteMenu(item.id)}>X</button>
                            <Link to={`/GestionarMenus/${item.id}`} className="bg-cyan-500 text-gray-100 p-2 w-24 rounded-md" onClick={()=> getMenu(item.id) }>Editar</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}