import Postgres from ".";
import { Account } from "../../models";

class AccountsTable 
{
    private insertUserQuery = `
    INSERT INTO accounts (id, agency, agency_identifier, account, account_identifier, balance) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

    public async insert (account: Account): Promise<boolean>
    {
        try 
        {
            const result = await Postgres.pool.query(this.insertUserQuery, [ 
                account.id,
                account.agency,
                account.agency_identifier,
                account.account,
                account.account_identifier,
                account.balance,
            ]);

            if(result.rows.length !== 0) return true;

            return false;
        }
        catch(e)
        {
            throw new Error("503: service temporarily unavailable");
        }
    } 
}

export default new AccountsTable();