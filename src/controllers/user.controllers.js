import { ApiResponse } from '../utils/ApiResponse.js';
import CustomError from '../errors/custom.error.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateTokens, cookieOptions } from '../utils/token.js';


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role = "student" } = req.body;

    // TODO: Validate the request body parameters GLobally

    const userExists = await User.findOne({ email: email.toLowerCase() }).exec();

    if (userExists) {
        throw new CustomError(400, "User already exists with this email");
    }

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password,
        role,
    });

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
            new ApiResponse(200, "User created successfully", {
                user,
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

