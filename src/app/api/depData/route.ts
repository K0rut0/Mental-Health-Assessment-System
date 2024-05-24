import { Prisma, PrismaClient } from "@prisma/client";
import { group } from "console";

const ps = new PrismaClient()
interface responseDta{
    round: string,
    min: number,
    max: number,
    acronym: string,
    id: number
}
interface deptResponses{
    summed_result: number;
    user_department: number
}
export async function GET(request: Request){
    const data: responseDta[] = await ps.$queryRaw(Prisma.sql`SELECT ROUND(AVG(processed_responses.summed_result), 2), 
    MIN(processed_responses.summed_result), MAX(processed_responses.summed_result), 
    departments.acronym, 
    departments.id 
    FROM processed_responses JOIN departments ON processed_responses.user_department = departments.id group by departments.id`)
    const groupedRes: deptResponses[]= await ps.$queryRaw(Prisma.sql`SELECT processed_responses.summed_result, processed_responses.user_department FROM processed_responses JOIN
    departments on  processed_responses.user_department = departments.id order by departments.id`)
    const departmentResponses: any = {}
    if(data != null){
        if(groupedRes != null){
            groupedRes.forEach((dept: any) => {
                departmentResponses[(dept.user_department).toString()] = []
            })
            groupedRes.forEach(pr => {
                departmentResponses[(pr.user_department).toString()].push(pr.summed_result)
            });
        }
        const aggregatedData:any = []
        data.forEach(element => {
            const temp = [...departmentResponses[element.id]].sort()
            let median = 0;
            if(temp.length %2 == 0){
                median = (temp[((temp.length)/2)-1] + temp[(temp.length)/2])/2
            } else {
                median = temp[(temp.length-1)/2]
            }
            aggregatedData.push({
                round: element.round,
                min: element.min,
                max: element.max,
                median: median,
                acronym: element.acronym,
                id: element.id
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