import { InferSchemaType } from 'mongoose';
import User from '../models/User';

type UserType = InferSchemaType<typeof User.schema>

export default UserType;