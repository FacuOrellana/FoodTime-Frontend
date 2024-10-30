import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import { getInsumoConfirmacionMsg, getInsumoErrorMsg } from "../../utils/messages";

export const CrearInsumo = () => {
  /* STATES FOR THE INPUTS */

  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [precio, setPrecio] = useState(0);

  const [insumo, setInsumo] = useState({
    nombre: nombre,
    unidad: unidad,
    precio: precio,
  });

  useEffect(() => {
    setInsumo({
    nombre: nombre,
    unidad: unidad,
    precio: precio,
    })
  }, [nombre,unidad,precio]);

  const crearInsumo = () => {

    nombre !== "" &&
    unidad !== "" &&
    precio !== "" 
      ? getInsumoConfirmacionMsg(insumo)
      : getInsumoErrorMsg("Creacion");
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Insumo"}
        subtitle={"Agregar Nuevo Insumo"}
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
          <TextInput
              inputTitle={"Precio"}
              inputName={"precioInsumo"}
              placeholder={"$"}
              col={12}
              marginT={"mt-0"}
              value={precio}
              setValue={setPrecio}
              keyPressEvent={(event) => {
                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

            <div className="flex justify-center mt-10">
              <Link
                to={"/GestionarMenus"}
                className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
              >
                <span className=" text-xl">Cancelar</span>
              </Link>
              <button
                className="w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10"
                onClick={crearInsumo}
              >
                <span className=" text-xl">Agregar Insumo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
