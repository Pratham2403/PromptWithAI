"use client"
/**
 * We now just have to display the Prompt Card Alongside with the user who created it
 */
import { useState } from "react" // Because of these Hooks we have to define uses client
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState("")
    const { data: session } = useSession() // It is defined as all the data in that particular session is named as "session" in the form data:session
    const pathName = usePathname()
    const router = useRouter()

    const handleCopy = () => {
        /**
         * Remember the code given below it is very important to know and understand what is written here properly
         */
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(""), 3000)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={
                            copied === post.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className="my-4 font-santoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p
                className="font-inter text--sm blue_gradient cursor-pointer"
                onClick={() => {
                    handleTagClick && handleTagClick(post.tag)
                }} //This ensures that we have a tag and if we have a tag wewilll show releavant similar tags
            >
                {post.tag}
            </p>

            {session?.user.id === post.creator._id &&
                pathName === "/profile" && ( //if the user at that session is same as the id of the post creator and also the path is same as the name of the path and then show a div
                    <div className="mt-5 flex-centre gap-4 border-t border-gray-100 pt-3">
                        <p
                            className=" front-inter text-sm green_gradient cursor-pointer"
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                        <p
                            className=" front-inter text-sm orange_gradient cursor-pointer"
                            onClick={handleDelete}
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    )
}

export default PromptCard
