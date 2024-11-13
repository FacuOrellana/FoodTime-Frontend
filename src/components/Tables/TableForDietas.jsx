import { useState } from "react";
import { Link } from "react-router-dom";

export const TableForDietas = ({ data, deleteDieta }) => {
    const headers = ['Nro de dieta', 'Nombre y Apellido', 'Detalles', 'Acciones'];
    
    // Estados para los filtros
    const [filterId, setFilterId] = useState('');
    const [filterName, setFilterName] = useState('');

    // Función para limpiar los filtros
    const clearFilters = () => {
        setFilterId('');
        setFilterName('');
    };

    // Filtrado de datos en base a los inputs de filtro
    const filteredData = data.filter(item => {
        const matchesId = filterId === '' || item.id.toString().includes(filterId);
        const matchesName = filterName === '' || item.personaNombreCompleto.toLowerCase().includes(filterName.toLowerCase());
        return matchesId && matchesName;
    });

    return (
        <div className="p-4 mx-4">
            {/* Inputs para los filtros */}
            <div className="flex space-x-4 mb-4">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nro de dieta</label>
                    <input
                        type="text"
                        value={filterId}
                        onChange={(e) => setFilterId(e.target.value)}
                        className="border p-2 rounded-md"
                        placeholder="Filtrar por Nro de dieta"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Nombre y Apellido</label>
                    <input
                        type="text"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        className="border p-2 rounded-md"
                        placeholder="Filtrar por Nombre y Apellido"
                    />
                </div>
                {/* Botón para limpiar filtros */}
                <div className="flex items-end">
                    <button
                        onClick={clearFilters}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            </div>

            {/* Tabla de datos filtrados */}
            <table className="table border text-center w-full mt-4">
                <thead className="border-b bg-blue-900 rounded-2xl">
                    <tr>
                        {headers.map((item, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="text-sm font-medium text-white px-0 py-4 text-center"
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr className="bg-white border-b" key={item.id}>
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
        </div>
    );
};
