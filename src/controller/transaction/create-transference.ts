import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateTransferenceService } from "../../services";

class CreateTransference
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {origin, destination, quanty, password} = req.body;
            //console.log("Passou por aqui!");
            const response = await CreateTransferenceService.execute(origin, password, destination, quanty);
            new ResponseWriter().success(res, 202, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateTransference();