import { Request, Response } from "express";
import { ResponseWriter } from "../../utils/response-writer";
import { CreateAccountService } from "../../services";

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
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateAccount();