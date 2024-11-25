import { useState } from "react";
import { Link } from "react-router-dom";
import { SelectInput, TextInput, DateInput, EmailInput, PasswordInput, NumberInput, GenericInput } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import { getUserConfirmacionMsg, getUserErrorMsg } from "../../utils/messages";
import { tipoUsuariosOptions } from "../../utils/options";

export const CrearUsuario = () => {
  /* STATES FOR THE INPUTS */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const crearUsuario = () => {

    let fechaFormateada = fechaNacimiento.split("-").reverse().join("-");

    const personaDto = {
      dni,
      nombre,
      apellido,
      numeroTelefono,
      direccion,
      fechaNacimiento: fechaFormateada,
    };

    // Crear user con personaDto anidado
    const user = {
      email,
      password,
      tipoUsuario,
      personaDto,
    };

    email !== "" &&
      password !== "" &&
      tipoUsuario !== "" &&
      dni !== "" &&
      nombre !== "" &&
      apellido !== "" &&
      numeroTelefono !== "" &&
      direccion !== "" &&
      fechaNacimiento < getTodayDate()
      ? getUserConfirmacionMsg(user)
      : getUserErrorMsg("Creacion");
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Usuario"}
        subtitle={"Agregar Nuevo Usuario"}
        color={"text-indigo-400"}
      />

      <div className="bg-gray-800 mt-10 rounded-lg">
        <div className="row p-3">
          <div className="col-6">
            <TextInput
              inputTitle={"Nombre"}
              value={nombre}
              setValue={setNombre}
              inputName={"nombreUser"}
              col={12}
              marginT={"mt-0"}
            />
            <TextInput
              inputTitle={"Apellido"}
              value={apellido}
              setValue={setApellido}
              inputName={"apellidoUser"}
              col={12}
              marginT={"mt-4"}
            />
            <NumberInput
              inputTitle={"DNI"}
              value={dni}
              setValue={setDni}
              inputName={"dniUser"}
              col={12}
              marginT={"mt-4"}
            />
            <EmailInput
              inputTitle={"Email"}
              value={email}
              setValue={setEmail}
              inputName={"emailUser"}
              col={12}
              marginT={"mt-4"}
            />
            <PasswordInput
              inputTitle={"Contraseña"}
              value={password}
              setValue={setPassword}
              inputName={"passwordUser"}
              col={12}
              marginT={"mt-4"}
            />
          </div>
          <div className="col-6">
            <SelectInput
              inputTitle={"Tipo de Usuario"}
              value={tipoUsuario}
              setValue={setTipoUsuario}
              dataOptions={tipoUsuariosOptions}
              inputName={"tipoUsuarioOptionMenu"}
              col={12}
              marginT={"mt-0"}
            />

            <DateInput
              inputTitle={"Fecha de Nacimiento"}
              value={fechaNacimiento}
              setValue={setFechaNacimiento}
              inputName={"fechaNacimientoUser"}
              col={12}
              marginT={"mt-4"}
              today={getTodayDate()}
            />

            <NumberInput
              inputTitle={"Celular"}
              value={numeroTelefono}
              setValue={setNumeroTelefono}
              inputName={"numeroTelefonoUser"}
              col={12}
              marginT={"mt-4"}
            />

            <GenericInput
              inputTitle={"Direccion"}
              value={direccion}
              setValue={setDireccion}
              inputName={"direccionUser"}
              col={12}
              marginT={"mt-4"}
              keyPressEvent={(e) => {
                // Permitir cualquier carácter, no se bloquea ninguna tecla
              }}
              onChange={(e) => {
                // Aceptar cualquier valor ingresado en el campo
                setDireccion(e.target.value);
              }}
            />



            <div className="flex justify-center mt-10">
              <Link
                to={"/GestionarUsuarios"}
                className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
              >
                <span className=" text-xl">Cancelar</span>
              </Link>
              <Link
                to={"/GestionarUsuarios"}
              >
                <button
                  className="w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10"
                  onClick={crearUsuario}
                >
                  <span className=" text-xl">Agregar Usuario</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
