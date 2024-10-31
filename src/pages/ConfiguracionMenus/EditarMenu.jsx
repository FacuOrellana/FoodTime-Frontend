import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SelectInput, TextInput } from '../../components/Inputs';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { getMenuApiCall } from '../../db/MenusApiCall';
import { getMenuEditConfirmacionMsg, getMenuErrorMsg } from '../../utils/messages';
import { disponibilidadOptions, tipoMenuOptions } from '../../utils/options';
import { useNavigate } from 'react-router-dom';
import { getAllInsumoApiCall } from "../../db/InsumoApiCall";

export const EditarMenu = () => {
  const { id } = useParams(); // Obtenemos el id del menú desde los parámetros de la URL
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoOptions, setTipoOptions] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [menuInsumo, setMenuInsumo] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [selectedInsumoId, setSelectedInsumoId] = useState("");
  const [cantidadInsumo, setCantidadInsumo] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getMenuApiCall(id);
        console.log(menu);
        setTitulo(menu.titulo);
        setPrecio(menu.precio);
        setDescripcion(menu.descripcion);
        setDisponibilidad(menu.disponibilidad);
        setTipoOptions(menu.tipoMenu);
        setMenuInsumo(menu.menuInsumoList);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, [id]);

  const handleDisponibilidadChange = (value) => {
    // Convertimos el valor a booleano
    setDisponibilidad(value === 'true');
  };

  useEffect(() => {
    const obtenerInsumos = async () => {
      const data = await getAllInsumoApiCall();
      const formattedInsumos = data.map((insumo) => ({
        id: insumo.id,
        name: insumo.nombre,
        value: insumo.id,
      }));
      setInsumos(formattedInsumos);
    };
    obtenerInsumos();
  }, []);

  const agregarInsumo = () => {
    if (selectedInsumoId && cantidadInsumo > 0) {
      const nuevoMenuInsumo = {
        menuId: null,
        insumoId: selectedInsumoId,
        cantidad: cantidadInsumo,
      };
      setMenuInsumo((prevMenuInsumo) => [...prevMenuInsumo, nuevoMenuInsumo]);
      setSelectedInsumoId("");
      setCantidadInsumo(0);
    }
  };

  const handleEliminarInsumo = (index) => {
    const nuevaLista = menuInsumo.filter((_, i) => i !== index);
    setMenuInsumo(nuevaLista);
  };

  const editMenu = () => {
    const isValid = titulo && descripcion && precio && disponibilidad !== null && tipoOptions;
    if (isValid) {
      const menuData = {
        id, // Agregamos el id del menú
        titulo,
        precio,
        descripcion,
        disponibilidad,
        tipoMenu: tipoOptions,
        menuInsumoList: menuInsumo
      };
      getMenuEditConfirmacionMsg(menuData);
      navigate('/GestionarMenus');
    } else {
      getMenuErrorMsg('Edicion');
    }
  };

  return (
    <section className='p-4'>
      <PageTitles title={'Gestion de Menus'} subtitle={'Editar Menu'} color={'text-indigo-400'} />

      <div className='bg-gray-800 mt-10 rounded-lg'>
        <div className='row p-3'>
          <div className='col-6'>
            <TextInput inputTitle={'Titulo'} value={titulo} setValue={setTitulo} inputName={'tituloMenu'} col={12} marginT={'mt-0'} />
            <TextInput inputTitle={'Descripcion'} value={descripcion} setValue={setDescripcion} inputName={'descripcionMenu'} col={12} marginT={'mt-4'} />
            <TextInput
              inputTitle={'Precio'}
              inputName={'precioMenu'}
              placeholder={'$'}
              col={12}
              marginT={'mt-4'}
              value={precio}
              setValue={setPrecio}
              keyPressEvent={(event) => {
                if (!/[0-9.]/.test(event.key)) event.preventDefault();
              }}
            />
          </div>
          <div className='col-6'>
            <SelectInput
              inputTitle={'Disponibilidad'}
              value={disponibilidad}
              setValue={handleDisponibilidadChange} // Cambiamos a la función de manejo de disponibilidad
              dataOptions={disponibilidadOptions}
              inputName={'disponibilidadOptionsMenu'}
              col={12}
              marginT={'mt-0'}
            />
            <SelectInput inputTitle={'Tipo'} value={tipoOptions} setValue={setTipoOptions} dataOptions={tipoMenuOptions} inputName={'tipoOptionsMenu'} col={12} marginT={'mt-4'} />
                    
          </div>
        </div>
      </div>
      <div className="bg-gray-800 mt-10 rounded-lg p-4">
              <div className="row">
                <div className="col-md-6">
                  <SelectInput
                    inputTitle={"Seleccionar Insumo"}
                    value={selectedInsumoId}
                    setValue={setSelectedInsumoId}
                    dataOptions={insumos}
                    inputName={"insumoSelect"}
                  />
                </div>
                <div className="col-md-6">
                  <TextInput
                    inputTitle={"Cantidad"}
                    value={cantidadInsumo}
                    setValue={setCantidadInsumo}
                    inputName={"cantidadInsumo"}
                    placeholder={"Cantidad"}
                    col={12}
                    marginT={"mt-0"}
                    keyPressEvent={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              <button
                className="mt-4 bg-green-600 text-gray-100 p-2 rounded-lg"
                onClick={agregarInsumo}
              >
                Agregar Insumo
              </button>

              <div className="mt-4">
                <h4 className="text-gray-300 text-md">Insumos Agregados:</h4>
                {menuInsumo.length === 0 ? (
                  <p className="text-gray-500">No se han agregado insumos.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    <div className="flex justify-center mt-4">
                      <div className="w-full max-w-2xl">
                        <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
                          <thead>
                            <tr className="text-gray-300 bg-gray-700">
                              <th className="border-b border-gray-600 p-2 text-left">Insumo</th>
                              <th className="border-b border-gray-600 p-2 text-left">Cantidad</th>
                              <th className="border-b border-gray-600 p-2 text-left">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {menuInsumo.map((insumo, index) => {
                              const insumoData = insumos.find(
                                (item) => item.id === parseInt(insumo.insumoId)
                              );
                              return (
                                <tr key={index} className="text-gray-300">
                                  <td className="border-b border-gray-600 p-2">
                                    {insumoData ? insumoData.name : "Insumo no encontrado"}
                                  </td>
                                  <td className="border-b border-gray-600 p-2">{insumo.cantidad}</td>
                                  <td className="border-b border-gray-600 p-2">
                                    <button
                                      onClick={() => handleEliminarInsumo(index)}
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
                to={"/GestionarMenus"}
                className="text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900"
              >
                <span className="text-xl">Cancelar</span>
              </Link>
              <button
                onClick={editMenu}
                className="ml-4 text-center w-48 bg-green-600 text-gray-100 p-3 rounded-lg hover:bg-green-700"
              >
                <span className="text-xl">Editar Menu</span>
              </button>
            </div>
    </section>
  );
};
