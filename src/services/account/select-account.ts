import { ExceptionTreatment } from "../../utils";
import { Account, APIResponse, TransactionAccount } from "../../models";
import { AccountsTable, UsersTable } from "../../clients/postgres";

class SelectAccountService 
{
    public async execute (account : TransactionAccount) : Promise<APIResponse>
    {
        try 
        {
            //console.log("Passou por aqui!");
            const selectedAcc = await AccountsTable.select({agency:account.agency, agency_identifier:account.agency_identifier, account:account.account, account_identifier:account.account_identifier});
            
            if (selectedAcc)
            {
                
                if(selectedAcc.length > 0)
                {
                    for(const acc of selectedAcc)
                    {
                        const selectedUser = await UsersTable.select({id:acc.owner});

                        if(selectedUser[0].cpf == account.cpf)
                        {
                            return {
                                data: acc,
                                messages: []
                            } as APIResponse;
                        }
                    }
                }

                return {
                    data: {},
                    messages: [ "the account is not founded" ]
                } as APIResponse;
            }

            return {
                data: {},
                messages: [ "an error occurred while selecting account" ]
            } as APIResponse;
        }
        catch (error)
        {
            console.log("Acc selection error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while selecting account of database"
            );
        }
    }
}

export default new SelectAccountService();