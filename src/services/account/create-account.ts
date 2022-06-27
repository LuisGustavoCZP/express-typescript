import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, User } from "../../models";
import AccountDataValidator from "../../validators/account-data";

class CreateAccountService 
{
    private dataValidator = AccountDataValidator;

    public async execute (user: User) : Promise<APIResponse>
    {
        try 
        {
            const validUserData = new this.dataValidator(user);

            if(validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`)
            }
    
            validUserData.data.id = v4();
    
            return {
                data: validUserData.data,
                messages: [],
            } as APIResponse;
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting account on database"
            );
        }
    }
}

export default new CreateAccountService();