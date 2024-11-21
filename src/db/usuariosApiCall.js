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
        console.log(usuario);
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
        console.log(id);
        const response = await axios.get(rootApiRoute + "/usuarios/"+ id);
        
        return response.data;
    } catch (error) {
        throw error;
    }    
}

export const updateUserApiCall = async (id, usuario) => {
    try {
        console.log('Updating user:');
        console.log(usuario);
        const response = await axios.put(rootApiRoute + "/usuarios/"+id, usuario);        
        return response;
    } catch (error) {
        throw error;
    }
}

export const recuperarContraseñaApiCall = async (email) => {
    try {
      const response = await axios.post(rootApiRoute + "/usuarios/recuperar-contraseña", {
        email: email // Enviar el email como parte del cuerpo de la solicitud
      });
      return response;
    } catch (error) {
      throw error; // Re-lanzamos el error para que sea manejado por el que llama esta función
    }
  }

  
  export const nuevaContraseñaApiCall = async (userId, nuevaContraseña) => {
    try {
      const response = await axios.post(rootApiRoute + "/usuarios/nueva-contraseña", {
        userId: userId,
        nuevaContraseña: nuevaContraseña
      }, {
        headers: { 'Content-Type': 'application/json' }
      });  
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  
