const User = require("../models/User");

export const findUser = async (id) => {
    return await User.findOne({ _id: id });
}