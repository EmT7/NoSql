const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: "Please choose a reaction less than 100 characters!",
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

  const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "Please choose a thought less than 300 characters!",
        minlength: 1,
        maxlength: 300,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        //!create a formatter file for the date
      },
      userName: {
        type: String,
        required: true,
      },
      reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );

  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  const Thought = model("Thought", ThoughtSchema);
  const Reaction = model('Reaction', ReactionSchema);
  
  module.exports = Thought;