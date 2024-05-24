"use client"
import {useRef, useEffect, useState} from "react"
import {Chart} from "chart.js/auto"
import Loading from "./Loading"

export default function DeptChart(){
    const [isLoading, setIsLoading] = useState(true)
    const [departments, setDepartments] = useState([])
    
    useEffect(()=>{
        async function getData(){
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/depData`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(x => x.json()).then(x => {
            setDepartments(x.body)
        })
        setIsLoading(false)
        console.log(departments + " vaild data")
    }
    getData()
    }, [])
    
    return(
        isLoading ? (<Loading></Loading>) :
        <BarData data={departments}></BarData>
    )
}

function BarData({data}:{
    data: any
}){
    const chartRef = useRef<any>(null)
    console.log(data)
    const labels = data.map((x:any) => x.acronym)
    const values = data.map((x: any) => parseFloat(x.round))
    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }
            const context = chartRef.current.getContext("2d")
            const newChart = new  Chart(context, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Average Mental Health Score per Department",
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }],
                    
                }
            })
            chartRef.current = newChart.id
        }
    }, [data, labels, values]);
    return(
        <div className="w-9/12">
            <canvas ref={chartRef}></canvas>
        </div>
    )
}