import { useContext, useEffect } from 'react'
import  { NavLink } from 'react-router-dom'

import { ScadaContext } from '../../Context'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import GroupForm from '../../Components/GroupForm'

import { PlusCircleIcon } from '@heroicons/react/24/solid'

function Home() {
    const context = useContext(ScadaContext)
    const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;

    useEffect( () => {
      fetchGropus()
    }, [])

    const fetchGropus = async () =>{
      try{
        const response = await fetch(`${apiBaseUrl}/group`,{
            method: "GET",
            headers: {"Content-Type": "application/json", "Accept": "application/json"
            },
            })
        const dataRes = await response.json()
        context.setGroup(dataRes.groups)

      }catch(err){
        console.log(err)
      }
    }

        const renderView = () => {
        if(context.group.length > 0){
          return(
            context.group.map(item => (
              <Card key={item.id} data={item}/>
            )) 
          )
        }else{
          return(
            <div> Not fount </div>
          )
        }
      }

      const createForm = ()=>{
        context.setGroupForm({name: ""})
        context.openGroupForm()
      }

    return (
        <Layout>
            <div className='flex flex-col justify-center items-center w-full mb-4 pt-2'>
              <h1 className='font-bold text-4xl text-blue-900 text-center py-2 underline'>GRUPOS</h1>
            </div>
            <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full max-w-screen-lg'>
                {
                    renderView()
                } 
            </div>
            <footer className='z-2 fixed bottom-0 w-full h-18 bg-blue-950/80'>
                <div className='w-full h- h-full flex justify-end items-center gap-1'>
                    <p className='font-bold text-2xl text-white text-center'>Crear nuevo grupo</p>
                    <button className='cursor-pointer transition delay-150 duration-300 hover:-translate-y-1 hover:scale-110'
                    disabled={!context.isEditGroup}>
                        <PlusCircleIcon  className={`${context.isEditGroup? ' text-white mx-2': 'text-gray-500'} w-15 h-15`}
                        onClick={()=>createForm()}/>
                    </button>
                </div>
            </footer>

            <GroupForm/>
        </Layout>
    )
}

export default Home