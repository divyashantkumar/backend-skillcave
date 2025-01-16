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

export function generatePassword(length = 12) {
    // Define the character sets
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '@$!%*?&';

    // Ensure the password has at least one character from each category
    const password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
    ];

    // Combine all the characters into one string
    const allCharacters = lowercase + uppercase + numbers + specialCharacters;

    // Fill the remaining characters to reach the desired length
    for (let i = password.length; i < length; i++) {
        password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    // Shuffle the password array to ensure random distribution
    return password.sort(() => Math.random() - 0.5).join('');
}

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
        phone_verified: {
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
            maxlength: [254, 'Email must not exceed 100 characters'], // 64characters@total254.chars
            trim: true,
        },
        email_verified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: Number,
            default: null,
            validate: {
                validator: function (value) {
                    return value === null || (value >= 1000 && value <= 9999);
                }
            }
        },
        password: {
            type: String,
            trim: true,
            match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'],
            default: () => generatePassword(),
            minlength: [8, 'Password must be at least 8 characters long'],
            maxlength: [100, 'Password must not exceed 100 characters'],
            select: false,
            // required: [true, 'Password is required'],
        },
        avatar: {
            type: String,
            trim: true,
            default: ""
        },
        resume: {
            type: String,
            trim: true,
            default: "",
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
            default: null
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
            default: null
        },
        bio: {
            type: String,
            trim: true,
            default: null
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
            default: null
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: 'State',
            trim: true,
            default: null
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            trim: true,
            default: null
        },
        pin_code: {
            type: String,
            trim: true,
            default: null
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

// Pre-delete hook
userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        // Ensure `this._id` is available and points to the correct document
        const userId = this._id;

        // Ensure models are registered correctly in your Mongoose schema
        await this.model('Qualification').deleteMany({ user_id: userId });
        await this.model('Identification').deleteMany({ user_id: userId });
        await this.model('Certificate').deleteMany({ user_id: userId });

        // Log successful deletion of related documents
        console.log(`User with ID ${userId} deleted! Related qualifications, identifications, and certificates removed.`);
    } catch (error) {
        // Log any errors encountered during the deletion of related documents
        console.error("Error deleting related documents:", error);
    }
    // Ensure next() is called to proceed with the deleteOne operation
    next();
})

// Post-delete hook
userSchema.post("deleteOne", { document: true, query: false }, async function () {
    console.log(this);
    console.log("User deleted! send email to user");
})


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
    return this.save({ validateBeforeSave: false }); //  { validateBeforeSave: false } -> This will not validate the document before saving it to the database 
}

const User = model('User', userSchema);
export default User;
