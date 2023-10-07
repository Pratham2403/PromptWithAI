import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request) => {
    try {
        await connectToDB() // Always the First Step of the Routing fucntions

        const prompts = await Prompt.find({}).populate("creator") // Can be read as => Prompt dot find all th posts dot populate it with the creator as well to see who created it. i.e, it gives us all the post and also all the creators of the these posts

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all the Prompts", { status: 500 })
    }
}
