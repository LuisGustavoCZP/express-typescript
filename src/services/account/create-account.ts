import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { Account, APIResponse, User } from "../../models";
import { CreateUserService } from "../user";
import { AccountsTable } from "../../clients/postgres";

class CreateAccountService 
{
    public async execute (user: User) : Promise<APIResponse>
    {
        try 
        {
            const resp = await CreateUserService.execute(user);
            console.log(resp)

            const ac = await AccountsTable.nextAccount();
            const ag = await AccountsTable.nextAgency();
            
            const account = {
                id: v4(),
                owner: resp.data.id,
                agency: ac.slice(0, -1),
                agency_identifier: ac.slice(-1),
                account: ag.slice(0, -1),
                account_identifier: ag.slice(-1),
                balance: 0
            };

            //account.agency = `${"0".repeat(6-account.agency.length)}${account.agency}`;
            //account.account = `${"0".repeat(8-account.account.length)}${account.account}`;
    
            //console.log("AC", ag, ac, account);
            const insertedAcc = await AccountsTable.insert(account as Account);

            if (insertedAcc)
            {
                return {
                    data: account,
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
            console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while inserting account on database"
            );
        }
    }
}

export default new CreateAccountService();