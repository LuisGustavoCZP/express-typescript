import Postgres from "./database";
import { Account } from "../../models";

class AccountsTable 
{
    protected table = "accounts";

    public async insert (account: Account): Promise<Account[]>
    {
        return await Postgres.insert<Account>(this.table, account);
    }

    public async update (id: string, atributes: Partial<Account>): Promise<Account[]>
    {
        return Postgres.update<Account>(this.table, atributes, {id:id});
    }

    public async select (filter: Partial<Account>): Promise<Account[]>
    {
        return Postgres.select<Account>(this.table, filter);
    }

    public async nextAccount () : Promise<string>
    {
        try 
        {
            const acc = await Postgres.sequenceGet('ac_serial');
            
            if(acc == '999999999')
            {
                await Postgres.sequenceSet('ac_serial', 200);
                await Postgres.sequenceNext('ag_serial');
            } 
            else 
            {
                Postgres.sequenceNext('ac_serial');
            }
            //console.log("AccNum", acc)
            return `${acc}`;
        }
        catch(e)
        {
            console.log("SAc", e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async nextAgency () : Promise<string>
    {
        try 
        {
            const ag = await Postgres.sequenceGet('ag_serial');
            return `${ag}`;
        }
        catch(e)
        {
            console.log("SAg", e);
            throw new Error("503: service temporarily unavailable");
        }
    }
}

export default new AccountsTable();