import axios from "axios";

import { rootApiRoute } from "./GlobalApiConfig";

export const getAllInsumosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/insumos");
        return response.data;
    } catch (error) {
        throw error;
    }
}