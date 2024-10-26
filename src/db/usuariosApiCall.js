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
