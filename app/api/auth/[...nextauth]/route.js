/**
 * =======================All this Basics can be learned though Next-Auth Documnetation======================
 *
 *
 * The Square bracket signifies the dynamically allocateed items being exported to the website from backend
 *
 * Every Next JS route is a serverless route hece it is a lambda function which opens up only when it is called that spin ups the server and calls
 */

import NextAuth from "next-auth" // Imports atuhenticwation functianality to your weebsite
import GoogleProvider from "next-auth/providers/google" // Imports google authentaication to your website

import { connectToDB } from "@utils/database" //Imports the database to the routeing part
import User from "@models/user"

const handler = NextAuth({
    // Handles the Authenticaatoin part
    // All the things mark inside are comma seperated to showinf that these are some default parameters tha twe pass to the function
    providers: [
        // Options Object Provided and inside selecting Google Provider Option we then further select more options that we need to make the project
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    //All these ayncc and signin functionsmst go in the callbacks so that they aare stores in the database otherwise nothing would be stored in the database
    callbacks: {
        // session iss being appended through this
        async session({ session }) {
            const sessionUser = await User.findOne({
                //again fids the email through the running session whenever we open the WebTransportBidirectionalStream. Just like the cookies where a website knows that you have logged in to the website
                email: session.user.email,
            })

            session.user.id = sessionUser._id.toString()

            return session
        },
        //profile isbeing appended through this
        async signIn({ profile }) {
            try {
                await connectToDB() //Connects our database
                //Firstly we need to create a model onto how the data will be stored inside the direectory

                //Check if user already exists
                const userExists = await User.findOne({
                    // If the user exists it finds the email address throught the databse and stores as a boolean value in UserExists variable
                    email: profile.email,
                })

                //If not create a new user and save it to the database
                if (!userExists) {
                    // If the user does not exist than it will do the following operations in the area given below
                    await User.create({
                        // Creates the User
                        email: profile.email, //Imputs its email ID
                        username: profile.name.replace(" ", "").toLowerCase(), // Takesin the Profile name, Removes spaces and converts into Lower case strings
                        image: profile.picture, //takes in the image of the user
                    })
                }

                return true
                //Return True
            } catch (error) {
                console.log("Error checking if User Exists : ", error.message)
                return false
            }
        },
    },
})

export { handler as GET, handler as POST }
