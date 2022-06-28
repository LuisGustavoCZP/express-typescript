import { Pool } from "pg";
import config from "../../config";
import AccountsTable from "./account";
import UsersTable from "./user";

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

export {AccountsTable, UsersTable};
export default new PostgresDB();