/*
    id ObjectId pk
    user_id ObjectId fk
    type string
    id_number string
    verification boolean
*/

import { Schema, model } from 'mongoose';


const identificationSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: [true, 'User id is required']
        },
        type: {
            type: String,
            trim: true,
            enum: {
                values: ['PAN', 'Aadhar', 'Driving License', 'Passport'],
                message: '{VALUE} is not a valid identification type'
            },
            required: [true, 'Type is required'],
        },
        id_number: {
            type: String,
            trim: true,
            required: [true, 'Id number is required'],
        },
        verification: {
            type: Boolean,
            default: false,
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

const Identification = model('Identification', identificationSchema);
export default Identification;
