import { v4 } from "uuid";
import { APIResponse, User } from "../models";
import { UserDataValidator } from "../validators/user-data";

class CreateUserService 
{
    private userDataValidator = UserDataValidator;

    public execute (user: User)
    {
        const validUserData = new this.userDataValidator(user);

        if(validUserData.errors)
        {
            throw new Error(`400: ${this.errors}`)
        }

        validUserData.user.id = v4();

        return {
            data: validUserData.user,
            messages: [],
        } as APIResponse
    }
}

export { CreateUserService }