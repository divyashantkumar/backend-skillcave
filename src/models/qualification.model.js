/*
    
*/

import { Schema, model } from 'mongoose';


const qualificationSchema = new Schema(
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

const Qualification = model('Qualification', qualificationSchema);
export default Qualification;
