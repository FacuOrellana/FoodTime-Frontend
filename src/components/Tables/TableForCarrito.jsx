import React from 'react';

export const TableForCarrito = ({ data, onRemove }) => {
    const headers = ['Menu', 'Cantidad', 'Precio', 'SubTotal', 'Accion'];

    return (
        <table className="table border text-center">
            <thead className="border-b bg-gray-800 rounded-2xl">
                <tr>
                    {headers.map((item, index) => (
                        <th key={index} scope="col" className="text-sm font-medium text-gray-100 px-0 py-4 text-center">
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="bg-white border-b">
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.titulo}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.cantidad}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-cyan-200 text-gray-800 p-2 rounded-md">$ {item.precio}</span>
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-teal-200 text-gray-800 p-2 rounded-md">$ {item.precio * item.cantidad}</span>
                        </td>
                        <td className="flex justify-center border-none mt-1">
                            <button 
                                className="bg-rose-500 text-gray-100 p-2 w-14 rounded-md mr-5" 
                                onClick={() => onRemove(item.id)}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
