import axios from "axios";
import { rootApiRoute } from "./GlobalApiConfig";

export const getPedidosByPersonaApiCall = async (personaId) => {
    try {
        const response = await axios.get(rootApiRoute + "/reportes/pedidoByPersona/" + personaId);
        return response;
    } catch (error) {
        throw error;
    }    
};



export const getPedidosByDniApiCall = async (dni) => {

    try {
        const response = await axios.get(rootApiRoute + "/reportes/pedidoByDni/" + dni);
        return response;
    } catch (error) {
        throw error;
    }

    
};
export const getInsumosPorFechaApiCall = async (fechaInicio, fechaFin) => {
    console.log(fechaInicio);
    console.log(fechaFin);

    try {
        const response = await axios.get('/reportes/insumosPorFecha', {
            params: {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            }
        });
        console.log(response.data);  // Aquí se asegura de imprimir la respuesta de los datos
        return response;  // Retorna solo los datos
    } catch (error) {
        console.error('Error:', error);
        throw error;  // Lanza el error para que pueda ser manejado en otro lugar
    }
};
