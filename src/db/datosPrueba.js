export const menus = [
    {
        id: 1,
        titulo: "Napo con papas",
        descripcion: "Milanesas napolitanas con papas",
        precio: 1500,
        tipoMenu: "Almuerzo/Cena",
        disponibilidad: true,
    },
    {
        id: 2,
        titulo: "Ñoquis",
        descripcion: "Plato de Ñoquis con salsa roja",
        precio: 1000,
        tipoMenu: "Almuerzo/Cena",
        disponibilidad: true,
    },
    {
        id: 3,
        titulo: "Lasagña",
        descripcion: "Plato de Lasagña para compartir",
        precio: 2000,
        tipoMenu: "Almuerzo/Cena",
        disponibilidad: true,
    },
    {
        id: 4,
        titulo: "Pastel de papa",
        descripcion: "Plato para compartir",
        precio: 1700,
        tipoMenu: "Almuerzo/Cena",
        disponibilidad: false,
    },
];


export const pedidosRealizados = [
    {
        id: 1,
        usuario: 'Sebastian Epstein',
        estado: 'Entregado',
        fechaHora: '08/08/2022 || 15:20',
        cantidadMenus: '12',
        total: 14500,
        pedidos: [
            {
                id: 1,
                titulo: "Napo con papas",
                descripcion: "Milanesas napolitanas con papas",
                tipoMenu: "Almuerzo/Cena",
                precio: 1500,
                cantidad: 5,
            },
            {
                id: 2,
                titulo: "Ñoquis",
                descripcion: "Plato de Ñoquis con salsa roja",
                tipoMenu: "Almuerzo/Cena",
                precio: 1000,
                cantidad: 7,
            },
        ]
    },
    {
        id: 2,
        usuario: 'Facundo Sichi',
        estado: 'Entregado',
        fechaHora: '08/08/2022 || 15:20',
        cantidadMenus: '7',
        total: 9400,
        pedidos: [
            {
                id: 1,
                titulo: "Lasagña",
                descripcion: "Plato de Lasagña para compartir",
                tipoMenu: "Almuerzo/Cena",
                precio: 2000,
                cantidad: 2,
            },
            {
                id: 2,
                titulo: "Ñoquis",
                descripcion: "Plato de Ñoquis con salsa roja",
                tipoMenu: "Almuerzo/Cena",
                precio: 1000,
                cantidad: 3,
            },
            {
                id: 3,
                titulo: "Pastel de papa",
                descripcion: "Plato para compartir",
                tipoMenu: "Almuerzo/Cena",
                precio: 1700,
                cantidad: 2
            }
        ]
    },
    {
        id: 3,
        usuario: 'Valentina Rodriguez',
        estado: 'En Proceso',
        fechaHora: '08/08/2022 || 15:20',
        cantidadMenus: '12',
        total: 19100,
        pedidos: [
            {
                id: 1,
                titulo: "Lasagña",
                descripcion: "Plato de Lasagña para compartir",
                tipoMenu: "Almuerzo/Cena",
                precio: 2000,
                cantidad: 2,
            },
            {
                id: 2,
                titulo: "Ñoquis",
                descripcion: "Plato de Ñoquis con salsa roja",
                tipoMenu: "Almuerzo/Cena",
                precio: 1000,
                cantidad: 5,
            },
            {
                id: 3,
                titulo: "Pastel de papa",
                descripcion: "Plato para compartir",
                tipoMenu: "Almuerzo/Cena",
                precio: 1700,
                cantidad: 3
            },
            {
                id: 4,
                titulo: "Napo con papas",
                descripcion: "Milanesas napolitanas con papas",
                tipoMenu: "Almuerzo/Cena",
                precio: 1500,
                cantidad: 2,
            },
        ]
    },
]


export const carritoCompras = [
    {
        id: 1,
        titulo: 'Lasagna',
        cantidad: 10,
        precio: 500,
        subTotal: 5000
    },
    {
        id: 2,
        titulo: 'Napo con Papas',
        cantidad: 5,
        precio: 350,
        subTotal: 1550
    },
]