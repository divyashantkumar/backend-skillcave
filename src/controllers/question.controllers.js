import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllQuestionsService } from "../services/question.services";


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
})
