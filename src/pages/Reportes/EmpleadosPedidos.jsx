import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpleadosPedidosApiCall } from "../../db/reportesApiCall";

export const EmpleadosPedidos = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        fechaInicio: '',
        fechaFin: ''
    });
    const [filteredPedidos, setFilteredPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await getEmpleadosPedidosApiCall();
                setPedidos(response.data);
                setFilteredPedidos(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        const filtered = pedidos.filter(pedido =>
            (!newFilters.fechaInicio || new Date(pedido.fechaPedido) >= new Date(newFilters.fechaInicio)) &&
            (!newFilters.fechaFin || new Date(pedido.fechaPedido) <= new Date(newFilters.fechaFin))
        );

        setFilteredPedidos(filtered);
    };

    const clearFilters = () => {
        setFilters({
            fechaInicio: '',
            fechaFin: ''
        });
        setFilteredPedidos(pedidos);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 mx-4">
            <h1 className="text-center text-4xl font-bold mb-4 text-dark">Pedidos en cuenta corriente</h1>

            <div className="flex space-x-4 mb-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Fecha de inicio</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={filters.fechaInicio}
                        onChange={handleFilterChange}
                        className="border p-2 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Fecha de fin</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={filters.fechaFin}
                        onChange={handleFilterChange}
                        className="border p-2 rounded-md"
                    />
                </div>
                <button
                    onClick={clearFilters}
                    className="bg-red-500 text-white px-4 py-2 rounded-md self-end mt-6"
                >
                    Borrar Filtros
                </button>
            </div>

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
                    {filteredPedidos.map((pedido) => (
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
