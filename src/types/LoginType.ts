import { z } from 'zod';
import LoginRequest from '../requests/LoginRequest';

type LoginType = z.infer<typeof LoginRequest>;

export default LoginType;
