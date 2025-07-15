import { useContext, useState } from 'react'
import  { NavLink } from 'react-router-dom'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useSnackbar } from 'notistack'

import { ScadaContext } from '../../Context'

const Card = (data) => {

    const { enqueueSnackbar } = useSnackbar();
    const message = (message, success) => { 

        if(success){
            enqueueSnackbar(message, { variant: 'success', autoHideDuration: 2000 }); 
        }else{
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 }); 
        }
    };

    const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;
    const context = useContext(ScadaContext)
    const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState([])

    const handleDelete = (name) => {
    const groups = context.group.filter(group => group.name != name)
        context.setGroup(groups) 
    }
    const eliminar = async (data) =>{
    try{
        const body = JSON.stringify(data)
        const response = await fetch(`${apiBaseUrl}/group/${data.id}`,{
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: body
        })  
        handleDelete(data.name)
        setIsDeleteGroupOpen(!isDeleteGroupOpen)
        const dataFetch = await response.json()
        message(dataFetch.message, dataFetch.success)

        }catch(error){
        console.log(error)

    }
    }

    const editGroup = (data) =>{
        context.openEditGroup()
        context.setSelectedGroup(data.id)
        context.setGroupForm({name: data.name})
    }

    return (
        <>
            <div 
            className='bg-white cursor-pointer w-full relative h-30 rounded-lg border'>
            <NavLink to={`/register/${data.data.id}`} >
                <div className='m-2 h-2/5'>
                    <span className=' bg-black/30 rounded-lg text-black text-center font-semibold text-lg m-1 px-3 py-0.5'>
                    {data.data.name}
                    </span>
                </div>
                <p className='grid items-center col-1 px-4'>
                    <span className='text-sm font-medium'>Registros: {data.data.registerCount}</span>
                </p>
            </NavLink>
                    <TrashIcon 
                        className="w-6 h-6 absolute top-0.5 z-1 right-0.5 text-red-600"
                        onClick={() => setIsDeleteGroupOpen(!isDeleteGroupOpen)}
                        />
                    <PencilSquareIcon 
                        className='w-6 h-6 absolute top-10 z-1 right-0.5 text-blue-800'
                        onClick={()=> editGroup(data.data)}/>
            </div>
            <div className={`${!isDeleteGroupOpen? 'fixed' : 'hidden'} z-1 flex items-center justify-center inset-0`}>
                <div className='flex flex-col justify-center items-center w-60 h-30 shadow-2xl border rounded-2xl bg-white gap-2 transition hover:scale-110'>
                    <p className='font-medium'> ¿Quiere eliminar este grupo?</p>
                    <div className='flex justify-between w-3/4 items-center'>
                        <button 
                            className='border cursor-pointer rounded-2xl p-2 bg-red-300'
                            onClick={()=> eliminar(data.data)}>Eliminar</button>
                        <button 
                            className='border cursor-pointer rounded-2xl p-2 bg-green-300'
                            onClick={()=> setIsDeleteGroupOpen(!isDeleteGroupOpen)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
        
    )
}
export default Card