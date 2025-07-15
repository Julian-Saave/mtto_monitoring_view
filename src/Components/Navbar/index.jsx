import  { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react'
import { ScadaContext } from '../../Context'
import { HomeIcon } from '@heroicons/react/24/solid'


const apiBaseUrl = import.meta.env.VITE_API_URL_MONITORING;
const Navbar = () => {
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
              <li className='font-semibold border-x px-2 text-gray-500 text-lg invisible md:visible transition hover:-translate-y-1 hover:shadow-xl'>
                    <NavLink to={`/register/${item.id}`}>
                        {item.name}
                    </NavLink>
                </li>
            )) 
          )
        }else{
          return(
            <div> Not fount </div>
          )
        }
      }

    const activeStyle = 'underline underline-offser -4'
    return (
        <nav className='flex justify-between items-center border border-b-black bg-white/90 fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'> 
            <ul className='flex items-center gap-1'>
                <li className='font-semibold text-lg pr-2'>
                    <NavLink to='/'>
                        <HomeIcon className=' w-10 h-10 text-blue-900 rounded-4xl p-1 transition delay-100 hover:scale-120 hover:border'/>
                    </NavLink>
                </li>
                {renderView()}
            </ul>
        </nav>
    )
}

export default Navbar