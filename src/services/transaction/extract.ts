import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, TransactionAccount } from "../../models";
import { TransactionTable, UsersTable } from "../../clients/postgres";
import { PassAccountService, SelectAccountService } from "../account";

class CreateExtractService 
{
    public async execute (account: TransactionAccount, password: string) : Promise<APIResponse>
    {
        try 
        {
            const acc = await SelectAccountService.execute(account);
            const owner = await UsersTable.select({id:acc.data.owner});
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
            const resAcc = acc.data as any;
            delete resAcc["owner"];
            delete resAcc["password"];
            //delete resAcc["created_at"];
            delete resAcc["updated_at"];
            return {
                data: {
                    user:owner,
                    account:resAcc,
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