import { Link } from "react-router-dom";
import { useState } from "react";
import { updateEstadoPedidoApiCall } from "../../db/PedidosApiCall";

export const TableForOrderList = ({ data , onUpdateEstado }) => {
    const headers = ['N° Pedido', 'Cliente', 'Estado', 'Hora de entrega', 'Metodo de pago', 'Cantidad de Menus', 'Total', 'Acciones'];

    const [openDropdown, setOpenDropdown] = useState(null); // Almacena el id del dropdown abierto
    const estados = ['PENDIENTE', 'PREPARACION', 'ENTREGADO', 'CANCELADO'];

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
                return 'bg-gray-400 text-gray-900 p-2 rounded-md';
        }
    };


    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id); // Alternar el dropdown
    };

    const handleEstadoChange = (id, nuevoEstado) => {
        if (onUpdateEstado) {
            onUpdateEstado(id, nuevoEstado);
            setOpenDropdown(null);
        }
    };

    return (
        <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <tr>
                        {headers.map((item) => (
                            <th key={item} scope="col" className="text-sm font-semibold text-center py-4 px-8">{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className="border-b hover:bg-gray-100 transition duration-300" key={item.id}>
                            <td className="text-md text-gray-800 px-8 py-4 text-center font-bold">
                                {item.id}
                            </td>
                            <td className="text-md text-gray-800 font-semibold px-8 py-4 text-center">
                                {item.personaNombreCompleto}
                            </td>
                            <td className="text-md text-center px-8 py-4">
                                <span className={getEstadoClass(item.estadoPedido)}>
                                    {item.estadoPedido}
                                </span>
                            </td>
                            <td className="text-md text-gray-800 font-semibold px-8 py-4 text-center">
                                {item.tiempoEntrega ? new Date(item.tiempoEntrega).toLocaleString() : "INMEDIATO"}
                            </td>
                            <td className="text-md text-gray-800 font-semibold px-8 py-4 text-center">
                                {item.metodoPago}
                            </td>
                            <td className="text-md text-gray-800 font-semibold px-8 py-4 text-center">
                                {item.pedidoMenuList.length}
                            </td>
                            <td className="text-md text-gray-800 font-semibold px-8 py-4 text-center">
                                <span className="bg-green-100 text-gray-800 p-2 rounded-md">${item.total}</span>
                            </td>
                            <td className='flex justify-center items-center py-3 relative'>
                                <Link to={`/ListarPedido/${item.id}`} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300">
                                    Ver Pedido
                                </Link>
                                <button 
                                    onClick={() => toggleDropdown(item.id)} 
                                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300 ml-2"
                                >
                                    Cambiar estado
                                </button>
                                {openDropdown === item.id && (
                                    <ul 
                                        className="absolute z-10 left-0 bg-white border border-gray-300 rounded-md shadow-md mt-1"
                                        style={{ 
                                            minWidth: "150px",
                                            maxHeight: "150px",
                                            overflowY: "auto",
                                            bottom: '20%', // Muestra el dropdown hacia arriba
                                            transform: 'translateY(-4px)', // Pequeño espacio para no quedar pegado al botón
                                        }} 
                                    >
                                        {estados.map((estado) => (
                                            <li
                                                key={estado}
                                                onClick={() => handleEstadoChange(item.id, estado)}
                                                className="p-1 hover:bg-gray-100 cursor-pointer text-sm"
                                            >
                                                {estado}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
