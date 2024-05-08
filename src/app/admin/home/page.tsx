"use client"

import { useAdminContext } from "@/app/contexts/AdminProvider"
import Admin from "@/app/types/admin"
import { useEffect, useState } from "react"

export default function Home(){
    const [loading, setLoading] = useState(true)
    const {admin} = useAdminContext()
    const [currAdmin, setCurrAdmin] = useState<Admin>({
        user_name: 'none',
        admin_type: 'none'
    })
    const [average, setAverage] = useState(
        "No average at the moment"
    )
    
    useEffect(()=>{
        setCurrAdmin(admin)
        setLoading(false)
    }, [admin])
    function getAverage(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/results`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(x => x.json()).then(x => setAverage(`The average for the current survey is: ${x.body.average}`))
    }
    return(
        loading? <p>loading</p>:
        <div>
            <p>
                HOME of {currAdmin.user_name}
            </p>
            
            <button onClick={getAverage}>Get current survey average</button>
            <p>{average}</p>
        </div>
    )
    }
