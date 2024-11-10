import React, { useState } from "react";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRecuperarContraseña = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensaje anterior
    setErrorMessage(""); // Limpiar error anterior

    // Validar el email
    if (!email) {
      setErrorMessage("Por favor ingresa un correo electrónico.");
      return;
    }

    // Simular la llamada a la API para enviar el correo de recuperación
    try {
      // Aquí puedes integrar la lógica real para enviar el correo, como llamar a una API
      // Suponiendo que todo salió bien
      setMensaje("¡Correo de recuperación enviado con éxito! Revisa tu bandeja de entrada y la carpeta de spam");
    } catch (error) {
      setErrorMessage("Hubo un error al intentar enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <a >
            <h2 className="font-bold text-3xl">
              Food{" "}
              <span className="bg-[#f84525] text-white px-2 rounded-md">
                TIME
              </span>
            </h2>
          </a>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={handleRecuperarContraseña}>
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Recuperar Contraseña</span>
              </center>
            </div>

            {/* Mensajes de Error y Éxito */}
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {errorMessage}
              </div>
            )}
            {mensaje && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {mensaje}
              </div>
            )}

            {/* Campo de correo */}
            <div>
              <label className="block font-medium text-sm text-gray-700" htmlFor="email">
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

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  Enviar solicitud
                </button>
              </div>
              <div className="mt-3 text-sm text-gray-600 text-center">
                <a
                  href="/"
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContraseña;
