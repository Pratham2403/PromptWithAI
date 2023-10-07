import mongoose from "mongoose"

let isConnected = false //tracks the connection

export const connectToDB = async () => {
    //Exports the parameters of the database
    mongoose.set("strictQuery", true) // set the mongodb to struct query to pervent any random errors in the console

    if (isConnected) {
        //if Connected then outpur below
        console.log("MongoDB is connected")
        return
    }

    try {
        // If not Connected it connects the mongoose based on the URl provided in .env file and the required databses
        // await  keyword to wait till the database is conencted
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share-prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true //after conencted the mongodb dtabase we setup the values to true
    } catch (error) {
        console.log(error)
    }
}
