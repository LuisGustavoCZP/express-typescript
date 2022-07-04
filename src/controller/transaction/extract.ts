import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateExtractService } from "../../services";

class CreateExtract
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {account, password} = req.body;
            //console.log("Passou por aqui!");
            const response = await CreateExtractService.execute(account, password);
            new ResponseWriter().success(res, 200, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateExtract();