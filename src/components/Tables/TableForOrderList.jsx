import { Link } from "react-router-dom";

export const TableForOrderList = ({ data }) => {
    const headers = ['N° Pedido', 'Cliente', 'Estado', 'Hora de entrega', 'Cantidad de Menus', 'Total', 'Acciones'];

    // Función para asignar clases de color según el estado del pedido
    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'PENDIENTE':
                return 'bg-yellow-400 text-gray-900 p-2 rounded-md';
            case 'PREPARACION':
                return 'bg-orange-400 text-gray-900 p-2 rounded-md';
            case 'ENTREGADO':
                return 'bg-green-400 text-gray-900 p-2 rounded-md';
            case 'CANCELADO':
                return 'bg-red-400 text-gray-900 p-2 rounded-md';
            default:
                return 'bg-gray-400 text-gray-900 p-2 rounded-md'; // Estado desconocido
        }
    };

    return (
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <tr>
                    {headers.map((item) => (
                        <th key={item} scope="col" className="text-sm font-semibold text-center py-4">{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr className="border-b hover:bg-gray-100 transition duration-300" key={item.id}>
                        <td className="text-md text-gray-800 px-4 py-3 text-center font-bold">
                            {item.id}
                        </td>
                        <td className="text-md text-gray-800 font-semibold px-4 py-3 text-center">
                            {item.personaNombreCompleto}
                        </td>
                        <td className="text-md text-center px-4 py-3">
                            <span className={getEstadoClass(item.estadoPedido)}>
                                {item.estadoPedido}
                            </span>
                        </td>
                        <td className="text-md text-gray-800 font-semibold px-4 py-3 text-center">
                            {new Date(item.tiempoEntrega).toLocaleString()}
                        </td>
                        <td className="text-md text-gray-800 font-semibold px-4 py-3 text-center">
                            {item.pedidoMenuList.length}
                        </td>
                        <td className="text-md text-gray-800 font-semibold px-4 py-3 text-center">
                            <span className="bg-green-100 text-gray-800 p-2 rounded-md">${item.total}</span>
                        </td>
                        <td className='flex justify-center items-center py-3'>
                            <Link to={`/ListarPedido/${item.id}`} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
                                Ver Pedido
                            </Link>
                            <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300 ml-2">Cambiar estado</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}
