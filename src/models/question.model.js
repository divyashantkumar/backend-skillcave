/*
    id ObjectId pk
    category string // [coding, apti, isometric]
    score number
    duration number
    question string
    options [string] // 4 options
    has_coding_snippet boolean
    correct_answer string
*/

import { Schema, model } from 'mongoose';


const questionSchema = new Schema(
    {
        category: {
            type: String,
            // enum: {
            //     values: ['coding', 'apti', 'isometric'],
            //     message: '{VALUE} is not a valid question category'
            // },
            trim: true,
            required: [true, 'Question category is required'],
        },
        score: {
            type: Number,
            trim: true,
            required: [true, 'Question score is required'],
        },
        duration: {
            type: Number,
            trim: true,
            required: [true, 'Question duration is required'],
        },
        question: {
            type: String,
            trim: true,
            required: [true, 'Question is required'],
        },
        options: {
            type: [String],
            trim: true,
            required: [true, 'Question options are required'],
        },
        has_coding_snippet: {
            type: Boolean,
            default: false
        },
        correct_answer: {
            type: String,
            trim: true,
            required: [true, 'Question correct answer is required'],
        }
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

const Question = model('Question', questionSchema);

export default Question;



