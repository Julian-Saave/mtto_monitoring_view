import { useContext } from 'react'
import { ScadaContext } from '../../Context'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useSnackbar } from 'notistack'





const GroupForm = () =>{
    const context = useContext(ScadaContext)
    const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;
    
    const { enqueueSnackbar } = useSnackbar();
    const message = (message, success) => { 

        if(success){
            enqueueSnackbar(message, { variant: 'success', autoHideDuration: 2000 }); 
        }else{
            enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 }); 
        }
    };

    const handleChange = (e) => {
        context.setGroupForm({...context.groupForm,[e.target.name]: e.target.value});
    };
    
    const handleGrups = async ()=>{
        try{
            const response =await fetch(`${apiBaseUrl}/group`,{
                method: "GET",
                headers: {"Content-Type": "application/json", "Accept": "application/json"
            }
            })

            const data = await response.json()
            context.setGroup(data.groups)
            closeForm()
        }catch(error){
            console.log(error)
        }

    }

    const create = async (event) =>{
        try{
            event.preventDefault();
            const body = JSON.stringify(context.groupForm)
            const response = await fetch(`${apiBaseUrl}/group`,{
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: body
            })

            const data = await response.json()
            handleGrups()
            message(data.message, data.success)

            }catch(error){
                console.log(error)
            }
    
    }
        const edit = async (event) =>{
        try{
            event.preventDefault();
            const body = JSON.stringify(context.groupForm)
            const response = await fetch(`${apiBaseUrl}/group/${context.selectedGroup}`,{
                method: "put",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: body
            })
            const data = await response.json()
            handleGrups()
            message(data.message, data.success)
            }catch(error){
                console.log(error)
            }
    
    }

    

    const register = (event)=>{
        event.preventDefault();
        if(!context.isEditGroup){
            edit(event)
        }else{
            create(event)
        }
    }

    const closeForm = ()=>{
        if(!context.isEditGroup){
            context.openEditGroup()
        }else{
            context.openGroupForm()
        }
        context.setGroupForm({name: ""})
    }
    return(
        <>
            <div className={`${!context.isGroupFormOpen || !context.isEditGroup ? 'fixed' : 'hidden'} z-1 flex items-center justify-center inset-0 bg-blue-500/30`}>

                <XCircleIcon className=' cursor-pointer fixed top-20 right-1 w-12 h-12'
                onClick={()=> closeForm()}/>
                <form 
                    className='flex flex-col items-center border-2 border-blue-900 rounded-2xl gap-2 lg:w-1/2 md:w-3/4 sm:w-4/5 bg-white p-2'
                    onSubmit={register}    
                    >
                    <p className='bg-blue-900 w-full rounded-md pb-1 font-bold text-2xl text-white text-center'>{`${context.isEditGroup ?'crear':'actualizar'}`}</p>
                    <label className='text-lg font-medium'> Nombre del grupo</label>
                    <input 
                        type="text" 
                        name='name'
                        value={context.groupForm.name}
                        onChange={handleChange}
                        required
                        className='w-3/4 border px-2' />
                    <input type="submit" value='Enviar' className='text-md text-white cursor-pointer border rounded-3xl bg-blue-900 m-2 w-1/2'></input>
                </form>
            </div>
        </>
    )
}

export default GroupForm