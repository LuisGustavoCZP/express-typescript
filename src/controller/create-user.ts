import { Request, Response } from "express";
import { APIResponse, User } from "../models";
import { CreateUserService } from "../services";
import { ResponseWriter } from "../utils/response-writer";

class CreateUser
{
    private service = CreateUserService;

    public handle(req: Request, res: Response)
    {
        try 
        {
            const response = new this.service().execute(req.body);
            new ResponseWriter().success(res, 201, response);
        }
        catch (err: any)
        {
            new ResponseWriter().error(res, err);
        }
    }
}

export { CreateUser }