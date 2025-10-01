import ApiController from '../../../../controllers/ApiController';
import { Request, Response } from 'express';
import UserUpdateRequest from "../../../requests/UserUpdateRequest";
import UserUpdateType from "../../../types/UserUpdateType";
import bcrypt from "bcrypt";
import User from "../../../../models/User";

class UserUpdateController extends ApiController
{
    public request = UserUpdateRequest;

    async handle(req: Request, res: Response, data: UserUpdateType) {
        try {
            const user = await User.findById(req.params.id);

            user.status = data.status;
            user.role = data.role;
            user.data = {first_name: data.first_name, last_name: data.last_name};

            if (data.password) {
                user.password = await bcrypt.hash(data.password, 10);
            }

            await user.save();

            return {result: true};
        } catch (e) {
            throw Error('Something went wrong');
        }
    }
}

export default UserUpdateController;