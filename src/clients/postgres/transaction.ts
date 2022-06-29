import Postgres from "./database";
import { Transaction } from "../../models";

class TransactionsTable 
{
    private insertQuery = `INSERT INTO transactions (id, account, type, value, created_at) VALUES ($1, $2, $3, $4, now ()) RETURNING id`;
    
    private selectQuery = `SELECT * FROM transactions`;

    public async insert (transaction: Transaction): Promise<boolean>
    {
        try 
        {
            //console.log("Inserindo", user)
            const result = await Postgres.pool.query(this.insertQuery, [ 
                transaction.id,
                transaction.account,
                transaction.type,
                transaction.value,
            ]);

            if(result.rows.length !== 0) return true;

            return false;
        }
        catch(e)
        {
            console.log("Deu erro", e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async select (filter: Partial<Transaction>): Promise<Transaction[]>
    {
        try 
        {
            const select_query = `${this.selectQuery} WHERE ${Object.keys(filter).reduce((q, key) => 
            {
                return q + `${q != ''? ' AND ' : ''}${key} = '${(filter as any)[key]}'`;
            }, '')} ORDER BY created_at DESC`;
            
            const result = await Postgres.pool.query(select_query);

            if(result.rows && result.rows.length !== 0) return result.rows;

            return [];
        }
        catch(e)
        {
            console.log(e);
            throw new Error("503: service temporarily unavailable");
        }
    }

    public async list (): Promise<Transaction[]>
    {
        try 
        {
            const select_query = `${this.selectQuery} ORDER BY created_at DESC`;
            
            const result = await Postgres.pool.query(select_query);

            if(result.rows && result.rows.length !== 0) return result.rows;

            return [];
        }
        catch(e)
        {
            console.log(e);
            throw new Error("503: service temporarily unavailable");
        }
    }
}

export default new TransactionsTable();