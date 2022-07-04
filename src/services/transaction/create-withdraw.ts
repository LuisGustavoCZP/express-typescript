import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, Fee, TransactionAccount, TransactionType } from "../../models";
import { AccountsTable, TransactionTable } from "../../clients/postgres";
import { PassAccountService, SelectAccountService } from "../account";

class CreateWithdrawService 
{
    private tax = 4;

    public async execute (origin: TransactionAccount, password: string, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            const originAcc = await SelectAccountService.execute(origin);

            await PassAccountService.execute(originAcc.data, password);

            const q = Number(quanty);
            if(q <= 0) throw new Error(`400: Value need to be greather than 0`);
            
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
                data: {
                    id:withdrawTransaction.id,
                    value:withdrawTransaction.value,
                    type:withdrawTransaction.type,
                    agency:origin.agency,
                    agency_identifier:origin.agency_identifier,
                    account:origin.account,
                    account_identifier:origin.account_identifier,
                    document:origin.cpf,
                    date:new Date().toISOString()
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
                "an error occurred while withdrawing from account on database"
            );
        }
    }
}

export default new CreateWithdrawService();