import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import { ValidationError, } from 'joi';
import { CustomError, logger } from '../services';
import { enums } from '../utils';

const errorHandler: ErrorRequestHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    await logger('Profile Service: ' + 'Error handler ' + err?.toString());
    let newError: CustomError;
    if (err instanceof CustomError) {
        newError = err;
    } else if (err instanceof ValidationError) {
        newError = new CustomError(enums.StatusCodes.BAD_REQUEST, err.message, enums.ErrorCodes.VALIDATION_ERROR);
    } else if (err instanceof MulterError) {
        newError = new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_FILE, enums.ErrorCodes.INVALID_FILE);
    } else {
        newError = new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    newError.apiPath = req.originalUrl;
    res.status(newError.errorStatus).send(newError.errorObject);
}

export default errorHandler;