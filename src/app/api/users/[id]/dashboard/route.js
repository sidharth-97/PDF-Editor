import User from '../../../../../models/user'

export const GET = async (request,{params}) => {
    try {
        const user = await User.findById(params.id)
        return new Response(JSON.stringify(user.pdf),{status:200})
    } catch (error) {
        return new Response("Request failed",{status:500})
    }
}