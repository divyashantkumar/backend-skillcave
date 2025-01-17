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
            enum: {
                values: ['coding', 'aptitude', 'isometric'],
                message: '{VALUE} is not a valid question category'
            },
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
        options: [
            {
                option: {
                    type: String,
                    trim: true,
                },
                options_type: {
                    type: String,
                    enum: {
                        values: ["text", "code", "image", "video"],
                        message: '{VALUE} is not a valid option\'s type'
                    },
                    default: "text"
                },
                option_score : {
                    type: Number,
                    min: 0,
                    default: 0
                }
            }
        ],
        correct_answer: {
            type: String,
            trim: true,
            required: [false, 'Question correct answer is required'],
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



