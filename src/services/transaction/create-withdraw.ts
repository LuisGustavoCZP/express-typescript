import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, TransactionAccount } from "../../models";
import { AccountsTable, TransactionTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateWithdrawService 
{
    private tax = 4;

    public async execute (origin: TransactionAccount, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            const originAcc = await SelectAccountService.execute(origin);
            if(originAcc.messages.length != 0) {
                throw new Error(`400: origin account do not exist`);
            }

            const total = quanty + (this.tax);
            if(originAcc.data.balance < total)
            {
                throw new Error(`400: origin account has insuficient founds`);
            }

            const newDestAcc = await AccountsTable.update(originAcc.data.id, {balance:originAcc.data.balance-(total)});

            const taxTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type:"tax",
                value:-this.tax
            };
            await TransactionTable.insert(taxTransaction);

            const depositTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type:"withdraw",
                value:-quanty
            };
            await TransactionTable.insert(depositTransaction);

            return {
                data: [taxTransaction, depositTransaction],
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while withdrawing from account on database"
            );
        }
    }
}

export default new CreateWithdrawService();