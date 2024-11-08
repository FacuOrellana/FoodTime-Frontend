import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPedidosByDniApiCall } from "../../db/reportesApiCall";

export const PedidosByDni = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dni, setDni] = useState("");

    const fetchPedidos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPedidosByDniApiCall(dni);
            setPedidos(response.data);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    // Evento al buscar por DNI
    const handleSearch = (e) => {
        e.preventDefault();
        fetchPedidos();
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-bold mb-4 text-dark">Buscar pedido</h1>
            
            <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
                <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingrese DNI"
                    className="border p-2 mr-2 rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Buscar
                </button>
            </form>

            {loading && <div>Cargando...</div>}
            {error && <div>Error: {error}</div>}
            
            <table className="table border text-center">
                <thead className="border-b bg-blue-900 rounded-2xl">
                    <tr>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Nro de pedido</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Nombre</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Apellido</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">DNI</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Fecha de Pedido</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Método de Pago</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Cantidad de Menús</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Estado del Pedido</th>
                        <th className="text-sm font-medium text-white px-0 py-4 text-center">Monto Total</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr className="bg-white border-b" key={pedido.pedidoId}>
                            <td className="text-md text-gray-900 px-6 py-4 whitespace-nowrap font-bold">{pedido.pedidoId}</td>
                            <td className="text-md text-gray-900 px-6 py-4 whitespace-nowrap font-bold">{pedido.nombre}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.apellido}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.dni}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.fechaPedido}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.metodoPago}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.cantidadMenus}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">{pedido.estadoPedido}</td>
                            <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">${pedido.montoTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button 
                onClick={() => navigate("/pedidos")} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Volver a Pedidos
            </button>
        </div>
    );
};
