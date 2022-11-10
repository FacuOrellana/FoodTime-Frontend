import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { SelectInput, TextInput } from '../../components/Inputs';
import { PageTitles } from '../../components/PageTitles/PageTitles';
import { getMenuApiCall } from '../../db/MenusApiCall';


import { getMenuEditConfirmacionMsg, getMenuErrorMsg } from '../../utils/messages';
import { disponibilidadOptions, tipoMenuOptions } from '../../utils/options';

export const EditarMenu = () => {

    const { id } = useParams();
    const [menu, setMenu] = useState({});
  //  const [loadState, setLoadState] = useState(true);

    /* STATES FOR THE INPUTS */

    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoOptions, setTipoOptions] = useState('');
    const [disponibilidad, setDisponibilidad] = useState(null);

    // useEffect(()=>{

    // },[])

    const handleDescripcionChange = (event) => {
        console.log(event.target.value);
        let newMenu = menu;
        newMenu.descripcion = event.target.value;
        setMenu(newMenu)
    }
    
    const handleTituloChange = (event) => {
        console.log(event.target.value);
        let newMenu = menu;
        newMenu.titulo = event.target.value;
        setMenu(newMenu)
    }

    const handlePrecioChange = (event) => {
        console.log(event.target.value);
        let newMenu = menu;
        newMenu.precio = event.target.value;
        setMenu(newMenu)
    }




    useEffect(() => {
        getMenuApiCall(id)
        .then((menu) => {
          setMenu(menu);
          console.log(menu);
          setTitulo(menu.titulo);
        setPrecio(menu.precio);
        setDescripcion(menu.descripcion);
        setDisponibilidad(menu.disponibilidad)
        setTipoOptions(menu.tipoMenu)
        console.log(menu.tipoMenu);
        })
        .catch((e) => {
          console.log(e);
        });

        console.log("Este es el menu" + JSON.stringify(titulo));
        
        console.log("La disponibilidad es" + menu.disponibilidad);
        menu.disponibilidad ? setDisponibilidad(true) : setDisponibilidad(false);
        setTipoOptions(menu.tipoMenu);

    }, [titulo,menu.tipoMenu,menu.disponibilidad,id]);

    // useEffect(() => {
    //     setMenu({
    //     titulo: titulo,
    //     descripcion: descripcion,
    //     precio: precio,
    //     TipoMenu: parseInt(tipoOptions),
    //     disponibilidad: disponibilidad
    //     })
    //   }, [titulo,precio,descripcion,disponibilidad,tipoOptions]);

    const editMenu = () => {
        
        if (menu.disponibilidad === true) {
            menu.disponibilidad = true;
          } else {
            menu.disponibilidad = false;
          }        
        console.log(JSON.stringify(menu));
        (titulo !== '' && descripcion !== '' && precio !== '' && disponibilidad !== '' && tipoOptions !== '')
            ? getMenuEditConfirmacionMsg(menu)
            : getMenuErrorMsg('Edicion')
        
    }


    return (
        <section className='p-4'>

            <PageTitles title={'Gestion de Menus'} subtitle={'Editar Menu'} color={'text-indigo-400'} />

            {
                
                
                    <div className='bg-gray-800 mt-10 rounded-lg'>
                        <div className='row p-3'>
                            <div className='col-6'>
                                <TextInput inputTitle={'Titulo'} value={titulo} setValue={setTitulo} inputName={'tituloMenu'} col={12} marginT={'mt-0'} keyPressEvent={handleTituloChange}/>
                                <TextInput inputTitle={'Descripcion'} value={descripcion} setValue={setDescripcion} inputName={'descripcionMenu'} col={12} marginT={'mt-4'} keyPressEvent={handleDescripcionChange}/>
                                <TextInput
                                    inputTitle={'Precio'} inputName={'precioMenu'} placeholder={'$'} col={12} marginT={'mt-4'}
                                    value={precio} setValue={setPrecio}
                                    keyPressEvent={(event) => {
                                        if (!/[0-9]/.test(event.key) && !/[.]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                        handlePrecioChange(event);
                                    }}
                                />
                            </div>
                            <div className='col-6'>
                                <SelectInput inputTitle={'Disponibilidad'} value={disponibilidad} setValue={setDisponibilidad} dataOptions={disponibilidadOptions} inputName={'disponilidadOptionsMenu'} col={12} marginT={'mt-0'} />
                                <SelectInput inputTitle={'Tipo'} value={tipoOptions} setValue={setTipoOptions} dataOptions={tipoMenuOptions} inputName={'tipoOptionsMenu'} col={12} marginT={'mt-4'} />

                                <div className="flex justify-center mt-10">
                                    <Link to={'/GestionarMenus'} className='text-center w-48 bg-red-400 text-gray-100 p-3 rounded-lg hover:bg-orange-500 hover:text-gray-900'>
                                        <span className=' text-xl'>Cancelar</span>
                                    </Link>
                                    <button className='w-48 bg-blue-600 text-gray-100 p-3 rounded-lg hover:bg-teal-400 hover:text-gray-900 ml-10' onClick={editMenu}>
                                        <span className=' text-xl'>Editar Menu</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                
            }

        </section>
    )
}