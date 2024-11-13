import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInsumosPorFechaApiCall } from "../../db/reportesApiCall";

export const InsumosPorFecha = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const fetchInsumos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getInsumosPorFechaApiCall(fechaInicio, fechaFin);
            // Aseguramos que la data se guarde correctamente en el estado
            console.log(response.data);
            setData(response.data || []);  // Aseguramos que sea un array aunque esté vacío
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    // Evento al buscar por rango de fechas
    const handleSearch = (e) => {
        e.preventDefault();
        fetchInsumos();
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-bold mb-3 text-dark">Reporte de Insumos por Fecha</h1>

            <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
                <label className="mr-2">
                    Fecha Inicio:
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                        className="border p-2 mr-2 rounded-lg"
                    />
                </label>
                <label className="mr-2">
                    Fecha Fin:
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                        className="border p-2 mr-2 rounded-lg"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            {loading && <div>Cargando...</div>}
            {error && <div>Error: {error}</div>}

            <div className="overflow-x-auto flex justify-center">
                <table className="table-auto border text-center mt-4 max-w-lg w-full">
                    <thead className="border-b bg-blue-900 rounded-2xl">
                        <tr>
                            <th className="text-sm font-medium text-white px-4 py-2">Insumo</th>
                            <th className="text-sm font-medium text-white px-4 py-2">Cantidad Utilizada</th>
                            <th className="text-sm font-medium text-white px-4 py-2">Unidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr className="bg-white border-b" key={index}>
                                    <td className="text-md text-gray-900 px-6 py-4 font-bold">{item.insumo}</td>
                                    <td className="text-md text-gray-900 px-6 py-4 font-bold">{item.cantidadUtilizada}</td>
                                    <td className="text-md text-gray-900 px-6 py-4 font-bold">{item.unidad}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-4">
                                    {loading ? "Cargando datos..." : "No hay datos para mostrar."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <button
                onClick={() => navigate("/pedidos")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Volver al menu principal
            </button>
        </div>
    );
};
