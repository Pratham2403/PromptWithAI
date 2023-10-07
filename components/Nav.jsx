"use client"
/**
 * Functionalities like hooks and much more are needed to be specified client side typing otherwise it willl ffall into errors
 * These { .....  } braces defiines that well be typing javascript here inside our HTML pages to improve the functilities
 *
 * You can use " {alert(session?.user)} "  or " {alert(providers)} " to check whether they are working or not or their properties re set down to NULL or what
 */

import Link from "next/link" // Linkning Functionalitiles tom help makae it a single paged broser
import Image from "next/image" // Image editing functinality
import { useState, useEffect } from "react" // These hooks works only on Client Side, so itll show error if not mentioned cleat side servers
import { signIn, signOut, useSession, getProviders } from "next-auth/react" // Takes in Authentication functions for sooth authentication functianlities

const Nav = () => {
    // const isUserLoggedin = true

    const { data: session } = useSession() // Session is used effectively ============Learn syntax============

    const [providers, setProviders] = useState(null) // Defines the state of the Valiables through Hooks.
    const [toggleDropdown, setToggleDropdown] = useState(null) //It is basically like providing smooth functianality to our website, i.e its automations etc.......

    useEffect(() => {
        // defining the Effect Change functions
        const setUpProviders = async () => {
            //Asynchronous function set certain parameters for uthentication
            const response = await getProviders() //getProviders() function does all the job we need to setup our authentication required
            setProviders(response) // it transfers it values valck to its parent functions, Probably a method to append new values into the database
        }

        setUpProviders() // Calling the function to actually run
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                {" "}
                {/* creats links and have much more enhanced functianlities rather tahn using normaal links on the page */}
                <Image
                    src="/assets/images/logo.svg"
                    alt="PromptWithAI Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />{" "}
                {/* These Imports the Images Property of the Next Framework where we can edit images combinitg the language of both CSS and JS aand HTML */}
                <p className="logo-text"> PropmtWithAI</p>
            </Link>

            {/* Desktop Navigation meaning for desktop paged sized devices */}
            <div className="sm:flex hidden">
                {" "}
                {/* On Small devices it show the property of being flexed out */}
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            className="outline_btn"
                            onClick={signOut}
                        >
                            SignOut
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user.image} // Uploads the image of the user at that particular session
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map(
                                (
                                    provider, //If provides exist and then valuess of providers mush match to the seperate links to different providers
                                ) => (
                                    ///* in out case we'll be using only google authentication only one option to do */
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        SignIn
                                    </button>
                                ),
                            )}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? ( // Checks in that in that particular sesion a user is logged in or not
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id)
                                    }}
                                    className="black_btn"
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
