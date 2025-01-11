/*
    id ObjectId pk 
    name string
    type string // [shool, college, university, etc..]
    affiliated_from string
    city ObjectId fk
    state ObjectId fk
    country ObjectId fk
    pin_code string
*/

import { Schema, model } from 'mongoose';


const instituteSchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'Institute name is required'],
        },
        type: {
            type: String,
            enum: {
                values: ['school', 'college', 'university', 'other'],
                message: '{VALUE} is not a valid institute type'
            },
            trim: true,
            required: false
        },
        affiliated_from: {
            type: String,
            lowercase: true,
            trim: true,
            required: false
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'City',
            trim: true,
            required: false
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State',
            trim: true,
            required: false
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            trim: true,
            required: false
        },
        pin_code: {
            type: String,
            trim: true,
            required: false
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

const Institute = model('institute', instituteSchema);
export default Institute;



