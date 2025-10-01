import { z } from 'zod';
import UserUpdateRequest from '../requests/UserUpdateRequest';

type UserUpdateType = z.infer<typeof UserUpdateRequest>;

export default UserUpdateType;
