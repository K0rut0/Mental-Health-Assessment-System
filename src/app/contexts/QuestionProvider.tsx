"use client"
import React, {useContext, useState, createContext, Children, ReactNode, ContextType, useEffect} from "react";
import Question from "../types/questions"

interface QuestionAPIRes{
    survey_id: number
    questions: Question[]
}

interface QuestionContextType {
    surveyContent: QuestionAPIRes
    setSurveyContent: React.Dispatch<React.SetStateAction<QuestionAPIRes>>
}

const QuestionContext = createContext<QuestionContextType | null>(null);
export function useQuestionContext(){
    const context = useContext(QuestionContext)
    if(!context){
        throw new Error("useQuestionContext needs to be wrapped in a QuestionProvider")
    }
    return context
}



export function QuestionProvider({children}: {
    children: ReactNode
}){
    const [surveyContent, setSurveyContent] = useState<QuestionAPIRes>({
        survey_id: 0,
        questions: []
    });
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/question/1`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(x => x.json()).then(x=>{
            setSurveyContent({
                survey_id: x.body.survey_id,
                questions: x.body.questions
            })
            setLoading(false)
            console.log(x.body)
        });
    },[]);
    if(loading) return <p>loading</p>
    return(
        <QuestionContext.Provider value={{surveyContent, setSurveyContent}}>
            {children}
        </QuestionContext.Provider>
    )
}