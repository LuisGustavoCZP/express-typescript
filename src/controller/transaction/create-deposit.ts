import { Request, Response } from "express";
import { ResponseWriter } from "../../utils";
import { CreateDepositService } from "../../services";

class CreateDeposit
{ 
    public async handle (req: Request, res: Response) 
    {
        try 
        {
            const {destination, quanty} = req.body;
            //console.log("Passou por aqui!");
            console.log(destination);
            const response = await CreateDepositService.execute(destination, quanty);
            new ResponseWriter().success(res, 202, response)
        }
        catch(e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateDeposit();