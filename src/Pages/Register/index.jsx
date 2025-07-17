import { useContext, useEffect } from 'react'
import  { Await, NavLink } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { ScadaContext } from '../../Context'
import Layout from '../../Components/Layout'
import RegisterForm from '../../Components/RegisterForm'
import CardRegister from '../../Components/CardRegister'

import { PlusCircleIcon, CubeIcon } from '@heroicons/react/24/solid'

function Register(){
    const context = useContext(ScadaContext)
    const currentPath = window.location.pathname
    const index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
    const currentgroup = context.group.filter(group => group.id == index)[0]

    const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;

    const { enqueueSnackbar } = useSnackbar();
    const message = (message, success) => { 
        if(success){
            enqueueSnackbar(message, { variant: 'success', autoHideDuration: 2000 }); 
        }else{
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 }); 
        }
    };

    const createForm =  ()=>{
        context.openRegisterForm()
    }

    
    const fetchTypes = async () =>{
        try {
            const response = await fetch(`${apiBaseUrl}/register/types`,{
                method: "GET",
                headers: {"Content-Type": "application/json", "Accept": "application/json"
                },
            })
            const dataRes = await response.json()
            await context.setTypes(dataRes.types)
            
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchRegisters = async () =>{
        try {
            const response = await fetch(`${apiBaseUrl}/register/${index}`,{
                method: "GET",
                headers: {"Content-Type": "application/json", "Accept": "application/json"
                },
            })
            const dataRes = await response.json()
            context.setRegisters(dataRes.registers)
            if(!dataRes.success){
                message(dataRes.message, dataRes.success)
            }
            
        }
        catch (error) {
            console.log(error);
        }
    }

    
    useEffect( () => {
        fetchTypes()
        context.setSelectedGroup(index)
        
    }, [index])

    useEffect(() => {
        context.setSelectedGroup(index);
        let isMounted = true;
        let timeoutId;
        const fetchLoop = async () => {
        try {
            await fetchRegisters(); 
        } catch (error) {
            console.log('Error en polling:', error);
        } finally {
            if (isMounted) {
                timeoutId = setTimeout(fetchLoop, 3000); 
            }
        }
    };

  fetchLoop(); // primer fetch inmediato

  return () => {
    isMounted = false;
    clearTimeout(timeoutId); // limpia el intervalo si cambia el grupo o se desmonta
  };
}, [index]);

    const renderView = () => {
        if(context.registers){
            if(context.registers.length > 0){
                return(
                context.registers.map(item => (
                    <CardRegister key={item.id} data={item}/>
                )) 
                )
            }else{
                return(
                <div className='flex flex-col pt-2'>
                <span className='text-2xl font-extrabold text-gray-300 text-center'> No hay registros </span>
                <CubeIcon className='w-full h-1/4 text-gray-300'/>
                </div>
                )
            }
        }
    }
    
    const renderGroup = () => {
        const group = context.group.filter(group => group.id == index)[0]
        return(
            <p 
            className='font-bold text-4xl text-blue-900 text-center py-2'
            >{`${!group ? " " : group.name}`}</p>
        )
    }

    return(
        <Layout>
            <div className=' p-2'>
                {renderGroup()}
            </div>
             <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full max-w-screen-lg'> 
             {renderView()}

             </div>
            <footer className='z-2 fixed bottom-0 w-full h-18 bg-blue-950/80'>
                <div className='w-full h- h-full flex justify-end items-center gap-1'>
                    <p className='font-bold text-2xl text-white text-center'>Agregar nuevo registro</p>
                    <button className='cursor-pointer transition delay-150 duration-300 hover:-translate-y-1 hover:scale-110'
                    disabled={!context.isEditGroup}>
                        <PlusCircleIcon  className={`${context.isEditGroup? ' text-white mx-2': 'text-gray-500'} w-15 h-15`}
                        onClick={()=>createForm()}/>
                    </button>
                </div>
            </footer>
            <RegisterForm/>
        </Layout>
    )
}

export default Register