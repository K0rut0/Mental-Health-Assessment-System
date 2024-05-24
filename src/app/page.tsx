"use client"
import Image from "next/image";
import { UserProvider, useUserContext} from "./contexts/UserProvider";
import { useState, useEffect, useContext } from "react";
import Link from 'next/link'
import { QuestionProvider, useQuestionContext } from "./contexts/QuestionProvider";
import Question from "./types/questions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Car } from "lucide-react";
import { Label } from "@/components/ui/label";
import Loading from "@/components/custom/Loading";

interface department{
  id: number;
  name: string;
  acronym: string;
}
interface UserType{
  user_email: string;
  user_name: string;
  user_year_level: number;
  user_program: string;
  user_department: string;
}

interface program{
  id: number;
  program_name:string;
  program_acronym: string;
  program_department: number;
}
export default function Home() {
  return (

    <UserForm />

);
}

function UserForm(){
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userYearLevel, setUserYearLevel] = useState(0)
  const [userProgram, setUserProgram] = useState('')
  const [userDepartment, setUserDepartment] = useState('')
  const {user, setUser} = useUserContext();
  const [departments, setDepartments] = useState<department[]>([])
  const [programs, setPrograms] = useState<any>({})
  const [programChoices, setProgramChoices] = useState<program[]>([])
  function sendUserData(){
    let user = {
      user_email: userEmail,
      user_name: userName,
      user_year_level: userYearLevel,
      user_program: userProgram,
      user_department: userDepartment
    }
    //console.log(user)
    setUser(user)
  }
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/departments`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(x => x.json()).then(x => {
          setDepartments(x.body)
      })
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/programs`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(x => x.json()).then(x => {
      setPrograms(x.body)
      setLoading(false)
    })
}, [])
  if(loading) return <Loading></Loading>

  
  return(
    <div className="w-100 flex justify-center p-5">
      <Card className="w-[500px] border-2 border-solid border-black">
        <CardHeader className="">
          <CardTitle>Mental Health Check</CardTitle>
          <CardDescription>Enter your information below:</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-y-1 flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Enter your name:</Label>
              <input type="text" className=" text-black border-b-2 border-black" onChange={(e) => {
                setUserName(e.target.value)
                //console.log(userName);
              }}></input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Enter your student email:</Label>
              <input type="text" className="text-black border-b-2 border-black" onChange={(e) => {
                setUserEmail(e.target.value)
                //console.log(userEmail);
              }}></input>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Select your year level: </Label>
              <Select onValueChange={(val: string) => setUserYearLevel(parseInt(val))}>
                <SelectTrigger className="flex flex-grow">
                  <SelectValue placeholder="Year Level" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="department">Select your department:</Label>
            <Select onValueChange={(e: string) => {
              setUserDepartment(e)
              setProgramChoices(programs[e.toString()])
              console.log(programs[e.toString()]);
            }}>
              <SelectTrigger className="flex flex-grow">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent >
                {departments.map((x, i) => <SelectItem className="max-w-fit" value={(x.id).toString()} key = {i+`dept`}>{x.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="department">Select your course: </Label>
            <Select onValueChange={(e: string) => setUserProgram(e)}>
              <SelectTrigger className="flex flex-grow">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent >
                {programChoices.map((x, i) => <SelectItem className="max-w-fit" value={(x).toString()} key = {i+`prog`}>{x.toString()}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Link href={`/questions/` + 1} onClick={() => sendUserData()}>Next</Link>
        </CardContent>
      </Card>
    </div>
  )
}