import { ExceptionTreatment } from "../../utils";
import { APIResponse, TransactionAccount } from "../../models";
import { TransactionTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateExtractService 
{
    public async execute (account: TransactionAccount) : Promise<APIResponse>
    {
        try 
        {
            const acc = await SelectAccountService.execute(account);

            if(acc.messages.length != 0) {
                return {
                    data: {},
                    messages: [ "account do not exist" ]
                } as APIResponse;
            }

            console.log("Transação de", acc.data.id);
            
            const resp = await TransactionTable.select({account:acc.data.id});
            console.log(resp);

            return {
                data: {
                    balance:acc.data.balance,
                    transctions:resp
                },
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while getting extract on database"
            );
        }
    }
}

export default new CreateExtractService();