import { Link } from "react-router-dom";
import { getUserApiCall } from "../../db/UsuariosApiCall";

export const TableForUsers = ({ data, deleteUser }) => {

    const headers = ['Id', 'Email', 'Tipo de Usuario', 'DNI', 'Nombre y Apellidos', 'Telefono', 'dirección', 'Fecha de Nacimiento', 'Acciones'];

    const getUser = () => {
        getUserApiCall(data.id);
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
                            {item.email}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.tipoUsuario}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.personaDto.dni}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.personaDto.nombre} {item.personaDto.apellido}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.personaDto.numeroTelefono}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.personaDto.direccion}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.personaDto.fechaNacimiento}
                        </td>

                        <td className="flex justify-center border-none mt-1">
                            <button
                                className="bg-red-600 text-white p-2 w-14 rounded-md mr-5"
                                onClick={() => deleteUser(item.id)}
                            >
                                X
                            </button>
                            <Link
                                to={`/GestionarUsuarios/${item.id}`}
                                className="bg-blue-500 text-white p-2 w-24 rounded-md"
                                onClick={() => getUser(item.id)}
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