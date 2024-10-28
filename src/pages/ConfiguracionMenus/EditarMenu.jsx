import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SelectInput, TextInput } from '../../components/Inputs';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { getMenuApiCall } from '../../db/MenusApiCall';
import { getMenuEditConfirmacionMsg, getMenuErrorMsg } from '../../utils/messages';
import { disponibilidadOptions, tipoMenuOptions } from '../../utils/options';
import { useNavigate } from 'react-router-dom';

export const EditarMenu = () => {
  const { id } = useParams(); // Obtenemos el id del menú desde los parámetros de la URL
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoOptions, setTipoOptions] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [menuInsumo, setMenuInsumo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getMenuApiCall(id);
        setTitulo(menu.titulo);
        setPrecio(menu.precio);
        setDescripcion(menu.descripcion);
        setDisponibilidad(menu.disponibilidad);
        setTipoOptions(menu.tipoMenu);
        setMenuInsumo([]);
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
        menuInsumoList: []
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

            <div className="flex justify-center mt-10">
              <Link to={'/GestionarMenus'} className='text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900'>
                <span className='text-xl'>Cancelar</span>
              </Link>
              <button className='w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10' onClick={editMenu}>
                <span className='text-xl'>Editar Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
