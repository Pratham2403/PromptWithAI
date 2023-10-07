import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async (request) => {
    //Generally req and res are used but in our project we wont be needing any res or req function
    const { userId, prompt, tag } = await request.json() // Here we are calling the statements but the order of the statements may give us some errors
    try {
        //ConnecttoDB is a lambda function. It dies as soon as it completes its job i.e, connecting to the database
        await connectToDB()

        //Similary how we created a new User we'll be creating a new Prompt

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        }) // Here we have passed the desired parameters fromour frotend to our backend

        await newPrompt.save()

        /**
         * The Response interface of the Fetch API represents the response to a request.

            You can create a new Response object using the Response() constructor, but you are more likely to encounter a Response object being returned as the result of another API operation—for example, a service worker FetchEvent.respondWith, or a simple fetch().
         */

        return new Response(JSON.stringify(newPrompt), {
            status: 201, // This is something based on the facts where there are certain statuses between 200-299
        })
    } catch (error) {
        return new Response("Failed to create a new Prompt", { status: 500 })
    }
}
