import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nuevaContraseñaApiCall } from "../../db/usuariosApiCall";

const NuevaContraseña = () => {
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");

    const navigate = useNavigate(); // hook para la navegación

    const handleEstablecerContraseña = async (e) => {
        e.preventDefault();
        setMensaje("");
        setErrorMessage("");

        if (nuevaContraseña !== confirmarContraseña) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        if (nuevaContraseña.length < 6) {
            setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const response = await nuevaContraseñaApiCall(userId, nuevaContraseña); // Añadido `await` aquí
            if (response.status === 200) {
                setMensaje("¡Contraseña actualizada con éxito! Puedes iniciar sesión ahora.");
                setTimeout(() => {
                    navigate("/"); // Redirige a la página de inicio
                }, 3000); // Espera 3 segundos antes de redirigir
            }
        } catch (error) {
            setErrorMessage("Hubo un error al intentar actualizar la contraseña. Intenta nuevamente.");
        }
    };

    return (
        <div style={styles.container}>
            <div className="mt-4">
                <a>
                    <h2 className="font-bold text-5xl mb-5">
                        Food{" "}
                        <span className="bg-[#f84525] text-white px-2 rounded-md">
                            TIME
                        </span>
                    </h2>
                </a>
            </div>

            <form style={styles.form} onSubmit={handleEstablecerContraseña}>
                <h5 style={styles.title}>Establece una nueva contraseña</h5>
                <div style={styles.formGroup}>
                    <label htmlFor="nuevaContraseña" style={styles.label}>Nueva Contraseña</label>
                    <input
                        type="password"
                        id="nuevaContraseña"
                        style={styles.input}
                        value={nuevaContraseña}
                        onChange={(e) => setNuevaContraseña(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="confirmarContraseña" style={styles.label}>Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmarContraseña"
                        style={styles.input}
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                {mensaje && <p style={styles.successMessage}>{mensaje}</p>}

                <button type="submit" style={styles.button}>Establecer Contraseña</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f0f2f5",
        fontFamily: "'Roboto', sans-serif",
    },
    title: {
        fontSize: "2rem",
        color: "#333",
        marginBottom: "1rem",
        fontWeight: "500",
    },
    form: {
        width: "100%",
        maxWidth: "600px",
        padding: "4rem",
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
        marginBottom: "1.5rem",
    },
    label: {
        display: "block",
        fontSize: "1rem",
        marginBottom: "0.5rem",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "1rem",
        outline: "none",
        fontFamily: "'Roboto', sans-serif",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#f84525",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
        fontFamily: "'Roboto', sans-serif",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    errorMessage: {
        color: "#d9534f",
        fontSize: "0.9rem",
        marginTop: "0.5rem",
        textAlign: "center",
    },
    successMessage: {
        color: "#5cb85c",
        fontSize: "0.9rem",
        marginTop: "0.5rem",
        textAlign: "center",
    },
};

export default NuevaContraseña;
