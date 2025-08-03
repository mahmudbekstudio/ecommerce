import { z } from "zod";
import mainConfig from '../../configs/main';

const LoginRequest = z.object({
    email: z
        .string('Email required')
        .email('Invalid email address'),
    password: z
        .string('Password required')
        //.min(mainConfig.password.minLength)
        //.regex(mainConfig.password.regex, mainConfig.password.regexMessage)
});

export default LoginRequest;