
import React, { useContext, useState } from 'react'

const AlertContext = React.createContext()
const NewAlertContext = React.createContext()

export function useAlert(){
    return useContext(AlertContext)
}

export function useUpdateAlert(){
    return useContext(NewAlertContext)
}
export function AlertProvider({ children }) {
    const [alertInfo, setAlertInfo] = useState(null)
    function setAleart(alert){
        setAlertInfo(alert)
    }
    return (
        <AlertContext.Provider value={alertInfo}>
            <NewAlertContext.Provider value={setAleart}>
                {children}
            </NewAlertContext.Provider>
        </AlertContext.Provider>)
}