import axios from "axios";
import { rootApiRoute } from "./GlobalApiConfig";


export const getAllPedidosApiCall = async () => {
    try {
        console.log("dentro de apicall")
        const response = await axios.get(rootApiRoute + "/pedidos");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewPedidoApiCall = async (pedido) => {
    try {
        const response = await axios.post(rootApiRoute + "/pedidos", pedido);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getPedidoApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/pedidos/"+ id);
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateEstadoPedidoApiCall = async (id, nuevoEstado) => {
    try {
        console.log(id);
        console.log(nuevoEstado);
        // Envía directamente nuevoEstado como un String en el cuerpo de la solicitud
        const response = await axios.put(rootApiRoute + "/pedidos/cambiarestado/" + id, nuevoEstado, {
            headers: {
                'Content-Type': 'text/plain' // Asegúrate de que el tipo de contenido sea correcto
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el estado del pedido:', error);
        throw error;
    }    
}
