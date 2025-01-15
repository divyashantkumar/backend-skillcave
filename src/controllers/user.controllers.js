import { ApiResponse } from '../utils/ApiResponse.js';
import CustomError from '../errors/custom.error.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateTokens, cookieOptions } from '../utils/token.js';
import Qualification from '../models/qualification.model.js';
import { uploadFileToCloud } from '../utils/fileUploadtoCloud.js';


export const registerUser = asyncHandler(async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        qualification,
        bio,
        role = "user"
    } = req.body;

    // TODO: Validate the request body parameters GLobally

    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    if (user?.email) {
        return res
            .status(400)
            .json(
                new ApiResponse(400, "Email already in use")
            );
    }

    if (user?.phone) {
        return res
            .status(400)
            .json(
                new ApiResponse(400, "Phone number already exists")
            );
    }

    // upload resume FIle to cloud
    let avatarUrl = "";
    if (req.files?.avatar) {
        avatarUrl = await uploadFileToCloud(req.files.avatar[0]);
    }

    let resumeUrl = "";
    if (req.files?.resume) {
        resumeUrl = await uploadFileToCloud(req.files.resume[0]);
    }

    const newUser = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        phone,
        role,
        bio,
        avatar: avatarUrl,
        resume: resumeUrl
    });

    if (!newUser) {
        return res
            .status(400)
            .json(
                new ApiResponse(400, "User Registration Failed")
            );
    }

    const qualificationDoc = await Qualification.create({
        user_id: newUser._id,
        type: qualification.toLowerCase(),
    })

    newUser.qualifications.push(qualificationDoc._id);
    await newUser.save();
    await newUser.updateLastActiveTime();


    const { accessToken, refreshToken } = generateTokens(user);

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...cookieOptions })
        .cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(200, "User created successfully", {
                newUser,
                accessToken,
                refreshToken,
            })
        );
});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password').exec();

    if (!user) {
        throw new CustomError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new CustomError(400, "Invalid password");
    }

    await user.updateLastActiveTime();

    const { accessToken, refreshToken } = generateTokens(user);

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...cookieOptions })
        .cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(200, "User logged in successfully", {
                user,
                accessToken,
                refreshToken,
            })
        )
});




