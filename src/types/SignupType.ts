import { z } from 'zod';
import SignupRequest from '../requests/SignupRequest';

type SignupType = z.infer<typeof SignupRequest>;

export default SignupType;
