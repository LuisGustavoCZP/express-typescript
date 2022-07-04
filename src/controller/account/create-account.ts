import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateAccountService } from "../../services";

class CreateAccount
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const password = req.body["password"];
            delete req.body["password"];
            const response = await CreateAccountService.execute(req.body, password);
            new ResponseWriter().success(res, 201, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateAccount();