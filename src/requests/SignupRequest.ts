import { z } from "zod";
import mainConfig from '../configs/main';
import userExist from "./rules/userExist";

const SignupRequest = z.object({
    email: z
        .email()
        .refine( userExist.rule, { message: userExist.message }),
    password: z
        .string()
        .min(mainConfig.password.minLength)
        .regex(mainConfig.password.regex, mainConfig.password.regexMessage),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
});

export default SignupRequest;