export const getTotalPedido = (carrito) => {

    var totalPedido = 0;

    carrito.forEach(pedido => {
        totalPedido = totalPedido + pedido.subTotal;
    });

    return totalPedido;
}

export const getTotalArticulos = (carrito) => {

    var totalArticulos = 0;

    carrito.forEach(pedido => {
        totalArticulos = totalArticulos + pedido.cantidad;
    });

    return totalArticulos;
}