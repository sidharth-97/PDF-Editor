import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    pdf: [
        {
            name: String,
            url: String,
          },
    ]
})

const User = models.User || model("User", UserSchema)
export default User