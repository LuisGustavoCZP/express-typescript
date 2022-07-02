import Postgres from "./database";
import { User } from "../../models";

class UsersTable 
{
    protected table = "users";

    public async insert (user: User): Promise<User[]>
    {
        return Postgres.insert<User>(this.table, user);
    }

    public async select (filter: Partial<User>): Promise<User[]>
    {
        return Postgres.select<User>(this.table, filter);
    }
}

export default new UsersTable();