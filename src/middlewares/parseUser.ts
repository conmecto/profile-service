import { Response, NextFunction } from 'express';
import { interfaces, validationSchema, enums } from '../utils'; 

const parseUserMiddleware = async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
  try {
    if (!req['X-USER']) {
      throw new Error();
    }
    const user = JSON.parse(req['X-USER']);
    await validationSchema.userHeaderSchema.validateAsync(user);
    req.user = user;
    next();
  } catch(error) {
    console.log(enums.PrefixesForLogs.MIDDLEWARE_PARSE_USER_ERROR + error);
    next(error);
  }
};

export default parseUserMiddleware;