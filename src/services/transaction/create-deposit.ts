import { v4 } from "uuid";
import { ExceptionTreatment } from "../../utils";
import { APIResponse, Fee, Transaction, TransactionAccount, TransactionType } from "../../models";
import { AccountsTable, TransactionTable } from "../../clients/postgres";
import { SelectAccountService } from "../account";

class CreateDepositService 
{
    private tax = .01;

    public async execute (destination: TransactionAccount, quanty: number) : Promise<APIResponse>
    {
        try 
        {
            //console.log(destination);
            const destinationAcc = await SelectAccountService.execute(destination);

            const q = Number(quanty);
            if(q <= 0) throw new Error(`400: Value need to be greather than 0`);

            const totalTax = q * (this.tax);

            const newDestAcc = await AccountsTable.update(destinationAcc.data.id, {balance:destinationAcc.data.balance+(q - totalTax)});

            const depositTransaction : Transaction = {
                id:v4(),
                account:destinationAcc.data.id,
                type:TransactionType.Deposit,
                value:q
            };
            const taxTransaction : Fee = {
                id:v4(),
                origin:depositTransaction.id,
                account:destinationAcc.data.id,
                type:TransactionType.Fee,
                value:-totalTax
            };

            await TransactionTable.insert(depositTransaction);
            await TransactionTable.insert(taxTransaction);
            //console.log(dep);

            return {
                data: {
                    id:depositTransaction.id,
                    value:depositTransaction.value,
                    type:depositTransaction.type,
                    agency:destination.agency,
                    agency_identifier:destination.agency_identifier,
                    account:destination.account,
                    account_identifier:destination.account_identifier,
                    document:destination.cpf,
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
                "an error occurred while depositing to account on database"
            );
        }
    }
}

export default new CreateDepositService();