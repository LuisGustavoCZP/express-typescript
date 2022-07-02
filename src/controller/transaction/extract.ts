import { Request, Response } from "express";
import { ResponseWriter } from "../../utils/response-writer";
import { CreateExtractService } from "../../services";

class CreateExtract
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {account} = req.body;
            //console.log("Passou por aqui!");
            const response = await CreateExtractService.execute(account);
            new ResponseWriter().success(res, 200, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateExtract();