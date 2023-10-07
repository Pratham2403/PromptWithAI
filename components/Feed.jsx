"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {/* Now we can Directly Put our data, but first we need to define A GET funcion to get the desired parameters and make the request to our next JS API  */}
            {/* to That 'data' which we have rcieved we will create a map that will point to the different tags and search for it down here */}
            {data.map((post) => (
                //Map the data based on the variable 'post' to the below PromptCard component defining//
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    //Will give an error if the statement below is not defined inTime
    const [searchText, setSearchText] = useState("") //Empty string to set the inital phase of searching to empty which will in future give us real time changes in our searches
    const [posts, setPosts] = useState([]) // For now an empty array

    const handleSearchChange = (e) => {
        // Handle Search function which gets an event for now
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt") // Make sure that this API end point is created and properly connected
            const data = await response.json()
            //Now after thiswe can update our state using the new useState field above
            setPosts(data)
        }
        fetchPosts()
    }, []) // These square brackets signifies that this will be loaded as soon as the page starts

    return (
        <section className="feed">
            <form className="relative w-full flex-centre">
                <input
                    type="text"
                    placeholder="Search for Prompts or Tags or UserName"
                    value={searchText} // We have to create this fucntion to incorporate the desired facilities
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            {/* As this prompt card list will be used here only in the Document we can directly defines its function in this file itself ratherthan creating a seperate component and rendering it */}
            <PromptCardList
                data={posts} //Empty array of elements will be stored in the data => the stored 'posts' throught the posts functions will now be transferred to this
                handleTagClick={() => {}} // Created an empty callback function
            />

            {/* right here we will be rendering our prompts and show it down here */}
        </section>
    )
}

export default Feed
