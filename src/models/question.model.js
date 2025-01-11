/*
    
*/

import { Schema, model } from 'mongoose';


const questionSchema = new Schema(
    {
        
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



