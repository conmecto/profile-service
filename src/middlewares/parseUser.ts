import { Response, NextFunction } from 'express';
import { interfaces, validationSchema } from '../utils'; 

const parseUserMiddleware = async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
  if (!req['X-USER']) {
    throw new Error();
  }
  const user = JSON.parse(req['X-USER']);
  await validationSchema.userHeaderSchema.validateAsync(user);
  req.user = user;
  next();
};

export default parseUserMiddleware;