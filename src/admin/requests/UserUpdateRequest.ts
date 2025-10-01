import { z } from "zod";
import mainConfig from '../../configs/main';
import userRoles from '../../configs/user_roles';
import userExist from "../../requests/rules/userExist";
import userStatuses from '../../configs/user_statuses';

const UserUpdateRequest = z.object({
    status: z.enum([userStatuses.ACTIVE, userStatuses.NOT_ACTIVE, userStatuses.BLOCKED]),
    role: z.enum([userRoles.MANAGER, userRoles.USER]),
    password: z
        .string()
        .min(mainConfig.password.minLength)
        .regex(mainConfig.password.regex, mainConfig.password.regexMessage)
        .optional()
        .nullable(),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
});

export default UserUpdateRequest;