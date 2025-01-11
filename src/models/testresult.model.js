/*
    
*/

import { Schema, model } from 'mongoose';


const testResultSchema = new Schema(
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

const TestResult = model('TestResult', testResultSchema);

export default TestResult;



