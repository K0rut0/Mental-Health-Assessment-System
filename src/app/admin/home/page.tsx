"use client"

import { useAdminContext } from "@/app/contexts/AdminProvider"
import Admin from "@/app/types/admin"
import AdminNav from "@/components/custom/AdminNav"
import DeptChart from "@/components/custom/DeptChart"
import Loading from "@/components/custom/Loading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import DisplayProg from "@/components/custom/DisplayProg"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
export default function Home(){
    const [loading, setLoading] = useState(true)
    const {admin} = useAdminContext()
    const [currAdmin, setCurrAdmin] = useState<Admin>({
        user_name: 'none',
        admin_type: 'none'
    })
    const [data, setData] = useState([])
    const [progData, setProgData] = useState([])
    const [departmentCards, setDepartmentCards] = useState<any>([])
    let depts
    useEffect(()=>{
        setCurrAdmin(admin)
        async function getData(){
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/depData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(x => x.json()).then(x => {
                setData(x.body)
            })
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/progData`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(x => x.json()).then(x => {
                setProgData(x.body)
                setLoading(false)
            })
        }
        getData()
    }, [admin])
    console.log(admin)
    console.log("mehhehehe")
    if(loading){
        return <Loading></Loading>
    }
    if(admin.admin_type == "admin" || admin.admin_type == "super_admin"){
        return(
            <div className="flex w-100 flex-col p-5 gap-50 justify-center">
                <DeptChart></DeptChart>
                <div className="flex flex-col justify-center w-100 p-5 gap-5    ">
                    {data.map((x: any, i) => {
                        return(
                            <Accordion type="single" collapsible key={i+'accord'}>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <Card key={x.id} className="flex flex-col max-w-[500px]">
                                            <CardHeader>
                                                <CardTitle>{x.acronym}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-col">
                                                    <Label>Department Minimum: {x.min}</Label>  
                                                    <Label>Department Maximum: {x.max}</Label>
                                                    <Label>Department Average: {x.round}</Label>
                                                    <Label>Department Median: {x.median}</Label>
                                                </div>
                                                
                                            </CardContent>
                                        </Card>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <DisplayProg data={progData} id={x.id}></DisplayProg>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            
                        )
                    })}
                </div>
            </div>
        )
    } else {
         return(
            <p>Please login</p>
        )
    }
    }
