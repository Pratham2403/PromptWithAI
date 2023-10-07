import Feed from "@components/Feed" // This imports Feed Component

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            {" "}
            {/* Tailwind Css usage in action */}
            <h1 className="head_text text-center">
                Discover and Share
                <br className="max-md:hidden" />
                {/* On larger Devices This br tag will become ineffective*/}
                <span className="orange_gradient text-centre">
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                PromptWithAI is an OpenSource AI platform to discover, create
                and share creative prompts
            </p>
            <Feed /> {/* Used the Imported Component */}
        </section>
    )
}

export default Home
