"use client"
import Image from "next/image";
import { UserProvider, useUserContext} from "./contexts/UserProvider";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { QuestionProvider, useQuestionContext } from "./contexts/QuestionProvider";
import Question from "./types/questions"

interface UserType{
  user_email: string;
  user_name: string;
  user_year_level: number;
  user_program: string;
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
  const {user, setUser} = useUserContext();


  function sendUserData(){
    let user = {
      user_email: userEmail,
      user_name: userName,
      user_year_level: userYearLevel,
      user_program: userProgram
    }
    //console.log(user)
    setUser(user)
  }

  return(
    <div className="flex flex-col justify-center bg-black text-white w-2/3">
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
            <label>Enter your year level: <br></br></label>
              <select onChange={(e) => {
                  setUserProgram(e.target.value)
                  //console.log(userYearLevel);
                }}>
                <option value={1}>1st Year</option>
                <option value={2}>2nd Year</option>
                <option value={3}>3rd Year</option>
                <option value={4}>4th Year</option>
              </select>
            
            <label>Enter your program: <br></br></label>
              <input type="text" className="rounded-md text-black" onChange={(e) => {
                setUserProgram(e.target.value)
                //console.log(userProgram);
                }}></input>
      <Link href={`/questions/` + 1} onClick={() => sendUserData()}>Next</Link>
    </div>
  )
}