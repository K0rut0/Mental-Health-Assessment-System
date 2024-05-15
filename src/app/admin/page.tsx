"use client"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import Admin from "../types/admin";
import { useAdminContext } from "../contexts/AdminProvider";
import Loading from "@/components/custom/Loading";
export default function AdminPage(){
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const {admin, setAdmin} = useAdminContext()
    function attemptLogin(){
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password: passWord
            })
        }).then(x => x.json()).then(x => {
            setIsLoggedIn(x.success)
            setAdmin(x.body)
            console.log(x)
            setLoading(false)
        })
    }

    if(isLoggedIn){
        redirect('/admin/home')
    }
    return(
        loading ? <Loading></Loading> :
        <div>
            <label>Username: </label>
            <input type="text" className="username" onChange={e => setUserName(e.target.value)}></input>
            <label>Password: </label>
            <input type="password" onChange={e => setPassWord(e.target.value)}></input>
            <button onClick={attemptLogin}>Login</button>
        </div>
    )
}