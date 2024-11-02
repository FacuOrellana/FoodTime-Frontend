import { Link } from "react-router-dom";

export const TableForMenus = ({ data, deleteMenu }) => {

    const headers = ['Id', 'Titulo', 'Descripcion', 'Tipo Menu', 'Precio', 'Disponibilidad', 'Acciones'];


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
                            {item.titulo}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.descripcion}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.tipoMenu}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-orange-200 text-gray-800 p-2 rounded-md">
                                $ {item.precio}
                            </span>
                        </td>
                        <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.disponibilidad ? (
                                <span className="bg-green-400 text-white p-2 rounded-md font-bold">
                                    Disponible
                                </span>
                            ) : (
                                <span className="bg-red-400 text-white p-2 rounded-md font-bold">
                                    No Disponible
                                </span>
                            )}
                        </td>

                        <td className="flex justify-center border-none mt-1">
                            <button
                                className="bg-red-600 text-white p-2 w-14 rounded-md mr-5"
                                onClick={() => deleteMenu(item.id)}
                            >
                                X
                            </button>
                            <Link
                                to={`/GestionarMenus/${item.id}`}
                                className="bg-blue-500 text-white p-2 w-24 rounded-md"
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