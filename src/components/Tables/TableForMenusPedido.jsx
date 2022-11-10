import React from 'react'

export const TableForMenusPedido = ({ data }) => {

    const headers = ['Titulo', 'Descripcion', 'Tipo Menu', 'Cantidad de Menus', 'Precio', 'SubTotal'];

    return (
        <table className="table border text-center">
            <thead className="border-b bg-blue-900 rounded-2xl">
                <tr>
                    {headers.map((item) => (
                        <th scope="col" className="text-md font-medium text-gray-100 px-0 py-4 text-center">{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr className="bg-white border-b" id={item.id}>
                        <td className="text-md text-gray-900  px-6 py-4 whitespace-nowrap font-bold">
                            {item.menu.titulo}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.menu.descripcion}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            {item.menu.tipoMenu}
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-orange-200 text-gray-800 px-3 py-2 rounded-md">{item.cantidad}</span>
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-cyan-200 text-gray-800 p-2 rounded-md"> $
                                {new Intl.NumberFormat("de-DE").format(item.menu.precio)}
                            </span>
                        </td>
                        <td className="text-md text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                            <span className="bg-teal-200 text-gray-800 p-2 rounded-md">$
                                {new Intl.NumberFormat("de-DE").format((item.menu.precio * item.cantidad))}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}