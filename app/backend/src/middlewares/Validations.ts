import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwtUtil';

export default class Validations {
  static hasEmailAndPassword(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  static emailAndPasswordFormats(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static checkToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const noBearer = authorization.split(' ');
    const token = noBearer[noBearer.length - 1];

    const data = jwtUtil.verify(token);
    if (typeof data === 'string') {
      return res.status(401).json({ message: data });
    }

    res.locals.data = data;
    next();
  }
}
