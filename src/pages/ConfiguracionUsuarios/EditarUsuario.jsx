import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { SelectInput, TextInput, DateInput, EmailInput, PasswordInput } from "../../components/Inputs";
import { PageTitles } from "../../components/PageTitles/PageTitles";
import {
  getUserEditConfirmacionMsg,
  getUserErrorMsg,
  getUserNotifyErrorDateMsg,
} from "../../utils/messages";
import { useNavigate } from "react-router-dom";
import { getUserApiCall } from "../../db/usuariosApiCall";
import { tipoUsuariosOptions } from "../../utils/options";

export const EditarUsuario = () => {
  const { id } = useParams(); // Obtenemos el id del menú desde los parámetros de la URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [personaId, setPersonaId] = useState("");

  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (hasFetched.current) return; //  ya se ejecutó DETENGO
      hasFetched.current = true; // Marco que ya se ejecuto

      try {
        const user = await getUserApiCall(id);
        setEmail(user.email);
        setPassword(user.password);
        setTipoUsuario(user.tipoUsuario);
        setDni(user.personaDto.dni);
        setNombre(user.personaDto.nombre);
        setApellido(user.personaDto.apellido);
        setNumeroTelefono(user.personaDto.numeroTelefono);
        setDireccion(user.personaDto.direccion);
        const fechaFormateada = user.personaDto.fechaNacimiento.split("-").reverse().join("-");
        setFechaNacimiento(fechaFormateada);
        setPersonaId(user.personaDto.id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const editUser = () => {
    const isValid = email && password && tipoUsuario &&
      dni && nombre && apellido &&
      numeroTelefono && direccion && fechaNacimiento;

    if (isValid) {
      // Validación de que la fecha de nacimiento no es futura
      if (fechaNacimiento > getTodayDate()) {
        getUserNotifyErrorDateMsg();
        return;
      }

      let fechaFormateada = fechaNacimiento.split("-").reverse().join("-");

      const personaDto = {
        id: personaId,
        dni,
        nombre,
        apellido,
        numeroTelefono,
        direccion,
        fechaNacimiento: fechaFormateada,
      };

      const userData = {
        id,
        email,
        password,
        tipoUsuario,
        personaDto,
      };
      getUserEditConfirmacionMsg(userData);
      navigate("/GestionarUsuarios");
    } else {
      getUserErrorMsg("Edicion");
    }
  };

  return (
    <section className="p-4">
      <PageTitles
        title={"Gestion de Usuarios"}
        subtitle={"Editar Usuario"}
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
            <TextInput
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
              inputTitle={"Password"}
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
              inputTitle={"Fecha de Nacimiento "}
              value={fechaNacimiento}
              setValue={setFechaNacimiento}
              inputName={"fechaNacimientoUser"}
              col={12}
              marginT={"mt-4"}
              today={getTodayDate()}
            />

            <TextInput
              inputTitle={"Celular"}
              value={numeroTelefono}
              setValue={setNumeroTelefono}
              inputName={"numeroTelefonoUser"}
              col={12}
              marginT={"mt-4"}
            />

            <TextInput
              inputTitle={"Direccion"}
              value={direccion}
              setValue={setDireccion}
              inputName={"direccionUser"}
              col={12}
              marginT={"mt-4"}
            />
            <div className="flex justify-center mt-10">
              <Link
                to={"/GestionarUsuarios"}
                className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
              >
                <span className="text-xl">Cancelar</span>
              </Link>
              <button
                className="w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10"
                onClick={editUser}
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
