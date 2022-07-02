import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Fee, Transaction, TransactionAccount } from "../../models";
import { AccountsTable, TransactionTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateDepositService 
{
    private tax = .01;

    public async execute (destination: TransactionAccount, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            console.log(destination);
            const destinationAcc = await SelectAccountService.execute(destination);

            const q = Number(quanty);
            const totalTax = q * (this.tax);

            const newDestAcc = await AccountsTable.update(destinationAcc.data.id, {balance:destinationAcc.data.balance+(q - totalTax)});

            const depositTransaction : Transaction = {
                id:v4(),
                account:destinationAcc.data.id,
                type:"deposit",
                value:q
            };
            const taxTransaction : Fee = {
                id:v4(),
                origin:depositTransaction.id,
                account:destinationAcc.data.id,
                type:"fee",
                value:-totalTax
            };

            await TransactionTable.insert(depositTransaction);
            await TransactionTable.insert(taxTransaction);

            return {
                data: [depositTransaction, taxTransaction],
                messages: []
            } as APIResponse;
        }
        catch (error)
        {
            //console.log("User error", error);
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while depositing to account on database"
            );
        }
    }
}

export default new CreateDepositService();