import Qualification from "../models/qualification.model.js";


export const createQualificationService = async (data) => {
    const qualification = await Qualification.create(data);

    return qualification ? qualification : null;
};

