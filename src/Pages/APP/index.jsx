import { BrowserRouter, useRoutes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

import { ScadaProvider } from '../../Context'
import Navbar from '../../Components/Navbar'
import Home from '../Home'
import Register from '../Register'
import './App.css'

const AppRoutes = () =>{
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/register/:id', element: <Register />}
  ])
  return routes
}

const App = () =>{
  return (
    <ScadaProvider>
      <BrowserRouter>
      <SnackbarProvider preventDuplicate>
        <AppRoutes />
        <Navbar />
      </SnackbarProvider>
      </BrowserRouter>
    </ScadaProvider>
  )
}

export default App