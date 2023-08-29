import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async postLogin(req: Request, res: Response) {
    const serviceResponse = await this.userService.postLogin(req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
