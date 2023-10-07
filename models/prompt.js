import mongoose, { Schema, model, models } from "mongoose" // Similarlywe have imported the required parameters

const PromptSchema = new Schema({
    // You can read the documentation to learn more about it
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This makes sures that a single user can make many propmpts. All this shit will work in that particular session where that user is working and understanding
    },
    prompt: {
        type: String,
        required: [true, "Prompt is Required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is Required"],
    },
})

const Prompt = models.Prompt || model("Prompt", PromptSchema) // This is statement works like => If a particular prompt exists in the 'models' then no problem, if not then create a new Model, in 'Prompt' thought the structure defined in the PromptSchema


//We are exporting the above Prompt only because we need the PromptSchema only when that particular structure is needed to be created or modified
export default Prompt 


// Now our Mongoose and Mongodb knows how our data should look like, then well be importing it through backend