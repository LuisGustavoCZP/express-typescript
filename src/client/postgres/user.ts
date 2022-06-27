import Postgres from ".";
import { User } from "../../models";

class UsersTable 
{
    private insertUserQuery = `
    INSERT INTO users (id, name, email, birthdate, cpf, created_at) 
    VALUES ($1, $2, $3, $4, $5, now ()) RETURNING id`;

    public async insert (user: User): Promise<boolean>
    {
        try 
        {
            //console.log("Inserindo", user)
            const result = await Postgres.pool.query(this.insertUserQuery, [ 
                user.id,
                user.name,
                user.email,
                user.birthdate,
                user.cpf,
            ]);

            if(result.rows.length !== 0) return true;

            return false;
        }
        catch(e)
        {
            //console.log("Deu erro", e);
            throw new Error("503: service temporarily unavailable");
        }
    } 
}

export default new UsersTable();