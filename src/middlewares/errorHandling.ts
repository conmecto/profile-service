import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import { ValidationError, } from 'joi';
import { CustomError, logger } from '../services';
import { enums } from '../utils';

const errorHandler: ErrorRequestHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    let newError: CustomError;
    if (error instanceof CustomError) {
        newError = error;
        const errorObj = error.loggingErrorObject;
        await logger('Error handler: ' + JSON.stringify(errorObj));
    } else if (error instanceof ValidationError) {
        await logger('Error handler: ' + error.message);
        newError = new CustomError(enums.StatusCodes.BAD_REQUEST, error.message, enums.ErrorCodes.VALIDATION_ERROR);
    } else if (error instanceof MulterError) {
        await logger('Error handler: Multer Error' + error.message);
        newError = new CustomError(enums.StatusCodes.BAD_REQUEST, enums.Errors.INVALID_FILE, enums.ErrorCodes.INVALID_FILE);
    } else {
        await logger('Error handler: ' + JSON.stringify({
            message: error?.toString(),
            stack: error?.stack 
        }));
        newError = new CustomError(enums.StatusCodes.INTERNAL_SERVER, enums.Errors.INTERNAL_SERVER, enums.ErrorCodes.INTERNAL_SERVER);
    }
    newError.apiPath = req.originalUrl;
    res.status(newError.errorStatus).send(newError.errorObject);
}

export default errorHandler;