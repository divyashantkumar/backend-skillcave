/*
    id ObjectId pk
    name string
    code string
*/

import { Schema, model } from 'mongoose';


const countrySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Country name is required'],
        },
        code: {
            type: String,
            trim: true,
            required: [true, 'Country code is required'],
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

const Country = model('Country', countrySchema);
export default Country;
