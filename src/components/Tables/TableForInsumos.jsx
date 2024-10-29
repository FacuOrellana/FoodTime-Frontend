import { Link } from "react-router-dom";
import { getInsumoApiCall } from "../../db/InsumoApiCall";

export const TableForInsumos = ({ data, deleteInsumo }) => {

    const headers = ['Id', 'Nombre', 'Unidad', 'Precio', 'Acciones'];



    const getInsumo = () => {
        getInsumoApiCall(data.id);
    };

    return (
        <table className="table border text-center">
            <thead className="border-b bg-blue-900 rounded-2xl">
                <tr>
                    {headers.map((item) => (
                        <th
                            scope="col"
                            className="text-sm font-medium text-white px-0 py-4 text-center"
                        >
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr className="bg-white border-b" id={item.id}>
                        <td className="text-md text-gray-900 px-6 py-4 whitespace-nowrap font-bold">
                            {item.id}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.Nombre}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.Unidad}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-orange-200 text-gray-800 p-2 rounded-md">
                                $ {item.precio}
                            </span>
                        </td>
                        <td className="flex justify-center border-none mt-1">
                            <button
                                className="bg-red-600 text-white p-2 w-14 rounded-md mr-5"
                                onClick={() => deleteInsumo(item.id)}
                            >
                                X
                            </button>
                            <Link
                                to={`/GestionarInsumos/${item.id}`}
                                className="bg-blue-500 text-white p-2 w-24 rounded-md"
                                onClick={() => getInsumo(item.id)}
                            >
                                Editar
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}