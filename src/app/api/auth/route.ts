import { PrismaClient } from "@prisma/client"
const ps = new PrismaClient()
export async function POST(request: Request){

    const user = await request.json()
    console.log(user.username)
    console.log(user.password)
    const findUser = await ps.admin_accounts.findFirst({
        where:{
            user_name:user.username
        }
    })
    console.log(user)
    if(findUser != null){
        if(user.password == findUser.password){
            return(Response.json({
                success: true,
                body: {
                    user_name: user.username,
                    admin_type: findUser.admin_type
                }
            }, {status: 200}))
        } else {
            return(Response.json({
                success: false,
                body: "wrong password / account information"
            }, {status: 200}))
        }
    } else {
        return(Response.json({
            success: false,
            body: "No account found"
        }, {status: 404}))
    }
}