"use client"
import Link from 'next/link'
import { QuestionProvider, useQuestionContext } from '@/app/contexts/QuestionProvider';
import {AnswerProvider, useAnswerContext} from '../../contexts/AnswerProvider';
import RadioCustom from "../../../components/custom/RadioCustom"
import { useEffect, useState } from 'react';
import { UserProvider, useUserContext } from '@/app/contexts/UserProvider';
import Question from '@/app/types/questions';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface QuestionResponse{
    response_value: number,
    question_id: number
}

interface UserType{
    user_email: string;
    user_name: string;
    user_year_level: number;
    user_program: string;
    user_department: string
}

export default function QuestionForm({params}: {
    params:{
        id: string
    }
}){
    return(
        <QuestionPrompt params={params}></QuestionPrompt>
    )
}

function QuestionPrompt({params}:{
    params:{
        id: string
    }
}){
    const{surveyContent, setSurveyContent} = useQuestionContext()
    const {answers, setAnswers} = useAnswerContext()
    const {user} = useUserContext()
    const [ansLoad, setAnsLoad] = useState<QuestionResponse[]>()
    const [userLoad, setUserLoad] = useState<UserType>()
    const currentQuestionIndex = parseInt(params.id)-1
    const [radioValue, setRadioValue] = useState(0);
    useEffect(() => {
        setUserLoad(user)
        console.log(user)
        setAnsLoad(answers)
    }, [user, answers, radioValue])
    const setValue = (value: number) =>{
        console.log(value)
        //console.log(surveyContent)
        setRadioValue(value);
    }
    
    const setAnswerValue = () =>{
        let values: QuestionResponse = {
            response_value: radioValue,
            question_id: surveyContent.questions[currentQuestionIndex].id
        }
        let temp = [...answers];
        temp.push(values);
        setAnswers(temp);
    }
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
    const next = <Link href={`/questions/` + (currentQuestionIndex + 2)} onClick={setAnswerValue}>Next</Link>
    const submit = <Link href={`/submit`} onClick={setAnswerValue}>Next</Link>

    let LinkButton = next
    if(parseInt(params.id) == surveyContent.questions.length){
        LinkButton = submit
    } else {
        LinkButton = next
    }
    return(
        <Card>
            <CardHeader>
                <CardTitle>{surveyContent.questions[currentQuestionIndex].question}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioCustom question={surveyContent.questions[currentQuestionIndex]} onChange={(e: number) => setValue(e)}/>
                {LinkButton}
            </CardContent>
        </Card>
        
    )
}