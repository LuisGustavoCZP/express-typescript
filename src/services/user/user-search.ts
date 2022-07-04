import { APIResponse, User } from "../../models";
import { ExceptionTreatment } from "../../utils";
import { UsersTable } from "../../clients/postgres";
import CPFValidator from "../../validators/strings/cpf";

class UserSearchService 
{
    private dataValidator = CPFValidator;

    public async execute (user: User): Promise<APIResponse<User>>
    {
        try 
        {
            const validUserData = new this.dataValidator(user.cpf);

            if(validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`)
            }

            const selectedUser = await UsersTable.select({cpf: validUserData.data});

            if (selectedUser)
            {
                return {
                    data: validUserData.data,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while selected user" ]
            } as APIResponse;
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while selecting user on database"
            );
        }
    }
}

export default new UserSearchService();