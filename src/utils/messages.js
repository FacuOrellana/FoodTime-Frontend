import Swal from "sweetalert2";
import { createNewMenuApiCall, updateMenuApiCall } from "../db/MenusApiCall";
import { createNewPedidoApiCall } from "../db/PedidosApiCall";

export const getCarritoConfirmacionMsg = async (pedido) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Confirmar pedido?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });
    
    if (result.isConfirmed) {
        await createNewPedidoApiCall(pedido); // Espera la llamada a la API
        Swal.fire("Pedido Realizado!", "Gracias por confiar en nosotros", "success");
    } else if (result.isDenied) {
        Swal.fire("Pedido Cancelado", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getMenuConfirmacionMsg = async (menu) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Agregar menú?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await createNewMenuApiCall(menu); // Espera la llamada a la API
        Swal.fire("Menú creado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Creación de menú cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getMenuEditConfirmacionMsg = async (menu) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Está seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await updateMenuApiCall(menu.id, menu); // Espera la llamada a la API
        Swal.fire("Menú editado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Edición de menú cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getMenuErrorMsg = (actionText) => {
    return Swal.fire({
        icon: "error",
        title: `Error en la ${actionText} del menú`, // Corrección de la interpolación
        text: "Por favor complete todos los atributos del menú",
        confirmButtonText: "Aceptar",
    });
};
