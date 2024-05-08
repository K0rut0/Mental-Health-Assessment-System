"use client"
import React, {useContext, useState, createContext, Children, ReactNode, ContextType} from "react";

interface QuestionResponse{
    response_value: number,
    question_id: number
}

interface AnswerContextType{
    answers: QuestionResponse[]
    setAnswers: React.Dispatch<React.SetStateAction<QuestionResponse[]>>
}

const AnswerContext = createContext<AnswerContextType | null>(null)
export function useAnswerContext(){
    const context = useContext(AnswerContext)
    if(!context){
        throw new Error("useAnswerContext needs to be wrapped in a UserProvider")
    }
    return context
}

export function AnswerProvider({children}: {
    children: ReactNode
}){
    const [answers, setAnswers] = useState<QuestionResponse[]>([]);
    
    return(
        <AnswerContext.Provider value={{answers, setAnswers}}>
            {children}
        </AnswerContext.Provider>
    )
}