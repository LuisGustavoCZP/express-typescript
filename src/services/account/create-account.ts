import { v4 } from "uuid";
import { ExceptionTreatment, BCrypt } from "../../utils";
import { Account, APIResponse, User } from "../../models";
import { CreateUserService } from "../user";
import { AccountsTable } from "../../clients/postgres";
import PasswordValidator from "../../validators/strings/password";

class CreateAccountService 
{
    public async execute (user: User, password: string) : Promise<APIResponse<Account>>
    {
        try 
        {
            const resp = await CreateUserService.execute(user);

            const validPassword = new PasswordValidator(password);
            if(validPassword.errors)
            {
                throw new Error(`400: ${validPassword.errors}`)
            }
            const pw = await BCrypt.encrypt(validPassword.data);

            const ac = await AccountsTable.nextAccount();
            const ag = await AccountsTable.nextAgency();
            
            const account = {
                id: v4(),
                owner: resp.data.id,
                agency: ag.slice(0, -1),
                agency_identifier: ag.slice(-1),
                account: ac.slice(0, -1),
                account_identifier: ac.slice(-1),
                password: pw,
                balance: 0
            } as Account;

            const insertedAcc = await AccountsTable.insert(account);

            if (insertedAcc)
            {
                return {
                    data: {
                        agency:account.agency,
                        agency_identifier:account.agency_identifier,
                        account:account.account,
                        account_identifier:account.account_identifier
                    },
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
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting account on database"
            );
        }
    }
}

export default new CreateAccountService();