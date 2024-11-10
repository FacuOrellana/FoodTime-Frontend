import axios from "axios";
import { rootApiRoute } from "./GlobalApiConfig";

export const getOnePersonaApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/personas/"+ id);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllPersonaApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/personas");
        return response.data;
    } catch (error) {
        throw error;
    }
};
