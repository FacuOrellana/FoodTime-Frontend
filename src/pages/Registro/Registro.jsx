import React, { useState } from "react";
import { DateInput } from "../../components/Inputs";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {createNewUserApiCall} from '../../db/usuariosApiCall'

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function Registro() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [repetirPasswordVisible, setRepetirPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepetirPasswordVisible(!repetirPasswordVisible);
  };

  const handleCrearUsuario = (e) => {
    e.preventDefault();

    let fechaFormateada = fechaNacimiento.split("-").reverse().join("-");

    const personaDto = {
      id:null,
      dni,
      nombre,
      email,
      numeroTelefono: telefono,
      direccion,
      fechaNacimiento: fechaFormateada
    };

    const usuarioDto = {
      id:null,
      email,
      tipoUsuario: "PACIENTE",
      personaDto: personaDto,
      password
    };
    
    email !== "" &&
    password !== "" &&
    dni !== "" &&
    nombre !== "" &&
    apellido !== "" &&
    telefono !== "" &&
    direccion !== "" &&
    fechaNacimiento < getTodayDate() 
      ? createNewUserApiCall(usuarioDto) //llamado a la api con el usuario
      : getUserErrorMsg("registro"); //mostrar cartel de error en el registro

      console.log(usuarioDto);

      navigate("/"); //al final vuelvo a la ventana de login

  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const getUserErrorMsg = (contexto) => {
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: `Por favor, completa todos los campos requeridos para continuar con el ${contexto}.`,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#d33',
    });
  };


  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <a href="/">
            <h2 className="font-bold text-3xl">
              Food{" "}
              <span className="bg-[#f84525] text-white px-2 rounded-md">
                TIME
              </span>
            </h2>
          </a>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form>
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Registro</span>
              </center>
            </div>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {errorMessage}
              </div>
            )}

            <div>
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                name="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                name="apellido"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="dni"
              >
                DNI
              </label>
              <input
                name="dni"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>
            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="repetir-contrasenia-password"
              >
                Repetir contraseña
              </label>
              <div className="relative">
                <input
                  id="repetir-contrasenia-password"
                  type={repetirPasswordVisible ? "text" : "password"}
                  name="repetir-contrasenia-password"
                  placeholder="Repetir contraseña"
                  required
                  autoComplete="current-password"
                  value={repetirPassword}
                  onChange={(e) => setRepetirPassword(e.target.value)}
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button"
                    onClick={toggleRepeatPasswordVisibility}
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                name="telefono"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="direccion"
              >
                Direccion
              </label>
              <input
                name="direccion"
                placeholder="Dirrecion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="fecha-nacimienot"
              >
                Fecha de Nacimiento
              </label>

              <DateInput
                value={fechaNacimiento}
                setValue={setFechaNacimiento}
                inputName={"fechaNacimientoUser"}
                col={12}
                today={getTodayDate()}
              />
            </div>

            <div className="flex items-center justify-center mt-4 space-x-4">
              <button
                type="button"
                onClick={navigateToLogin}
                className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-700 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Volver
              </button>
              <button
                type="submit"
                onClick={handleCrearUsuario}
                className="inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
