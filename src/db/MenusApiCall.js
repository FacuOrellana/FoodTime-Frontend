import axios from "axios";

import { rootApiRoute } from "./GlobalApiConfig";

export const getAllMenusApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/menus");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewMenuApiCall = async (menu) => {
    try {
        console.log(menu);
        const response = await axios.post(rootApiRoute + "/menus", menu);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteMenuApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/menus/"+ id);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export const getMenuApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/menus/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateMenuApiCall = async (id, menu) => {
    try {
        console.log(menu);
        const response = await axios.put(rootApiRoute + "/menus/"+id, menu);        
        return response;
    } catch (error) {
        throw error;
    }
}