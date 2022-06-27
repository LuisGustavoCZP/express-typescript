import { Request, Response } from "express";
import { ResponseWriter } from "../../utils/response-writer";
import CreateAccountService from "../../services/account/create-account";

class CreateAccount
{
    //private service =  
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const response = await CreateAccountService.execute(req.body);
            new ResponseWriter().success(res, 201, response)
        }
        catch(e : any) 
        {
            new ResponseWriter().error(res, e);
        }
    }
}

export default new CreateAccount();