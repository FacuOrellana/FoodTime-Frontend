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
        const response = await axios.get(rootApiRoute + "/personas/");
        return response;
        // TODO
        // TE LO DEJO PARA QUE PROBES CON DATOS FICTICIOS
        // const a = [
        //     {
        //         id: 1,
        //         nombre: "Juan",
        //         apellido: "Pérez",
        //         dni: "12345678",
        //         email: "juan.perez@example.com",
        //         telefono: "555-1234"
        //     },
        //     {
        //         id: 2,
        //         nombre: "Ana",
        //         apellido: "García",
        //         dni: "87654321",
        //         email: "ana.garcia@example.com",
        //         telefono: "555-5678"
        //     },
        //     {
        //         id: 3,
        //         nombre: "Carlos",
        //         apellido: "Rodríguez",
        //         dni: "11223344",
        //         email: "carlos.rodriguez@example.com",
        //         telefono: "555-4321"
        //     }
        // ]

        // return a 
    } catch (error) {
        throw error;
    }
};
