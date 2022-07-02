import { Request, Response } from "express";
import { ResponseWriter } from "../../utils/response-writer";
import { CreateWithdrawService } from "../../services";

class CreateWithdraw
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {origin, quanty} = req.body;
            //console.log("Passou por aqui!");
            const response = await CreateWithdrawService.execute(origin, quanty);
            new ResponseWriter().success(res, 202, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateWithdraw();