/*
    
*/

import { Schema, model } from 'mongoose';


const stateSchema = new Schema(
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

const State = model('State', stateSchema);
export default State;
