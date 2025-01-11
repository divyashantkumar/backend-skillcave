/*
    
*/

import { Schema, model } from 'mongoose';


const instituteSchema = new Schema(
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

const Institute = model('institute', instituteSchema);
export default Institute;



