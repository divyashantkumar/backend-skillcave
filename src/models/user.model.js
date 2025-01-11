/*
    first_name string
    last_name string
    phone number
    email string
    password string
    avatar string
    role string
    age number
    gender string
    dob Date
    qualification ObjectId
    permanent_address ObjectId
    contact_address ObjectId
    city ObjectId // city_id  
    state ObjectId // state_id
    country ObjectId // country_id
    pin_code string
    idenification_type string //  PAN, Aadhar, etc. 
    idenification_verified boolean
    certificates [ObjectId]
*/

import { Schema, model } from 'mongoose';


const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, 'first_name is required'],
            minlength: [2, 'First name must be at least 2 characters long'],
            maxlength: [50, 'First name must not exceed 50 characters'],
            match: [/^[a-zA-Z]+$/, 'First name can only contain letters'],
            trim: true,
        },
        last_name: {
            type: String,
            required: false,
            minlength: [1, 'Last name must be at least 2 characters long'],
            maxlength: [50, 'Last name must not exceed 50 characters'],
            match: [/^[a-zA-Z]+$/, 'Last name can only contain letters'],
            trim: true,
            default: '',
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Phone number is required'],
            match: [/^\+?\d{10,15}$/, 'Phone number must be a valid phone number'],
            trim: true
        },
        // 64characters@total254.chars
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
            maxlength: [254, 'Email must not exceed 100 characters'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
            maxlength: [100, 'Password must not exceed 100 characters'],
            trim: true,
            match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'],
        },
        avatar: {
            type: String,
            trim: true,
            default: ""
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            trim: true
        },
        age: {
            type: Number,
            min: [0, 'Age must be at least 0'],
            max: [150, 'Age must not exceed 150'],
            trim: true,
            default: 0
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: 'other',
            trim: true
        },
        dob: {
            type: Date,
            trim: true,
            default: Date.now
        },
        qualifications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Qualification',
                default: null
            }
        ],
        contact_address: {
            type: String,
            trim: true,
            default: ''
        },
        permanent_address: {
            type: String,
            trim: true,
            default: ''
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'City',
            trim: true,
            default: ""
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State',
            trim: true,
            default: ""
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            trim: true,
            default: ""
        },
        pin_code: {
            type: String,
            trim: true,
            default: ""
        },
        idenifications: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Identification',
                default: null
            }
        ],
        certificates: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Certificate',
                default: []
            }
        ],
        passwordResetToken: String,
        passwordResetExpires: Date,
        lastActive: {
            type: String,
            default: Date.now
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

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Hash the password if it's new or modified
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash password
    }
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (incomingPassword) {
    return await bcrypt.compare(incomingPassword, this.password);
};


// Get Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex'); // Generate a random token
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex'); // Hash the token
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Set the expiration time to 10 minutes
    return resetToken;
}

// Update Last active time
userSchema.methods.updateLastActiveTime = function () {
    this.lastActive = Date.now();
    return this.lastActive({ validateBeforeSave: false }); //  { validateBeforeSave: false } -> This will not validate the document before saving it to the database 
}

const User = model('User', userSchema);
export default User;
