import { PrismaClient } from "@prisma/client";

const ps = new PrismaClient()
interface programEntry{
    id: number;
    program_name: string;
    program_department: number;
    program_acronym: string
}
interface progDept{
    string: programEntry[]
}
export async function GET(request: Request){
    const programs = await ps.programs.findMany()
    const programPerDept: any= {}
    if(programs != null){
        programs.forEach(dept => {
            programPerDept[(dept.program_department).toString()] = []
        })
        programs.forEach(pr => {
            programPerDept[(pr.program_department).toString()].push(pr.program_acronym)
        });
        console.log(programPerDept)
        return Response.json({
            status: true,
            message: "Departments retrieved",
            body: programPerDept
        }, {status: 200})
    } else {
        return Response.json({
            success: false,
            message: "No departments found",
            body: {
                message: "no programs found"
            }
        }, {status: 404})
    }
}