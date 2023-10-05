import multer from 'multer';
import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums, interfaces, constants } from '../utils'; 
import { 
    updateProfile, getUserProfile, getMultipleUsersProfile, searchProfiles, uploadProfilePicture,
    addPost, getUserPosts
} from '../controllers';
import { FileStorageEngine, fileFilterFactory } from '../middlewares';

const profileRouter = Router();

profileRouter.post('/users/:userId/image', 
    multer({ 
        storage: new FileStorageEngine('profilePicture'), 
        fileFilter: fileFilterFactory('profilePicture'), 
        limits: { fieldSize: constants.MAX_PROFILE_PICTURE_FIELD_SIZE_BYTES, fileSize: constants.MAX_PROFILE_PICTURE_SIZE_BYTES } 
    }).single('profilePicture'), 
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

profileRouter.post('/users/:userId/post', 
    multer({ 
        storage: new FileStorageEngine('post'), 
        fileFilter: fileFilterFactory('post'), 
        limits: { fieldSize: constants.MAX_FILE_FIELD_SIZE_BYTES, fileSize: constants.MAX_FILE_SIZE_BYTES } 
    }).single('post'), 
    async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
        try {
            const filteredRequest = await requestUtils.filterRequest(req);
            const controllerResponse = await addPost(filteredRequest);
            res.status(enums.StatusCodes.CREATED).send(controllerResponse);
        } catch(err) {
            next(err);
        }
    }
);

profileRouter.get('/users/:userId/post', async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getUserPosts(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);
    } catch(err) {
        next(err);
    }
});

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