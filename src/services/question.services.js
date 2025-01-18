
import Question from "../models/question.model.js";


// export const buildQueryFilter = (req) => {
//     const filterOptions = ["category", "score", "duration"];
//     const filter = {};

//     return filter;
// }

export const getQuestionService = async (id) => {
    const question = await Question.findById(id);

    return question ? question : null;
}

export const getAllQuestionsService = async (filter, limit, pageNumber) => {
    const itemsToSkip = (pageNumber - 1) * limit;
    const qualification = await Question.find(filter).skip(itemsToSkip).limit(limit);

    return qualification ? qualification : null;
};

export const addQuestionService = async (data) => {
    const question = await Question.create(data);

    return question ? question : null;
}

export const deleteQuestionService = async (id) => {
    const question = await Question.findByIdAndDelete(id);

    return question ? question : null;
}
