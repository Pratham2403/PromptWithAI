"use client"

import { useState } from "react" // As it is a use state then automatically we have to define it in Use Clients
import { useSession } from "next-auth/react" // Allows us to tell which users are curernctly logged in
import { useRouter } from "next/navigation" // This helps us connections of the routinfg

import Form from "@components/Form"


const CreatePrompt = () => {

    const router = useRouter();
    const {data: session} = useSession()


    const [submitting, setSubmitting] = useState(false) // All the values of the UseState prompt has beem set to false
    const [post, setPost] = useState({
        // the posts to be written and fetched to or from the database has been set to Empty Strnigs
        prompt: "",
        tag: "",
    })

    //async error function
    const createPrompt = async (e) => {
        e.preventDefault() //Prevents the regular behaviour of being reloaded everytime
        setSubmitting(true)

        try {
            const response = await fetch("/api/prompt/new", { // We will be passing all this data through JSON stringify to the api route provided into the application
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id, // This line will show error if we have not imported the user and hence we wont be able to access its ID
                    tag: post.tag,
                }),
            })

            if (response.ok) {
                router.push("/") //This will also show us the error if we have not importede router here as well
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
