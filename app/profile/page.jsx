"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    //Copied From the Feed
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`) // The location is dynamically changed to the dessired endpoint to get the exact location. Refer very closely how the json tree is made
            const data = await response.json()
            //Now after thiswe can update our state using the new useState field above
            setPosts(data)
        }
        if (session?.user.id) {
            fetchPosts()
        }
    }, []) // These square brackets signifies that this will be loaded as soon as the page starts

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to Delete This Prompt",
        )

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                })

                const filteredPost = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
