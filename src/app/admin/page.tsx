"use client"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import Admin from "../types/admin";
import { useAdminContext } from "../contexts/AdminProvider";
import Loading from "@/components/custom/Loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
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
        <div className="w-100 flex justify-center p-5">
            <Card className="w-[500px] border-2 border-solid border-black">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Username: </Label>
                        <input type="text" className="text-black border-b-2 border-black" onChange={e => setUserName(e.target.value)}></input>
                    </div>
                    <div className="flex flex-col">
                        <Label>Password: </Label>
                        <input type="password" className="text-black border-b-2 border-black" onChange={e => setPassWord(e.target.value)}></input>
                    </div>
                    <button onClick={attemptLogin}>Login</button>
                </CardContent>
            </Card>
        </div>
    )
}