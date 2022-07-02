import { ExceptionTreatment } from "../../utils";
import { Account, APIResponse, TransactionAccount } from "../../models";
import { AccountsTable, UsersTable } from "../../clients/postgres";
import AccountDataValidator from "../../validators/account-data";

class SelectAccountService 
{
    private dataValidator = AccountDataValidator;

    public async execute (account : TransactionAccount) : Promise<APIResponse>
    {
        try 
        {
            //console.log("Passou por aqui!");
            const validAccountData = new this.dataValidator(account);

            if(validAccountData.errors)
            {
                throw new Error(`400: ${validAccountData.errors}`)
            }

            const validAccount = {
                agency:validAccountData.data.agency,
                agency_identifier:validAccountData.data.agency_identifier,
                account:validAccountData.data.account,
                account_identifier:validAccountData.data.account_identifier
            }

            const selectedAcc = await AccountsTable.select(validAccount);
            
            if (selectedAcc)
            {
                
                if(selectedAcc.length > 0)
                {
                    for(const acc of selectedAcc)
                    {
                        const selectedUser = await UsersTable.select({id:acc.owner});

                        if(selectedUser[0].cpf == validAccountData.data.cpf)
                        {
                            return {
                                data: acc,
                                messages: []
                            } as APIResponse;
                        }
                    }
                }

                throw new Error(`401: this CPF is not allowed`);
            }

            return {
                data: {},
                messages: [ "an error occurred while selecting account" ]
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("Acc selection error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while selecting account of database"
            );
        }
    }
}

export default new SelectAccountService();