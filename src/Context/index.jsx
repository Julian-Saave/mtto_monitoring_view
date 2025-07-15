import { useState, createContext, useEffect } from "react";

export const ScadaContext = createContext()

export const ScadaProvider = ({children}) => {
    
    const [group, setGroup] = useState([])
    const [isGroupFormOpen, setIsGroupFormOpen ] = useState([])
    const openGroupForm = () => setIsGroupFormOpen(!isGroupFormOpen)
    const [groupForm, setGroupForm] = useState({
        name:''
    })
    const [isEditGroup, setIsEditGroup] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const openEditGroup = () => setIsEditGroup(!isEditGroup)
    
    const [isRegisterFormOpen, setIsRegisterFormOpen ] = useState([])
    const openRegisterForm = () => setIsRegisterFormOpen(!isRegisterFormOpen)
    const [registerForm, setRegisterForm] = useState({
        name:'',
        type:'',
        number: 0,
        length: 1,
        id_group:0
    })
    const [types, setTypes] = useState([])
    const [registers, setRegisters] = useState([])
   


    return (
        <ScadaContext.Provider value={{
            group,
            setGroup,
            isGroupFormOpen,
            openGroupForm,
            groupForm,
            setGroupForm,
            selectedGroup,
            setSelectedGroup,
            isEditGroup,
            openEditGroup,
            isRegisterFormOpen,
            openRegisterForm,
            registerForm,
            setRegisterForm,
            types,
            setTypes,
            registers,
            setRegisters
        }}
        
        >
            {children}
        </ScadaContext.Provider>
    )
}