import { useContext } from 'react'
import { ScadaContext } from '../../Context'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useSnackbar } from 'notistack'

const registerForm = ()=> {
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
        context.setRegisterForm({...context.registerForm,[e.target.name]: e.target.value});
    };
    
    const handleRegisters = async ()=>{
        try{
            const response =await fetch(`${apiBaseUrl}/register/${context.selectedGroup}`,{
                method: "GET",
                headers: {"Content-Type": "application/json", "Accept": "application/json"
            }
            })
            const dataRes = await response.json()
            context.setRegisters(dataRes.group)
            closeForm()
        }catch(error){
            console.log(error)
        }

    }

    const create = async (event) =>{
        try{
            event.preventDefault();
            const body = JSON.stringify({...context.registerForm,id_group:context.selectedGroup})
            const response = await fetch(`${apiBaseUrl}/register`,{
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: body
            })

            const data = await response.json()
            handleRegisters()
            message(data.message, data.success)

            }catch(error){
                console.log(error)
            }
    
    }

    const register = async (event)=>{
        event.preventDefault();
        create(event)
    }

    const closeForm = ()=>{
        context.openRegisterForm()
        context.setRegisterForm(
            {
                name:'',
                type:'',
                number: 0,
                length: 1,
                id_group:0})
    }

    const renderTypes = ()=>{
        if(context.types.length > 0){
          return(
            context.types.map(item => (
                <option>{item.name} {item.type} </option>
            )) 
          )
        }else{
          return(
            <option> Not fount </option>
          )
        }
    }
    return(
        <>
            <div className={`${!context.isRegisterFormOpen || !context.isEditGroup ? 'fixed' : 'hidden'} z-1 flex items-center justify-center inset-0 bg-blue-500/30`}>

                <XCircleIcon className=' cursor-pointer fixed top-20 right-1 w-12 h-12'
                onClick={()=> closeForm()}/>
                <form 
                    className='flex flex-col items-center border-2 border-blue-900 rounded-2xl gap-2 lg:w-1/2 md:w-3/4 sm:w-4/5 bg-white p-2'
                    onSubmit={register}    
                    >
                    <p className='bg-blue-900 w-full rounded-md pb-1 font-bold text-2xl text-white text-center'>{`${context.isEditGroup ?'crear':'actualizar'}`}</p>
                    <label className='text-lg font-medium'> Nombre del registro</label>
                    <input 
                        type="text" 
                        name='name'
                        value={context.registerForm.name}
                        onChange={handleChange}
                        required
                        className='w-3/4 border px-2' />
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-2 w-full pt-2 px-4'>
                        <label className='text-lg font-medium'>Numero:</label>
                        <input 
                            type='number' 
                            min="0" 
                            max="100000"
                            name='number'
                            required
                            value={context.registerForm.number}
                            onChange={handleChange} 
                            className='border rounded-2xl px-2 w-20'/>
                        <label className='text-lg font-medium'>Tipo:</label>
                        <select className='border rounded-2xl px-2 w-30'
                            name='type'
                            value={context.registerForm.type}
                            onChange={handleChange}
                            required>
                            <option value=""></option>
                            {renderTypes()}
                        </select>
                        <label className='text-lg font-medium'>longitud:</label>
                        <input 
                            type='number' 
                            min="1" 
                            max="2" 
                            name='length'
                            value={context.registerForm.length}
                            onChange={handleChange} 
                            step="1"
                            required 
                            className='border rounded-2xl px-2 w-20'/>
                    </div>


                    <input type="submit" value='Enviar' className='text-md text-white cursor-pointer border rounded-3xl bg-blue-900 m-2 w-1/2'></input>
                </form>
            </div>
        </>
    )
}

export default registerForm