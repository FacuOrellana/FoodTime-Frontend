import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateInputMin, GenericInput, SelectInput, TextInput, } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import { getDietaConfirmacionMsg, getDietaErrorMsg, } from "../../utils/messages";
import { getAllMenusApiCall } from "../../db/MenusApiCall";
import { getAllPersonaApiCall } from "../../db/personaApiCall";
import { tipoMenuOptions } from "../../utils/options";

export const CrearDieta = () => {
  const [detalles, setDetalle] = useState("");
  const [dietaMenu, setDietaMenu] = useState([]);
  const [menus, setMenus] = useState([]);
  const [persona, setPersona] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [tipoOptions, setTipoOptions] = useState("");
  const [diaMenu, setDiaMenu] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [dieta, setDieta] = useState({
    persona: selectedPersona,
    detalles: detalles,
    dietaMenuList: dietaMenu,
  });

  useEffect(() => {
    setDieta({
      id: null,
      personaId: selectedPersona,
      detalles,
      dietaMenuList: dietaMenu,
    });
  }, [persona, detalles, dietaMenu]);

  useEffect(() => {
    const obtenerMenus = async () => {
      const data = await getAllMenusApiCall();
      const formattedMenus = data.map((menu) => ({
        id: menu.id,
        name: menu.titulo,
        value: menu.id,
      }));
      setMenus(formattedMenus);
    };
    const obtenerPersona = async () => {
      const persons = await getAllPersonaApiCall();
      const formattedMenus = persons.map((persona) => ({
        id: persona.id,
        name: persona.nombre + " " + persona.apellido,
        value: persona.id,
      }));
      setPersona(formattedMenus);
    };
    obtenerPersona();
    obtenerMenus();
  }, []);

  const agregarMenu = () => {
    if (selectedMenuId && diaMenu && tipoMenuOptions) {
      const nuevoDietaMenu = {
        id:null,
        dietaId: null,
        menuId: selectedMenuId,
        dia: diaMenu,
        tipoMenu: tipoOptions
      };
      setDietaMenu((prevDietaMenu) => [...prevDietaMenu, nuevoDietaMenu]);
      setSelectedMenuId("");
    }
  };

  const handleEliminarMenu = (index) => {
    const nuevaLista = dietaMenu.filter((_, i) => i !== index);
    setDietaMenu(nuevaLista);
  };

  const crearDieta = () => {
    console.log(dieta);
    persona && detalles
      ? getDietaConfirmacionMsg(dieta)
      : getDietaErrorMsg("Creacion");
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Dietas"}
        subtitle={"Crear Dieta"}
        color={"text-indigo-400"}
      />

      <div className="bg-gray-800 mt-10 rounded-lg">
        <div className="row p-3">
          <div className="col-6">
            <SelectInput
              inputTitle={"Seleccionar Persona"}
              value={selectedPersona} // El valor seleccionado
              setValue={setSelectedPersona} // La función para actualizar el valor seleccionado
              dataOptions={persona} // Array de opciones de personas
              inputName={"personaSelect"}
              col={12}
            />
          </div>
          <div className="col-6">
            <GenericInput
              inputTitle={"Detalles"}
              value={detalles}
              setValue={setDetalle}
              inputName={"detalleDieta"}
              col={12}
              marginT={"mt-0"}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 mt-10 rounded-lg p-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <SelectInput
              inputTitle={"Seleccionar Menu"}
              value={selectedMenuId}
              setValue={setSelectedMenuId}
              dataOptions={menus}
              inputName={"menuSelect"}
              col={12}
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <SelectInput
              inputTitle={"Tipo"}
              value={tipoOptions}
              setValue={setTipoOptions}
              dataOptions={tipoMenuOptions}
              inputName={"tipoOptionsMenu"}
              col={12}
            />
          </div>
          <div className="w-full md:w-1/3 px-2">
            <DateInputMin
              inputTitle={"Día"}
              value={diaMenu}
              setValue={setDiaMenu}
              inputName={"diaMenu"}
              today={getTodayDate()}
              col={12}
            />
          </div>
        </div>
        <button
          className="mt-4 bg-green-600 text-gray-100 p-2 rounded-lg"
          onClick={agregarMenu}
        >
          Agregar Menu
        </button>

        <div className="mt-4">
          <h4 className="text-gray-300 text-md">Menues Agregados:</h4>
          {dietaMenu.length === 0 ? (
            <p className="text-gray-500">No se han agregado menues.</p>
          ) : (
            <ul className="list-disc list-inside">
              <div className="flex justify-center mt-4">
                <div className="w-full max-w-2xl">
                  <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="text-gray-300 bg-gray-700">
                        <th className="border-b border-gray-600 p-2 text-left">
                          Menu
                        </th>
                        <th className="border-b border-gray-600 p-2 text-left">
                          Tipo Menu
                        </th>
                        <th className="border-b border-gray-600 p-2 text-left">
                          Dia
                        </th>
                        <th className="border-b border-gray-600 p-2 text-left">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dietaMenu.map((menu, index) => {
                        const menuData = menus.find(
                          (item) => item.id === parseInt(menu.menuId)
                        );
                        return (
                          <tr key={index} className="text-gray-300">
                            <td className="border-b border-gray-600 p-2">
                              {menuData
                                ? menuData.name
                                : "Insumo no encontrado"}
                            </td>
                            <td className="border-b border-gray-600 p-2">
                              {menu.tipoMenu}
                            </td>
                            <td className="border-b border-gray-600 p-2">
                              {menu.dia}
                            </td>
                            <td className="border-b border-gray-600 p-2">
                              <button
                                onClick={() => handleEliminarMenu(index)}
                                className="bg-red-600 text-gray-100 px-2 py-1 rounded hover:bg-red-700 transition"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to={"/GestionarDietas"}
          className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
        >
          <span className="text-xl">Cancelar</span>
        </Link>
        <button
          onClick={crearDieta}
          className="ml-4 text-center w-48 bg-green-600 text-gray-100 p-3 rounded-lg hover:bg-green-700"
        >
          <span className="text-xl">Crear Dieta</span>
        </button>
      </div>
    </section>
  );
};
