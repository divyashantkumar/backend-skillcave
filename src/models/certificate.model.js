/*
    
*/

import { Schema, model } from 'mongoose';


const certificateSchema = new Schema(
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

const Certificate = model('Certificate', certificateSchema);

export default Certificate;



