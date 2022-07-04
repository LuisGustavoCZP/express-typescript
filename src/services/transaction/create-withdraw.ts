import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, Fee, TransactionAccount, TransactionType } from "../../models";
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

            const q = Number(quanty);
            const total = q + (this.tax);
            if(originAcc.data.balance < total)
            {
                throw new Error(`412: account has insuficient founds`);
            }

            const newDestAcc = await AccountsTable.update(originAcc.data.id, {balance:originAcc.data.balance-(total)});

            const withdrawTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type: TransactionType.Withdraw,
                value:-q
            };
            const taxTransaction : Fee = {
                id:v4(),
                origin:withdrawTransaction.id,
                account:originAcc.data.id,
                type: TransactionType.Fee,
                value:-this.tax
            };
            
            await TransactionTable.insert(withdrawTransaction);
            await TransactionTable.insert(taxTransaction);

            return {
                data: [taxTransaction, withdrawTransaction],
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