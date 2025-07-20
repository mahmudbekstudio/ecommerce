import { z } from "zod";
import mainConfig from '../configs/main';
//import userExist from "./rules/userExist";

const LoginRequest = z.object({
    email: z
        .email()
        /*.refine( userExist.rule, { message: userExist.message })*/,
    password: z
        .string()
        .min(mainConfig.password.minLength)
        .regex(mainConfig.password.regex, mainConfig.password.regexMessage)
});

export default LoginRequest;