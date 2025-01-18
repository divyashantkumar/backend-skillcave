import { asyncHandler } from "../utils/asyncHandler.js";
import {
    addQuestionService,
    deleteQuestionService,
    getAllQuestionsService,
    getQuestionService
} from "../services/question.services.js";
import CustomError from "../errors/custom.error.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const getAllQuestions = asyncHandler(async (req, res) => {
    const {
        limit = 10,
        pageNumber = 1
    } = req.query;

    const filters = {

    };

    if (req.query.search) {
        filters.$text = { $search: req.query.search };
    }

    const questions = await getAllQuestionsService(filters, limit, pageNumber);

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Questions fetched successfully", questions)
        )
});

export const addQuestion = asyncHandler(async (req, res, next) => {
    const { question, category, options, duration, answer } = req.body;

    if (!question || !category || !options || !duration) {
        throw new CustomError(400, "Bad Request! Please provide all required fields")
    }

    if (options.length < 2) {
        throw new CustomError(400, "Bad Request! Please provide at least 2 options for the question")
    }

    const newQuestion = await addQuestionService({
        user_id: req?.user?._id,
        question,
        category,
        options,
        duration,
        answer,
    });

    if (!newQuestion) {
        throw new CustomError(
            500,
            "Internal Server Error! Unable to add question"
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Question added successfully", newQuestion)
        );
});

export const deleteQuestion = asyncHandler(async (req, res) => {
    const { question_id } = req.params;

    
    // Check if question exists
    if (!question_id) {
        throw new CustomError(400, "Bad Request! Please provide question id")
    }

    const question = await getQuestionService(question_id);

    if (!question) {
        throw new CustomError(404, "Question not found")
    }
    
    // Only admin and creator of the question can delete question
    if(question?.user_id !== req?.user?._id || !req?.user?.role === "admin") {
        throw new CustomError(403, "You are not authorized to delete this question")
    }

    const deletedQuestion = await deleteQuestionService(question_id);

    if (!deletedQuestion) {
        throw new CustomError(
            500,
            "Internal Server Error! Unable to delete question"
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Question deleted successfully")
        )
});



