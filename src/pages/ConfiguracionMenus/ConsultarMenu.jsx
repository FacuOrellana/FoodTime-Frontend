import React, { useEffect, useState } from 'react';
import { getAllMenusApiCall } from '../../db/MenusApiCall';

export const ConsultarMenu = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        getAllMenusApiCall()
            .then(response => {
                setMenus(response);
            })
            .catch(error => {
                console.error("Error fetching menus:", error);
            });
    }, []);

    const groupMenus = (menus) => {
        return menus.reduce((acc, menu) => {
            const groupKey = menu.tipoMenu === "DESAYUNO" || menu.tipoMenu === "MERIENDA" ? "desayunosYMerendas" : "almuerzosYCenas";
            acc[groupKey].push(menu);
            return acc;
        }, { desayunosYMerendas: [], almuerzosYCenas: [] });
    };

    const groupedMenus = groupMenus(menus);

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Catálogo de Menús</h1>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Desayunos y Meriendas</h2>
                <div style={styles.catalogContainer}>
                    {groupedMenus.desayunosYMerendas.map(menu => (
                        <div key={menu.id} style={menu.disponibilidad ? styles.card : styles.cardUnavailable}>
                            <h3 style={menu.disponibilidad ? styles.cardTitle : styles.cardTitleUnavailable}>
                                {menu.titulo}
                            </h3>
                            <p style={styles.description}>{menu.descripcion}</p>
                            <div style={styles.priceAvailabilityContainer}>
                                <p style={styles.price}>Precio: <strong>${menu.precio}</strong></p>
                                <p style={menu.disponibilidad ? styles.availability : styles.availabilityUnavailable}>
                                    {menu.disponibilidad ? "Disponible" : "No disponible"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Almuerzos y Cenas</h2>
                <div style={styles.catalogContainer}>
                    {groupedMenus.almuerzosYCenas.map(menu => (
                        <div key={menu.id} style={menu.disponibilidad ? styles.card : styles.cardUnavailable}>
                            <h3 style={menu.disponibilidad ? styles.cardTitle : styles.cardTitleUnavailable}>
                                {menu.titulo}
                            </h3>
                            <p style={styles.description}>{menu.descripcion}</p>
                            <div style={styles.priceAvailabilityContainer}>
                                <p style={styles.price}>Precio: <strong>${menu.precio}</strong></p>
                                <p style={menu.disponibilidad ? styles.availability : styles.availabilityUnavailable}>
                                    {menu.disponibilidad ? "Disponible" : "No disponible"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '40px',
        width: '100%',
        maxWidth: '1500px',
    },
    sectionTitle: {
        fontSize: '4em',
        color: '#007bff',
        marginBottom: '15px',
        textAlign: 'center',
    },
    catalogContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    card: {
        width: '350px',
        padding: '15px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '250px',
    },
    cardUnavailable: {
        width: '250px',
        padding: '15px',
        borderRadius: '12px',
        backgroundColor: '#d3d3d3', // Gris
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'not-allowed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '300px',
    },
    cardTitle: {
        fontSize: '1.5em',
        color: '#333',
        marginBottom: '10px',
    },
    cardTitleUnavailable: {
        fontSize: '1.5em',
        color: 'red',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1em',
        color: '#666',
        marginBottom: '15px',
        flexGrow: 1,
    },
    priceAvailabilityContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'auto', // Coloca estos elementos al final
    },
    price: {
        fontSize: '1.2em',
        color: '#007bff',
        fontWeight: 'bold',
        padding: '5px 10px',
        border: '2px solid #007bff',
        borderRadius: '5px',
        backgroundColor: '#e7f1ff',
        margin: '5px 0', // Espacio entre precio y disponibilidad
    },
    availability: {
        fontSize: '1em',
        color: '#28a745',
        fontWeight: 'bold',
        padding: '5px 10px',
        border: '2px solid #28a745',
        borderRadius: '5px',
        backgroundColor: '#d4edda',
    },
    availabilityUnavailable: {
        fontSize: '1em',
        color: '#dc3545',
        fontWeight: 'bold',
        padding: '5px 10px',
        border: '2px solid #dc3545',
        borderRadius: '5px',
        backgroundColor: '#f8d7da',
    },
};

// Agrega un efecto de "hover" para resaltar las cards
styles.card[':hover'] = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
};

styles.cardUnavailable[':hover'] = {
    transform: 'none',
    boxShadow: 'none',
};
