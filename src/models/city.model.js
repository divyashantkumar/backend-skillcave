/*
    id ObjectId pk
    name string
    code string
    state_id ObjectId fk
*/

import { Schema, model } from 'mongoose';


const citySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'City name is required'],
        },
        code: {
            type: String,
            trim: true,
            required: [true, 'City code is required'],
        },
        state_id: {
            type: Schema.Types.ObjectId,
            ref: 'State',
            trim: true,
            required: [true, 'State id is required'],
        },
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
