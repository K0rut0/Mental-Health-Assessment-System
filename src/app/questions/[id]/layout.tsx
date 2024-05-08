import { AnswerProvider } from "@/app/contexts/AnswerProvider"
import { QuestionProvider } from "@/app/contexts/QuestionProvider"
import { UserProvider } from "@/app/contexts/UserProvider"
import { ReactNode } from "react"


export default function Layout({ children }: {
    children: ReactNode
}){
    return(
    <>
        <UserProvider>
            <AnswerProvider>
                <QuestionProvider>
                    {children}
                </QuestionProvider>
            </AnswerProvider>
        </UserProvider>
    </>)
}