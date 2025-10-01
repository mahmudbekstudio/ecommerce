import { z } from 'zod';
import UserCreateRequest from '../requests/UserCreateRequest';

type UserCreateType = z.infer<typeof UserCreateRequest>;

export default UserCreateType;
