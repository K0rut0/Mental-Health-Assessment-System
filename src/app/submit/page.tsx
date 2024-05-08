"use client"
import { useEffect, useState } from "react"
import { useAnswerContext } from "../contexts/AnswerProvider"
import { useQuestionContext } from "../contexts/QuestionProvider"
import { useUserContext } from "../contexts/UserProvider"

interface QuestionResponse{
    response_value: number,
    question_id: number
}

interface UserType{
    user_email: string;
    user_name: string;
    user_year_level: number;
    user_program: string;
}

export default function SubmitAnswers(){
    const{surveyContent, setSurveyContent} = useQuestionContext()
    const {answers, setAnswers} = useAnswerContext()
    const {user} = useUserContext()
    const [ansLoad, setAnsLoad] = useState<QuestionResponse[]>()
    const [userLoad, setUserLoad] = useState<UserType>()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setUserLoad(user)
        console.log(user)
        setAnsLoad(answers)
        console.log("loaded")
        setLoading(false)
    }, [user, answers])
    if(loading) return <p>loading</p>
    const sendAnswers = () => {
        const data = {
            user: userLoad,
            answers: ansLoad,
            survey_id: surveyContent.survey_id
        }
        console.log(data)
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/question/1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return(
        <button onClick={sendAnswers}> Submit </button>
    )
}