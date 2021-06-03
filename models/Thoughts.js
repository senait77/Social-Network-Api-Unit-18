const { Schema, model, Types }= require('mongoose');
const moment = require('moment');

// reaction schema
const ReactionSchema = new Schema (
    {
        //set custom ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()

        },
        reactionBody:  {
           type: String,
           required: true,
           maxlength: 280
        },
        username: {
            type: String,
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM DD, YYYY [at] hh:mm a') 

        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Thoughts Schema
const ToughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280

        },
        createdAt: {
            type: Date,
            default: Date.now,
            //moment
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

        },
        username: {
            type: String,
            required: ture

        },
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true

        },
        id: false
    }
);

// get total count of reaction
ThoughtsSchema.virtuals('reactionCount').get(function() {
    return this.reactions.length;
});

// create the thoughts model using the thoughts schema
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;