const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: "Please choose a reaction must be less than 100 characters!",
        //minlength and maxlength can be added as separate lines
        minlength: 1,
        maxlength: 100,
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );