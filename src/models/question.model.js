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

const optionSchema = new Schema(
    {
        option: {
            type: String,
            required: [true, 'Question option is required'],
            trim: true,
        },
        option_type: {
            type: String,
            enum: {
                values: ["text", "code", "image", "video"],
                message: '{VALUE} is not a valid option\'s type'
            },
            default: "text"
        },
        option_score: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        _id: false,
        id: false
    }
)


const questionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: [true, 'User id is required']
        },
        question: {
            type: String,
            trim: true,
            required: [true, 'Question is required'],
        },
        category: {
            type: String,
            enum: {
                values: ['coding', 'aptitude', 'isometric'],
                message: '{VALUE} is not a valid question category'
            },
            trim: true,
            required: [true, 'Question category is required'],
        },
        options: [optionSchema],
        duration: {
            length: {
                type: Number,
                trim: true,
                required: [true, 'Question duration is required'],
            },
            unit: {
                type: String,
                enum: {
                    values: ['seconds', 'minutes', 'hours'],
                    message: '{VALUE} is not a valid question duration unit'
                },
                trim: true,
                required: [true, 'Question duration unit is required'],
            }
        },
        answer: {
            type: String,
            trim: true,
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



