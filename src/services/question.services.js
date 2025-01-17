
import Question from "../models/question.model.js";


export const buildQueryFilter = (req) => {
    const filterOptions = ["category", "score", "duration", "question", "options", "has_coding_snippet", "correct_answer"];
    const filter = {};

    return filter;
}

export const getAllQuestionsService = async (filter, limit, pageNumber) => {
    const itemsToSkip = (pageNumber - 1) * limit;
    const qualification = await Question.find(filter).skip(itemsToSkip).limit(limit);

    return qualification ? qualification : null;
};