import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile</span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-10 prompt_layout">
                {/* Now we can Directly Put our data, but first we need to define A GET funcion to get the desired parameters and make the request to our next JS API  */}
                {/* to That 'data' which we have rcieved we will create a map that will point to the different tags and search for it down here */}
                {data.map((post) => (
                    //Map the data based on the variable 'post' to the below PromptCard component defining//
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Profile
