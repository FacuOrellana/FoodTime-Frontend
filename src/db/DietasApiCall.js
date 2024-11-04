import axios from "axios";

import { rootApiRoute } from "./GlobalApiConfig";

export const getAllDietasApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/dietas");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewDietaApiCall = async (dieta) => {
    try {
        const response = await axios.post(rootApiRoute + "/dietas", dieta);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteDietaApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/dietas/"+ id);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export const getDietaApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/dietas/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateDietaApiCall = async (id, dieta) => {
    try {
        console.log(dieta);
        const response = await axios.put(rootApiRoute + "/dietas/"+id, dieta);        
        return response;
    } catch (error) {
        throw error;
    }
}