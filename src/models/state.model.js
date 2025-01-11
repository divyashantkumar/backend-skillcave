/*
    id ObjectId pk
    name string
    code string
    country_id ObjectId fk
*/

import { Schema, model } from 'mongoose';


const stateSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'State name is required'],
        },
        code: {
            type: String,
            trim: true,
            required: [true, 'State code is required'],
        },
        country_id: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            trim: true,
            required: [true, 'Country id is required'],
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

const State = model('State', stateSchema);
export default State;
