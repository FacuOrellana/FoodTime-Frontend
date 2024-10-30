import axios from "axios";

import { rootApiRoute } from "./GlobalApiConfig";

export const getAllInsumoApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/insumos");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewInsumoApiCall = async (insumo) => {
    try {
        const response = await axios.post(rootApiRoute + "/insumos", insumo);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteInsumoApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/insumos/"+ id);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export const getInsumoApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/insumos/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateInsumoApiCall = async (id, insumo) => {
    try {
        const response = await axios.put(rootApiRoute + "/insumos/"+id, insumo);        
        return response;
    } catch (error) {
        throw error;
    }
}