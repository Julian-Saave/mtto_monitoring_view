import { useContext, useState } from 'react'
import  { NavLink } from 'react-router-dom'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useSnackbar } from 'notistack'
import { ScadaContext } from '../../Context'

const CardRegister = (data) => {
    const { enqueueSnackbar } = useSnackbar();
    const memoryType = data.data.type.split(" ")
    const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;
    const context = useContext(ScadaContext)

    const message = (message, success) => { 
        if(success){
            enqueueSnackbar(message, { variant: 'success', autoHideDuration: 2000 }); 
        }else{
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 }); 
        }
    };

    const handleDelete = (name) => {
        const registers = context.registers.filter(memory => memory.name != name)
        context.setRegisters(registers)
    }
    const deleteRegister = async (data) =>{
        try{
            const body = JSON.stringify(data)
            const response = await fetch(`${apiBaseUrl}/register/${data.id_group}?type=${data.type}&number=${data.number}`,{
                method: "DELETE",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},

            })  
            handleDelete(data.name)
            const dataFetch = await response.json()
            message(dataFetch.message, dataFetch.success)

            }catch(error){
            console.log(error)

        }
    }


    
    return (
        <>
        <div className='flex justify-between p-2 border rounded-2xl '>
            <div className='flex flex-col'>
            <span className=' bg-black/30 rounded-lg text-black text-center font-semibold text-lg m-1 px-3 py-0.5'>
                    {data.data.name}
            </span>
            <span className='px-1 text-sm font-medium'>
                Memoria: {memoryType[0]} {data.data.number}
            </span>
            <span className='px-1 text-sm font-medium'>
                Estado: {data.data.value + ""}
            </span>
            </div>
            <div className='flex flex-col gap-1'>
                <TrashIcon 
                    className="w-6 h-6 text-red-600"
                    onClick={() => deleteRegister(data.data)}
                    />               
            </div>
        </div>
        </>
    )
}

export default CardRegister