import { Prisma, PrismaClient } from "@prisma/client";
import { group } from "console";

const ps = new PrismaClient()
interface responseDta{
    avg_summed_result: string,
    min_summed_result: number,
    max_summed_result: number,
    user_program: string,
    id: number,
    program_department: number
}
interface deptResponses{
    summed_result: number;
    user_program: string
}
export async function GET(request: Request){
    const data: responseDta[] = await ps.$queryRaw(Prisma.sql`SELECT
    ROUND(AVG(processed_responses.summed_result), 2) AS avg_summed_result,
    MIN(processed_responses.summed_result) AS min_summed_result,
    MAX(processed_responses.summed_result) AS max_summed_result,
    processed_responses.user_program,
    programs.id,
    programs.program_department
  FROM
    processed_responses
  JOIN (
    SELECT
      program_acronym,
      MIN(id) AS id,
      MIN(program_department) AS program_department
    FROM
      programs
    GROUP BY
      program_acronym
  ) AS programs ON processed_responses.user_program = programs.program_acronym
  GROUP BY
    programs.id, processed_responses.user_program, programs.program_department;
  `)
    const groupedRes: deptResponses[]= await ps.$queryRaw(Prisma.sql`SELECT processed_responses.summed_result, processed_responses.user_program FROM processed_responses JOIN
    programs on  processed_responses.user_program = programs.program_acronym order by programs.program_acronym;`)
    const departmentResponses: any = {}
    if(data != null){
        if(groupedRes != null){
            groupedRes.forEach((dept: any) => {
                departmentResponses[(dept.user_program).toString()] = []
            })
            groupedRes.forEach(pr => {
                departmentResponses[(pr.user_program).toString()].push(pr.summed_result)
            });
        } else {
            console.log("null")
        }
        const aggregatedData:any = []
        data.forEach(element => {
            const temp = [...departmentResponses[element.user_program]].sort()
            let median = 0;
            if(temp.length %2 == 0){
                median = (temp[((temp.length)/2)-1] + temp[(temp.length)/2])/2
            } else {
                median = temp[(temp.length-1)/2]
            }
            aggregatedData.push({
                round: element.avg_summed_result,
                min: element.min_summed_result,
                max: element.max_summed_result,
                median: median,
                acronym: element.user_program,
                id: element.id,
                program_department: element.program_department
            })
        });
        console.log(aggregatedData)
        return Response.json({
            status: true,
            message: "Department data retrieved",
            body: aggregatedData
        }, {status: 200})
    } else {
        return Response.json({
            success: false,
            message: "No responses found",
            body: []
        }, {status: 404})
    }
}