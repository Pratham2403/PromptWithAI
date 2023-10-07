import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    //defines how different user sheme palletes must be used
    email: {
        type: String, //Defines its type
        unique: [true, "Email Already Exists"], //Uniqueness
        required: [true, "Email is Required"], // Required or not
    },

    username: {
        type: String,
        required: [true, "Username is Required"],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        ],
    },
    image: {
        type: String,
    },
})

/**
 * We will do this when we have a normal database. Which is running all the time. But in next Js we will define the route onlt when it is being called and not all the time we need it to be working
 *
 * const User = model("User", UserSchema)
 * export default User
 */

/**
 * The "models" object is provided by the Mongoos eLibrary and stores all the registered models.
 * If a model names "User"  already exists in the "models" object, it assigns that existing model to the "User" variable.
 * This preventwws redefinging the model and ensures that the existing model is reused
 *
 * If a model named "User" does not exist in the "models" object, the "model" function from mongoose is called to create a new model
 * The newly cretaed model is then assigned to the "User" variable
 */

const User = models.User || model("User", UserSchema)
export default User
