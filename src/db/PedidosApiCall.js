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
        console.log("dentro de api call" + rootApiRoute + "/Pedidos/Crear");        
        console.log("antes del post " + pedido);
        const response = await axios.post(rootApiRoute + "/Pedidos/Crear", pedido);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getPedidoApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/Pedidos/"+ id);
        return response.data;
    } catch (error) {
        throw error;
    }    
}