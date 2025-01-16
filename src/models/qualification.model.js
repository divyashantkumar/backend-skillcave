/*
    id ObjectId pk
    user_id ObjectId fk
    type string // [deploma, graduation, postGraduation, doctorate, "other"]
    duration string // [Degree, Certification, Diploma]
    field_of_study string
    completion_status string
    start_date Date
    end_date Date
    percentage number
    institute ObjectId fk
*/

import { Schema, model } from 'mongoose';


const qualificationSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: [true, 'User id is required']
        },
        type: {
            type: String,
            lowercase: true,
            index: true,
            enum: {
                values: ['diploma', 'graduation', 'post-graduation', 'doctorate', "drop-out",'other'],
                message: '{VALUE} is not a valid qualification type'
            },
            required: true
        },
        duration: {
            type: Number,
            required: false
        },
        field_of_study: {
            type: String,
            lowercase: true,
            required: false
        },
        completion_status: {
            type: String,
            enum: {
                values: ['completed', 'ongoing', 'dropped'],
                message: '{VALUE} is not a valid completion status'
            },
            required: false
        },
        start_date: {
            type: Date,
            required: false
        },
        end_date: {
            type: Date,
            required: false
        },
        percentage: {
            type: Number,
            min: 0,
            max: 100,
            required: false,
        },
        institute: {
            type: Schema.Types.ObjectId,
            ref: 'Institute',
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


const Qualification = model('Qualification', qualificationSchema);
export default Qualification;
