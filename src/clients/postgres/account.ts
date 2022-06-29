import Postgres from "./database";
import { Account } from "../../models";

class AccountsTable 
{
    private insertQuery = `
    INSERT INTO accounts (id, owner, agency, agency_identifier, account, account_identifier, balance, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, now ()) RETURNING id`;

    private updateQuery = `UPDATE accounts SET`;

    private selectQuery = `SELECT * FROM accounts WHERE`;

    public async insert (account: Account): Promise<boolean>
    {
        try 
        {
            const result = await Postgres.pool.query(this.insertQuery, [ 
                account.id,
                account.owner,
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
            //console.log("Acc", e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async update (id: string, filter: Partial<Account>): Promise<Account[]>
    {
        try 
        {
            const values: any[] = [];
            const keys = Object.keys(filter).reduce((q, key, i) => 
            {
                values.push((filter as any)[key]);
                return q + `${q != ''? ', ' : ''}"${key}" = $${i+1}`;
            }, '');

            const select_query = `${this.updateQuery} updated_at=now(), ${keys} WHERE id = '${id}' RETURNING id`;

            //console.log(select_query);
            
            const result = await Postgres.pool.query(select_query, values);

            if(result.rows && result.rows.length !== 0) return result.rows;

            return [];
        }
        catch(e)
        {
            //console.log("Test", e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async select (filter: Partial<Account>): Promise<Account[]>
    {
        try 
        {
            const select_query = `${this.selectQuery} ${Object.keys(filter).reduce((q, key) => 
            {
                return q + `${q != ''? ' AND ' : ''}${key} = '${(filter as any)[key]}'`;
            }, '')}`;

            //console.log(select_query);
            
            const result = await Postgres.pool.query(select_query);

            if(result.rows && result.rows.length !== 0) return result.rows;

            return [];
        }
        catch(e)
        {
            //console.log(e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async nextAccount () : Promise<string>
    {
        try 
        {
            const result = await Postgres.pool.query("SELECT nextval('ac_serial');");

            if(result.rows && result.rows.length === 0) return "0";
            const acc = result.rows[0].nextval;
            if(acc === 999999999)
            {
                await Postgres.pool.query("SELECT set('ac_serial, 200');");
                await Postgres.pool.query("SELECT nextval('ag_serial');");
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
            const result = await Postgres.pool.query("SELECT last_value FROM ag_serial");//await Postgres.pool.query(`SELECT ${hasCreated.is_called?'currval':'nextval'}('ag_serial');`);

            if(!result.rows || result.rows.length === 0) return "0";
            const ag = result.rows[0].last_value;
            //console.log(ag)
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