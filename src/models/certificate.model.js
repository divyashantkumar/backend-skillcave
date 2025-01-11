/*
    id string pk
    user_id string fk
    name string
    category string
    issued_date Date
    expiry_date Date
    certificate_url string
*/

import { Schema, model } from 'mongoose';


const certificateSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: [true, 'User id is required']
        },
        name: {
            type: String,
            trim: true,
            required: [true, 'Certificate name is required'],
        },
        category: {
            type: String,
            trim: true,
            // enum: {
            //     values: ['deploma', 'graduation', 'postGraduation', 'doctorate', 'other'],
            //     message: '{VALUE} is not a valid certificate category'
            // },
            required: [true, 'Certificate category is required'],
        },
        issued_date: {
            type: Date,
            trim: true,
            required: [true, 'Certificate issued date is required'],
        },
        expiry_date: {
            type: Date,
            trim: true,
            required: [true, 'Certificate expiry date is required'],
        },
        certificate_url: {
            type: String,
            trim: true,
            required: [true, 'Certificate url is required'],
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

const Certificate = model('Certificate', certificateSchema);

export default Certificate;



