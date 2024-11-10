import { Link } from "react-router-dom";

export const TableForDietas = ({ data, deleteDieta }) => {

    const headers = ['Id', 'Nombre y Apellido', 'Detalle', 'Acciones'];

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
                            {item.personaNombreCompleto}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.detalles}
                        </td>
                        <td className="flex justify-center border-none mt-1">
                            <button
                                className="bg-red-600 text-white p-2 w-14 rounded-md mr-5"
                                onClick={() => deleteDieta(item.id)}
                            >
                                X
                            </button>
                            <Link
                                to={`/GestionarDietas/${item.id}`}
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