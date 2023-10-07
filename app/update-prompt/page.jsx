"use client"

import { useEffect, useState } from "react" // As it is a use state then automatically we have to define it in Use Clients
import { useSession } from "next-auth/react" // Allows us to tell which users are curernctly logged in
import { useRouter, useSearchParams } from "next/navigation" // This helps us connections of the routinfg

import Form from "@components/Form"

const UpdatePrompt = () => {
    const router = useRouter()

    const searchParams = useSearchParams() //this will help us search the id inn the query
    const promptId = searchParams.get("id")

    const [submitting, setSubmitting] = useState(false) // All the values of the UseState prompt has beem set to false
    const [post, setPost] = useState({
        // the posts to be written and fetched to or from the database has been set to Empty Strnigs
        prompt: "",
        tag: "",
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`) // Here the data is fetched from the location to the variable
            const data = await response.json() // Now the data is stored in the form of the json tree in this data

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId]) // It will change whenever there is a change in promptId which will be taken from the query(id thingy writtn in the URL)

    //async error function
    const updatePrompt = async (e) => {
        e.preventDefault() //Prevents the regular behaviour of being reloaded everytime
        setSubmitting(true)

        if (!promptId) return alert("Missing Prompt Id !!!!")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                //Rather than asking for a POST request we will be asking for a PATCH request
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    // No need of the user Id as we already now the User ID here
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
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt
