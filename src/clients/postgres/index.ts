import { Pool } from "pg";
import config from "../../config";

class PostgresDB
{
    private _pool: Pool;

    public constructor ()
    {
        this._pool = new Pool({
            connectionString: config.POSTGRES
        });
    }

    public get pool ()
    {
        return this._pool;
    }
}

export default new PostgresDB();