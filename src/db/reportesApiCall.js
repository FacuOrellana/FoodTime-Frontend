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