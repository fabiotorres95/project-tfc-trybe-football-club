import { Request, Response } from 'express';
import jwtUtil from '../utils/jwtUtil';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async postLogin(req: Request, res: Response) {
    const response = await this.userService.postLogin(req.body);
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  static getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const data = jwtUtil.verify(authorization as string);
    res.status(200).json({ role: data.role });
  }
}
