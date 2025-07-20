import User from "../../models/User";

export default {
    rule: async (email: string) => {
        const user = await User.findOne({email});

        return !user;
    },
    message: 'User is exist'
}