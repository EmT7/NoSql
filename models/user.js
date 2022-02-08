const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: "Please choose a username",
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: "Please enter an email!",
            match: [/.+@.+\..+/, "Please enter a valid e-mail"],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

UserSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});
const user = model("user", userSchema);

module.exports = user;