import multer from 'multer';
import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums, interfaces, Environments, constants } from '../utils'; 
import { updateProfile, getUserProfile, getMultipleUsersProfile, searchProfiles, uploadProfilePicture } from '../controllers';
import { ProfilePictureStorage, fileFilter } from '../middlewares';

const profileRouter = Router();

profileRouter.post('/users/:userId/image', 
    multer({ 
        storage: new ProfilePictureStorage(), 
        fileFilter, 
        limits: { fieldSize: constants.MAX_FIELD_SIZE_BYTES, fileSize: constants.MAX_FILE_SIZE_BYTES } 
    }).single('image'), 
    async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
        try {
            const filteredRequest = await requestUtils.filterRequest(req);
            const controllerResponse = await uploadProfilePicture(filteredRequest);
            res.status(enums.StatusCodes.OK).send(controllerResponse);
        } catch(err) {
            next(err);
        }
    }
);

profileRouter.patch('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await updateProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await searchProfiles(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('/multiple-users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getMultipleUsersProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('/users/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getUserProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

export default profileRouter;