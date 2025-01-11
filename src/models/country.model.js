/*
    
*/

import { Schema, model } from 'mongoose';


const countrySchema = new Schema(
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

const Country = model('Country', countrySchema);
export default Country;
