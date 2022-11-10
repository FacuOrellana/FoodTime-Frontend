import { Link } from "react-router-dom";

export const TableForOrderList = ({ data }) => {

    const headers = ['Id', 'Usuario', 'Estado', 'Fecha y Hora', 'Cantidad de Menus', 'Total', 'Acciones'];
    console.log(data);
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
                            {/* {item.usuario} */}
                            Sebastian
                        </td>
                        <td className="text-md text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {
                                (item.estado === 'Entregado')
                                    ? <span className="bg-cyan-400 text-gray-900 p-2 rounded-md">{item.estado}</span>
                                    : <span className="bg-red-400 text-gray-900 p-2 rounded-md">{item.estado}</span>
                            }
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.horaEntrega}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.lineaPedidos.length}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-teal-200 text-gray-800 p-2 rounded-md">$ {item.total}</span>
                        </td>
                        <td className='flex justify-center border-none mt-1'>
                            <Link to={`/ListarPedido/${item.id}`} className="bg-rose-500 text-gray-100 p-2 w-24 rounded-md hover:text-gray-100 hover:bg-blue-600">
                                Ver Pedido
                            </Link>
                            <button className="bg-blue-500 text-gray-100 p-2 w-32 rounded-md hover:text-gray-100 hover:bg-blue-600 ml-2">Cambiar estado</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}