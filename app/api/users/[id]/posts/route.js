//We have created a dynamic [id] floder defining posts for different IDs

import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (request, { params }) => {
    //These params gets populated only when we pass dynamic Variables in URL(For example in profiles pages.jsx we have passed `<certain JS parameters her>` those parameter will be catched and seen by the params . Here we can see hat ID is the dynamic parameter
    try {
        await connectToDB() // Always the First Step of the Routing fucntions

        const prompts = await Prompt.find({ creator: params.id }).populate( //Here we will define the creatpr and this find the prompts and populate it with that
            "creator",
        ) // Can be read as => Prompt dot find all th posts dot populate it with the creator as well to see who created it. i.e, it gives us all the post and also all the creators of the these posts

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all the Prompts", { status: 500 })
    }
}
