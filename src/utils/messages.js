
import Swal from "sweetalert2";
import { createNewMenuApiCall, updateMenuApiCall } from "../db/MenusApiCall";
import { createNewPedidoApiCall } from "../db/PedidosApiCall";

export const getCarritoConfirmacionMsg = (pedido) => {

    return Swal.fire({
        icon: "info",
        title: "¿Confirmar pedido?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Pedido Realizado!",
                "Gracias por confiar en nosotros",
                "success"
            ).then((result) => {
                // if (result.isConfirmed) {
                //     window.location = '/ListarPedido';
                // }
            })
            createNewPedidoApiCall(pedido);
            window.location = '/';
        } else if (result.isDenied) {
            Swal.fire("Pedido Cancelado", "", "error");
        }
    });
}


export const getMenuConfirmacionMsg = (menu) => {


    return Swal.fire({
        icon: "info",
        title: "¿Agregar menu?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Menu creado con Exito!",
                "",
                "success"
            );
            
            console.log(typeof(menu.disponibilidad));
            console.log("dentro de crear menu: " + menu)
            createNewMenuApiCall(menu);
            window.location = '/';

        } else if (result.isDenied) {
            Swal.fire("Creacion de Menu cancelada", "", "error");
        }
    });
}

export const getMenuErrorMsg = (actionText) => {

    return Swal.fire({
        icon: "error",
        title: `Error en la ${actionText} del Menu`,
        text: "Por favor complete todos los atributos del menu",
        confirmButtonText: "Aceptar",
    });
}

export const getMenuEditConfirmacionMsg = (menu) => {

    return Swal.fire({
        icon: "info",
        title: "¿Esta seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Menu editado con Exito!",
                "",
                "success"
            );
        
            updateMenuApiCall(menu.id, menu);
            window.location = '/';
        } else if (result.isDenied) {
            Swal.fire("Edicion de Menu cancelada", "", "error");
        }
    });
}