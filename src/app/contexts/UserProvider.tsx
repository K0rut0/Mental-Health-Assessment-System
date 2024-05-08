"use client"
import React, {useContext, useState, createContext, Children, ReactNode, ContextType, useEffect} from "react";

interface UserType{
    user_email: string;
    user_name: string;
    user_year_level: number;
    user_program: string;
}

interface UserContextType {
    user: UserType
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const UserContext = createContext<UserContextType | null>(null);
export function useUserContext(){
    const context = useContext(UserContext)
    if(!context){
        throw new Error("useUserContext needs to be wrapped in a UserProvider")
    }
    return context
}




export function UserProvider({children}: {
    children: ReactNode
}){
    const [user, setUser] = useState<UserType>({
        user_email: "",
        user_name: "",
        user_year_level: 0,
        user_program: ""
    });
    useEffect(() => {
        console.log("mounted")
        
        return () => {
            console.log("unmounted")
        }
    }, [])
    console.log(user)
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}