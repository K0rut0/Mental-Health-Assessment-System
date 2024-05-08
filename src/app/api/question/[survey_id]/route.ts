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
interface QuestionResponse{
    response_value: number,
    question_id: number
}
interface responseData{
    survey_id: number;
    question_id: number;
    response_value: number;
    date_answered: Date;
    year_level: number;
    program: string;
    user_email: string;
    user_name: string;
}
interface Response{
    question_id: number;
    survey_id: number;
    user: string;
    response_value: number;
    date_answered: Date;
}
interface QuestionResponse{
    response_value: number,
    question_id: number
}
interface ProcessedData{
    user_email: string,
    date_answered: Date,
    period_answered:string | null,
    summed_result: number,
    user_name: string
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
        return Response.json({
            success: false,
            body: "No survey found",
        }, {status: 404})
        console.log(err)
    }
}
export async function POST(request: Request){
    try{
        const data = await request.json()
        const user = data.user
        const answers = data.answers
        const survey_id = data.survey_id
        const d = new Date()
        d.toLocaleDateString()
        const responses: responseData[] = []
        let sum = 0;
        answers.forEach((element:QuestionResponse)=> {
            responses.push({
                survey_id: survey_id,
                question_id: element.question_id,
                response_value: element.response_value,
                date_answered: d,
                year_level: user.user_year_level,
                program: user.user_program,
                user_email: user.user_email,
                user_name: user.user_name
            })
            sum+=element.response_value
        });
        await ps.responses.createMany({
            data: responses
        })
        const period = await ps.surveys.findFirst({
            where:{
                id: survey_id
            }
        })
        if(period != null){
            await ps.processed_responses.create({
                data: {
                    user_email: user.user_email,
                    date_answered: d,
                    period_answered: period.period_administered,
                    summed_result: sum,
                    user_name: user.user_name
                }
            })
        }
        return Response.json({
            success: true,
            body: "Records Inserted",
        }, {
            status: 200
        })
    } catch(err){
        return Response.json({
            success: false,
            body: "No survey found",
        }, {status: 404})
        console.log(err)
    }

}