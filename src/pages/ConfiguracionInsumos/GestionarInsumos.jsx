import Swal from "sweetalert2";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { TableForInsumos } from "../../components/Tables/TableForInsumos";
import { getAllInsumoApiCall, deleteInsumoApiCall } from "../../db/InsumoApiCall";

export const GestionarInsumos = () => {
  const [insumo, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load inputs only once
  const fetchInsumos = useCallback(async () => {
    try {
      const data = await getAllInsumoApiCall();
      setInsumos(data);
    } catch (error) {
      console.error("Error fetching insumo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsumos();
  }, [fetchInsumos]);

  const deleteInsumo = async (id) => {
      const result = await Swal.fire({
        icon: "info",
        title: "¿Está seguro?",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        await deleteInsumoApiCall(id);
        setInsumos((prevInsumos) => prevInsumos.filter((insumo) => insumo.id !== id));
      } catch (error) {
        console.error("Error deleting inputs:", error);
      }
      Swal.fire("Insumo eliminado con éxito!", "", "success");
  } else if (result.isDenied) {
      Swal.fire("Eliminación de insumo cancelado", "", "error");
  }

  };

  return (
    <section className="p-4 font-sans text-gray-900 antialiased bg-[#f8f4f3] min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestionar Insumos</h1>
        <p className="text-lg text-gray-600 mt-2">
          Crea, modifica y elimina insumos fácilmente desde este módulo.
        </p>
      </div>

      <div className="flex justify-center">
        <Link to={"/GestionarInsumos/Crear"}>
          <button className="w-80 bg-gradient-to-r from-blue-500 to-orange-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300">
            <span className="text-xl">Crear Insumo</span>
          </button>
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg bg-white">
            {loading ? (
              <p className="text-center py-8">Cargando insumos...</p>
            ) : (
              <TableForInsumos data={insumo} deleteInsumo={deleteInsumo} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
