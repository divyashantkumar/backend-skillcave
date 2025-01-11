/*
    
*/

import { Schema, model } from 'mongoose';


const identificationSchema = new Schema(
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

const Identification = model('Identification', identificationSchema);
export default Identification;
