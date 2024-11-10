import Swal from "sweetalert2";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { TableForDietas } from "../../components/Tables/TableForDietas";
import { getAllDietasApiCall, deleteDietaApiCall } from "../../db/DietasApiCall";
import { getOnePersonaApiCall } from "../../db/personaApiCall";

export const GestionarDietas = () => {
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load dietas only once
  const fetchDietas = useCallback(async () => {
    setLoading(true); // Asegúrate de establecer `loading` en `true` al inicio
    try {
      const data = await getAllDietasApiCall();
      
      const dietasConPersona = await Promise.all(
        data.map(async (dieta) => {
          const persona = await getOnePersonaApiCall(dieta.personaId);
          const personaNombreCompleto = `${persona.data.nombre} ${persona.data.apellido}`;
          
          return {
            ...dieta,
            personaNombreCompleto,
          };
        })
      );
  
      setDietas(dietasConPersona); // Asigna el array transformado
      console.log(dietasConPersona);
    } catch (error) {
      console.error("Error fetching dietas:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchDietas();
  }, [fetchDietas]);

  const deleteDieta = async (id) => {
        const result = await Swal.fire({
          icon: "info",
          title: "¿Está seguro?",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
          try {
            await deleteDietaApiCall(id);
            setDietas((prevDietas) => prevDietas.filter((dieta) => dieta.id !== id));
          } catch (error) {
            console.error("Error deleting dieta:", error);
          }
          Swal.fire("Dieta eliminada con éxito!", "", "success");
      } else if (result.isDenied) {
          Swal.fire("Eliminación de dieta cancelada", "", "error");
      }

  };

  return (
    <section className="p-4 font-sans text-gray-900 antialiased bg-[#f8f4f3] min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestionar Dietas</h1>
        <p className="text-lg text-gray-600 mt-2">
          Crea, modifica y elimina dietas fácilmente desde este módulo.
        </p>
      </div>

      <div className="flex justify-center">
        <Link to={"/GestionarDietas/Crear"}>
          <button className="w-80 bg-gradient-to-r from-blue-500 to-orange-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300">
            <span className="text-xl">Crear Dieta</span>
          </button>
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg bg-white">
            {loading ? (
              <p className="text-center py-8">Cargando Dietas...</p>
            ) : (
              <TableForDietas data={dietas} deleteDieta={deleteDieta} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
