import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { NumberInput, TextInput } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import { getInsumoApiCall } from "../../db/InsumoApiCall";
import {
  getInsumoEditConfirmacionMsg,
  getInsumoErrorMsg,
} from "../../utils/messages";
import { useNavigate } from "react-router-dom";

export const EditarInsumo = () => {
  const { id } = useParams(); // Obtenemos el id del menú desde los parámetros de la URL
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [precio, setPrecio] = useState(0);

  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchInsumo = async () => {
      if (hasFetched.current) return; //  ya se ejecutó DETENGO
      hasFetched.current = true; // Marco que ya se ejecuto

      try {
        const insumo = await getInsumoApiCall(id);
        setNombre(insumo.nombre);
        setUnidad(insumo.unidad);
        setPrecio(insumo.precio);
      } catch (error) {
        console.error("Error fetching insumo:", error);
      }
    };
    fetchInsumo();
  }, [id]);

  const editInsumo = () => {
    const isValid = nombre && unidad && precio;
    if (isValid) {
      const insumoData = {
        id, // Agregamos el id del insumo
        nombre,
        unidad,
        precio,
      };
      getInsumoEditConfirmacionMsg(insumoData);
      navigate("/GestionarInsumos");
    } else {
      getInsumoErrorMsg("Edicion");
    }
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Insumo"}
        subtitle={"Editar Insumo"}
        color={"text-indigo-400"}
      />

      <div className="bg-gray-800 mt-10 rounded-lg">
        <div className="row p-3">
          <div className="col-6">
            <TextInput
              inputTitle={"Nombre"}
              value={nombre}
              setValue={setNombre}
              inputName={"nombreInsumo"}
              col={12}
              marginT={"mt-0"}
            />
            <TextInput
              inputTitle={"Unidad"}
              value={unidad}
              setValue={setUnidad}
              inputName={"unidadInsumo"}
              col={12}
              marginT={"mt-4"}
            />
          </div>
          <div className="col-6">
            <NumberInput
              inputTitle={"Precio"}
              inputName={"precioInsumo"}
              placeholder={"$"}
              col={12}
              marginT={"mt-0"}
              value={precio}
              setValue={setPrecio}
              keyPressEvent={(event) => {
                if (!/[0-9.]/.test(event.key)) event.preventDefault();
              }}
            />

            <div className="flex justify-center mt-10">
              <Link
                to={"/GestionarInsumos"}
                className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
              >
                <span className="text-xl">Cancelar</span>
              </Link>
              <button
                className="w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10"
                onClick={editInsumo}
              >
                <span className="text-xl">Editar Insumo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
