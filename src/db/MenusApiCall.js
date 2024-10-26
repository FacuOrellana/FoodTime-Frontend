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
        console.log("dentro de api call" + rootApiRoute + "/GestionarMenus/Crear");
        console.log(menu);
        const response = await axios.post(rootApiRoute + "/GestionarMenus/Crear", menu);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteMenuApiCall = async (id) => {
    try {
        console.log("id del menu = " + id)
        console.log("dentro de api call: " + rootApiRoute + "/GestionarMenus/");
        const response = await axios.delete(rootApiRoute + "/GestionarMenus/"+ id);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export const getMenuApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/GestionarMenus/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateMenuApiCall = async (id, menu) => {
    try {
        const response = await axios.put(rootApiRoute + "/GestionarMenus/"+id, menu);        
        return response;
    } catch (error) {
        throw error;
    }
}