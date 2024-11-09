import Swal from "sweetalert2";
import { createNewMenuApiCall, updateMenuApiCall } from "../db/MenusApiCall";
import { createNewPedidoApiCall } from "../db/PedidosApiCall";
import { createNewInsumoApiCall, updateInsumoApiCall } from "../db/InsumoApiCall";
import { createNewUserApiCall, updateUserApiCall } from "../db/usuariosApiCall";
import { createNewDietaApiCall, updateDietaApiCall } from "../db/DietasApiCall";

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

export const getInsumoConfirmacionMsg = async (insumo) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Agregar insumo?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await createNewInsumoApiCall(insumo); // Espera la llamada a la API
        Swal.fire("insumo creado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Creación de menú cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getInsumoEditConfirmacionMsg = async (insumo) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Está seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await updateInsumoApiCall(insumo.id, insumo); // Espera la llamada a la API
        Swal.fire("Insumo editado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Edición de insumo cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getInsumoErrorMsg = (actionText) => {
    return Swal.fire({
        icon: "error",
        title: `Error en la ${actionText} del insumo`, // Corrección de la interpolación
        text: "Por favor complete todos los atributos del insumo",
        confirmButtonText: "Aceptar",
    });
};

export const getUserConfirmacionMsg = async (usuario) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Agregar usuario?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await createNewUserApiCall(usuario); // Espera la llamada a la API
        Swal.fire("usuario creado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Creación de usuario cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getUserEditConfirmacionMsg = async (usuario) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Está seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await updateUserApiCall(usuario.id, usuario); // Espera la llamada a la API
        Swal.fire("Usuario editado con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Edición de usuario cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getUserErrorMsg = (actionText) => {
    return Swal.fire({
        icon: "error",
        title: `Error en la ${actionText} del usuario`, // Corrección de la interpolación
        text: "Por favor complete todos los atributos del usuario",
        confirmButtonText: "Aceptar",
    });
};

export const getUserNotifyErrorDateMsg = () => {
    return Swal.fire({
        icon: "error",
        title: `Error en la creación del usuario`, // Corrección de la interpolación
        text: "La fecha de nacimiento no puede ser posterior a hoy",
        confirmButtonText: "Aceptar",
    });
};

export const getDietaConfirmacionMsg = async (dieta) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Agregar dieta?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await createNewDietaApiCall(dieta); // Espera la llamada a la API
        Swal.fire("dieta creada con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Creación de dieta cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getDietaEditConfirmacionMsg = async (dieta) => {
    const result = await Swal.fire({
        icon: "info",
        title: "¿Está seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        await updateDietaApiCall(dieta.id, dieta); // Espera la llamada a la API
        Swal.fire("dieta editada con éxito!", "", "success");
    } else if (result.isDenied) {
        Swal.fire("Edición de dieta cancelada", "", "error");
    }

    return result; // Devuelve el resultado para manejar la redirección
};

export const getDietaErrorMsg = (actionText) => {
    return Swal.fire({
        icon: "error",
        title: `Error en la ${actionText} de la dieta`, // Corrección de la interpolación
        text: "Por favor complete todos los atributos de la dieta",
        confirmButtonText: "Aceptar",
    });
};