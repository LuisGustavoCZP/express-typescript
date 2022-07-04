import { v4 } from "uuid";
import { APIResponse, User } from "../../models";
import { ExceptionTreatment } from "../../utils";
import UserDataValidator from "../../validators/user-data";
import UsersTable from "../../clients/postgres/user";

class CreateUserService 
{
    private dataValidator = UserDataValidator;

    public async execute (user: User): Promise<APIResponse<User>>
    {
        try 
        {
            const validUserData = new this.dataValidator(user);

            if(validUserData.errors)
            {
                throw new Error(`400: ${validUserData.errors}`)
            }
            
            const selectedUser = await UsersTable.select({cpf:validUserData.data.cpf});
            if(selectedUser && selectedUser.length > 0)
            {
                //console.log("Achou ", selectedUser);
                return {
                    data: selectedUser[0],
                    messages: []
                } as APIResponse;
            }

            validUserData.data.id = v4();
            const insertedUser = await UsersTable.insert(validUserData.data as User);

            if (insertedUser)
            {
                return {
                    data: validUserData.data,
                    messages: []
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while creating user" ]
            } as APIResponse;
        }
        catch (error)
        {
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting user on database"
            );
        }
    }
}

export default new CreateUserService();