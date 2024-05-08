"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Admin from "../types/admin";

interface AdminContextType{
    admin: Admin,
    setAdmin: React.Dispatch<React.SetStateAction<Admin>>
}

const AdminContext = createContext<AdminContextType | null>(null)
export function useAdminContext(){
    const context = useContext(AdminContext)
    if(!context){
        throw new Error("useAdminContext needs to be wrapped in a UserProvider")
    }
    return context
}

export function AdminProvider({children}: {
    children: ReactNode
}){
    const [admin, setAdmin] = useState<Admin>({
        user_name: '',
        admin_type: 'none',
    });
    useEffect(() => {
        console.log("mounted")
        return () => {
            console.log("unmountedzz")
        }
    }, [])
    return(
        <AdminContext.Provider value={{admin, setAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}