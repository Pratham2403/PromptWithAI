import "@styles/globals.css" // Imports CSS from styles folder using "@" for simplicity

/* 
These below Compomemts are added because we need them throughout all out links pages without any failure
 */
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
    //This is metadata defining Tiles and Descriptions.
    title: "PromptWithAI", // This Metatdata can be dynamic as well appending certain 'params' and other things as well
    description: "Discover and Share AI Prompts",
}

const RootLayout = ({ children }) => {
    //Just a parametere for which meaing is not knows

    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />{" "}
                        {/* Already Used CAn See Up in the Components. Imported in layout because we want it to be ther eerywhere in our code */}
                        <Provider />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
