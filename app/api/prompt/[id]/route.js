/**
 * It must have 3 functions : -
 * 1. GET : to read the data
 * 2. PATCH - to update the data
 * 3. DELETE - to delete the data
 */

import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    try {
        await connectToDB() // Always the First Step of the Routing fucntions

        const prompt = await Prompt.findById(params.id).populate("creator") // Can be read as => Prompt dot find all th posts dot populate it with the creator as well to see who created it. i.e, it gives us all the post and also all the creators of the these posts

        if (!prompt) return new Response("Prompt Not Found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all the Prompts", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response("Prompt Not Found", { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to Update the Prompt", { status: 500 })
    }
}
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt Deleted Successfully", { status: 200 })
    } catch (error) {
        return new Response("Prompt Failed to Delete", { status: 500 })
    }
}
