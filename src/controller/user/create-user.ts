import { Request, Response } from "express";
import { CreateUserService } from "../../services";
import { ResponseWriter } from "../../utils";

class CreateUser
{
    public async handle(req: Request, res: Response)
    {
        try 
        {
            const response = await CreateUserService.execute(req.body);
            new ResponseWriter().success(res, 201, response);
        }
        catch (e)
        {
            new ResponseWriter().error(res, e as Error);
        }
    }
}

export default new CreateUser();