import { Request, Response } from 'express';
import services from "../services";

export default (req: Request, res: Response) => {
    const service = services.pong();
    res.send(service);
}