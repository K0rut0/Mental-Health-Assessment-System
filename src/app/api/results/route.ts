import { PrismaClient } from "@prisma/client"
const ps = new PrismaClient()

export async function GET(request: Request){
    const current_survey = await ps.surveys.findFirst({
        where:{
            is_active: true
        }
    })
    if(current_survey == null){
        return Response.json({
            success: false,
            body: "no survey found"
        }, {status: 404})
    }
    const results = await ps.processed_responses.findMany({
        where: {
            period_answered: current_survey.period_administered
        }
    })
    if(results == null){
        return Response.json({
            success: false,
            body: "no survey found"
        }, {status: 404})
    }
    const answers = results.map(x => x.summed_result)
    const average = answers.reduce((a, b) => a+b) / answers.length
    return Response.json({
        success: true,
        body:{
            average: average
        }
    }, {status: 200})
}