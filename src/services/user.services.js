import User from "../models/user.model.js";


export const findUserService = async (filter, selectOptions=null) => {
    let user;
    if(selectOptions) {
        user = await User.findOne(filter).select(selectOptions).exec();
    } else {
        user = await User.findOne(filter).exec();
    }
    return user ? user : null;
};

export const getUserProfileService = async (filter) => {
    const user = await User.findOne(filter)
        .populate({
            path: "qualifications",
            select: "type completion_status percentage start_date end_date",
            populate: {
                path: "institute",
                select: "name type"
            }
        })
        .populate({
            path: "certificates",
            select: "name category issued_date expiry_date certificate_url"
        })
        .exec();

    return user ? user : null;
};

export const createUserService = async (data) => {
    const user = await User.create(data);

    return user ? user : null;
};



