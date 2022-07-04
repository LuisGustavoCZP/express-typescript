import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, TransactionAccount } from "../../models";
import { TransactionTable } from "../../clients/postgres";
import { PassAccountService, SelectAccountService } from "../account";

class CreateExtractService 
{
    public async execute (account: TransactionAccount, password: string) : Promise<APIResponse>
    {
        try 
        {
            const acc = await SelectAccountService.execute(account);

            /* if(acc.messages.length != 0) {
                throw new Error(`404: account do not exist`);
            } */

            await PassAccountService.execute(acc.data, password);
            //console.log("Extrato de", acc.data.id);
            
            const resp = await TransactionTable.select({account:acc.data.id}) as Partial<Transaction>[];
            
            resp.forEach(element => {
                delete element["account"];
            });
            //console.log(resp);

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
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while listing extract on database"
            );
        }
    }
}

export default new CreateExtractService();