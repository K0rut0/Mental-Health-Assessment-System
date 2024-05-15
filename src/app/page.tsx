"use client"
import Image from "next/image";
import { UserProvider, useUserContext} from "./contexts/UserProvider";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { QuestionProvider, useQuestionContext } from "./contexts/QuestionProvider";
import Question from "./types/questions"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";

interface UserType{
  user_email: string;
  user_name: string;
  user_year_level: number;
  user_program: string;
}
interface DepartmentType{
  id: number,
  name: string,
  acronym: string
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
  const [depts, setDepts] = useState<DepartmentType[]>([])
  const [programs, setPrograms] = useState()

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
  useEffect(() =>{
    fetch(`http://localhost:3000/api/departments`, {
      method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
    }).then((x) => x.json()).then(x=>{
      setPrograms(x.body.programs)
      setDepts(x.body.departments)
    })
  }, [])
  return(
    <div className="flex flex-col justify-centenr bg-black text-white w-2/3">
            <label>Enter your name {`(Last name, First name)`}: <br></br></label>
              <input type="text" className="rounded-md text-black" onChange={(e) => {
                setUserName(e.target.value)
                //console.log(userName);
                }}></input>
            <label>Enter your email: <br></br></label>
              <input type="text" className="rounded-md text-black" onChange={(e) => {
                setUserEmail(e.target.value)
                //console.log(userEmail);
                }}></input>
              <Select>
                <SelectTrigger className="text-black border border-black border-2">
                  <SelectValue placeholder="Department"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from(depts, x => <SelectItem value={(x.id).toString()}>{x.acronym}</SelectItem>)}
                </SelectContent>
              </Select>
              
              <label>Enter your program: <br></br></label>
              <input type="text" className="rounded-md text-black" onChange={(e) => {
                setUserProgram(e.target.value)
                //console.log(userProgram);
                }}></input>
      <Link href={`/questions/` + 1} onClick={() => sendUserData()}>Next</Link>
    </div>
  )
}