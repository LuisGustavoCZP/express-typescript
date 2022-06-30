import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Transaction, TransactionAccount } from "../../models";
import { AccountsTable, TransactionTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateTransferenceService 
{
    private tax = 1.00;

    public async execute (origin: TransactionAccount, destination: TransactionAccount, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            const originAcc = await SelectAccountService.execute(origin);

            if(originAcc.messages.length != 0) 
            {
                throw new Error(`400: origin account do not exist`);
            }

            const destinationAcc = await SelectAccountService.execute(destination);
            if(destinationAcc.messages.length != 0) 
            {
                throw new Error(`400: destination account do not exist`);
            }

            const total = quanty + this.tax;
            if(originAcc.data.balance < total)
            {
                throw new Error(`400: origin account has insuficient founds`);
            }

            console.log("Transação de", originAcc.data.id, destinationAcc.data.id, originAcc.data.balance);

            const newOriginAcc = await AccountsTable.update(originAcc.data.id, {balance:originAcc.data.balance-total});
            await AccountsTable.update(destinationAcc.data.id, {balance:destinationAcc.data.balance+quanty});

            const taxTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type:"tax",
                value:-this.tax
            };
            await TransactionTable.insert(taxTransaction);

            const originTransaction : Transaction = {
                id:v4(),
                account:originAcc.data.id,
                type:"transference",
                value:-quanty
            };
            await TransactionTable.insert(originTransaction);

            const destTransaction : Transaction = {
                id:v4(),
                account:destinationAcc.data.id,
                type:"transference",
                value:quanty
            };
            await TransactionTable.insert(destTransaction);

            return {
                data: [taxTransaction, originTransaction, destTransaction],
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while transfering from account to another on database"
            );
        }
    }
}

export default new CreateTransferenceService();