import axios from "axios";
import { rootApiRoute } from "./GlobalApiConfig";

export const loginApiCall = async (email, contraseña) => {
    // Crea el objeto usuarioDto
    const usuarioDto = {
        email: email,
        password: contraseña
    };

    try {
        const response = await axios.post(rootApiRoute + "/usuarios/login", usuarioDto);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllUserApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewUserApiCall = async (usuario) => {
    try {
        const response = await axios.post(rootApiRoute + "/usuarios", usuario);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteUserApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/usuarios/"+ id);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export const getUserApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateUserApiCall = async (id, usuario) => {
    try {
        console.log('Updating user:', usuario);
        const response = await axios.put(rootApiRoute + "/usuarios/"+id, usuario);        
        return response;
    } catch (error) {
        throw error;
    }
}