import { PrismaClient } from "@prisma/client";

const ps = new PrismaClient()

export async function GET(request: Request){
    const departments = await ps.departments.findMany()
    if(departments != null){
        return Response.json({
            status: true,
            message: "Departments retrieved",
            body: departments
        }, {status: 200})
    } else {
        return Response.json({
            success: false,
            message: "No departments found",
            body: []
        }, {status: 404})
    }
}
