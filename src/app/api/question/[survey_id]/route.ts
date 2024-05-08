"use server"
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Question from "@/app/types/questions";
const ps = new PrismaClient()


interface surveyType{
    survey_name: string;
    period_administered: string;
    id: number;
    survey_description: string | null;
    is_active: boolean
}
interface Response{
    question_id: number;
    survey_id: number;
    user: string;
    response_value: number;
    date_answered: Date;

}
export async function GET(request: Request, {params}:{
    params: {
        survey_id: string
    }
}){
    try{
        const current_survey = await ps.surveys.findFirst({
            where:{
                is_active: true
            }
        })
        let res : Question[];
        if(current_survey != null){
            res = await ps.$queryRaw`SELECT * FROM survey_content JOIN questions ON survey_content.question_id = questions.id WHERE survey_id = ${current_survey.id}`
        } else {
            return Response.json({
                success: false,
                body: "No survey found",
            }, {status: 404})
        }
        let data = {
            survey_id: current_survey.id,
            questions: res
        }
        if(data != null){
            return Response.json({
                success: true,
                body: data
            }, {status: 200})
        }
    } catch (err) {
        console.log(err)
    }
}
export async function POST(request: Request){
    const data = await request.json()
    const user = data.body.user.user_name
    //console.log(user)
    const answers = data.body.answers
    const survey_id = data.body.survey_id
}