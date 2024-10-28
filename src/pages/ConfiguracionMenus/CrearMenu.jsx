import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SelectInput, TextInput } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import { getMenuConfirmacionMsg, getMenuErrorMsg } from "../../utils/messages";
import { disponibilidadOptions, tipoMenuOptions } from "../../utils/options";

export const CrearMenu = () => {
  /* STATES FOR THE INPUTS */

  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [disponilidadOptions, setDisponilidadOptions] = useState(true);
  const [tipoOptions, setTipoOptions] = useState("");
  const [menuInsumo, setMenuInsumo] = useState([]);

  const [menu, setMenu] = useState({
    titulo: titulo,
    descripcion: descripcion,
    precio: precio,
    tipoMenu: tipoOptions,
    disponibilidad: disponilidadOptions,
    menuInsumoList: menuInsumo
  });

  useEffect(() => {
    setMenu({
    titulo: titulo,
    descripcion: descripcion,
    precio: precio,
    tipoMenu: tipoOptions,
    disponibilidad: disponilidadOptions,
    menuInsumoList: []
    })
  }, [titulo,precio,descripcion,disponilidadOptions,tipoOptions,menuInsumo]);

  const crearMenu = () => {
         
    if (menu.disponibilidad === "true") {
      menu.disponibilidad = true; 
    } else {
      menu.disponibilidad = false 
    }

    titulo !== "" &&
    descripcion !== "" &&
    precio !== "" &&
    disponilidadOptions !== "" &&
    tipoOptions !== ""
      ? getMenuConfirmacionMsg(menu)
      : getMenuErrorMsg("Creacion");
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Menus"}
        subtitle={"Agregar Nuevo Menu"}
        color={"text-indigo-400"}
      />

      <div className="bg-gray-800 mt-10 rounded-lg">
        <div className="row p-3">
          <div className="col-6">
            <TextInput
              inputTitle={"Titulo"}
              value={titulo}
              setValue={setTitulo}
              inputName={"tituloMenu"}
              col={12}
              marginT={"mt-0"}
            />
            <TextInput
              inputTitle={"Descripcion"}
              value={descripcion}
              setValue={setDescripcion}
              inputName={"descripcionMenu"}
              col={12}
              marginT={"mt-4"}
            />
            <TextInput
              inputTitle={"Precio"}
              inputName={"precioMenu"}
              placeholder={"$"}
              col={12}
              marginT={"mt-4"}
              value={precio}
              setValue={setPrecio}
              keyPressEvent={(event) => {
                if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div className="col-6">
            <SelectInput
              inputTitle={"Disponibilidad"}
              value={disponilidadOptions}
              setValue={setDisponilidadOptions}
              dataOptions={disponibilidadOptions}
              inputName={"disponilidadOptionsMenu"}
              col={12}
              marginT={"mt-0"}
            />
            <SelectInput
              inputTitle={"Tipo"}
              value={tipoOptions}
              setValue={setTipoOptions}
              dataOptions={tipoMenuOptions}
              inputName={"tipoOptionsMenu"}
              col={12}
              marginT={"mt-4"}
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
                onClick={crearMenu}
              >
                <span className=" text-xl">Agregar Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
