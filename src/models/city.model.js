/*
    
*/

import { Schema, model } from 'mongoose';


const citySchema = new Schema(
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

const City = model('City', citySchema);
export default City;
