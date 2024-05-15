import { PrismaClient } from "../../../../node_modules/.prisma/client/default"
import { NextApiRequest, NextApiResponse } from "next"
const ps = new PrismaClient()

JSON.stringify(
    this,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
)

export async function GET(request: Request){
    const depts = await ps.departments.findMany({
        select: {
            id: true,
            name: true,
            acronym: true
        }
    })
    console.log(depts)
    const programs = await ps.programs.findMany({
        select:{
            id:true,
            program_name: true,
            program_acronym: true,
            program_department: true
        }
    })
    console.log(programs)
    let data = {
        departments: depts,
        programs: programs
    }
    if(depts != null && programs != null){
        return Response.json({
            success: true,
            body: data
        },{status: 200})
    } else {
        return Response.json({
            success: false,
            body: "no departments or courses found"
        }, {status: 404});
    }
}
