import User from "../../models/user.js";

export const signupUser = async (request, response, next) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email }).lean();

    if (user) {
        
    }
};
