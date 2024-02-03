import multer from 'multer';
import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums, interfaces, constants } from '../utils'; 
import { 
    updateProfile, getUserProfile, getMultipleUsersProfile, searchProfiles, uploadProfilePicture,
    addPost, getUserPosts, deletePost, reportPost
} from '../controllers';
import { FileStorageEngine, fileFilterFactory, authenticateRequest } from '../middlewares';

const profileRouter = Router();

profileRouter.post('/users/:userId/profile-picture',    
    authenticateRequest,
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
    authenticateRequest, 
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

profileRouter.delete('/users/:userId/post/:postId', 
    authenticateRequest,
    async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
        try {
            const filteredRequest = await requestUtils.filterRequest(req);
            const controllerResponse = await deletePost(filteredRequest);
            res.status(enums.StatusCodes.OK).send(controllerResponse);
        } catch(err) {
            next(err);
        }
    }
);

profileRouter.put('/users/post/:postId/report', 
    authenticateRequest,
    async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
        try {
            const filteredRequest = await requestUtils.filterRequest(req);
            const controllerResponse = await reportPost(filteredRequest);
            res.status(enums.StatusCodes.OK).send(controllerResponse);
        } catch(err) {
            next(err);
        }
    }
);

profileRouter.get('/users/:userId/posts',
    authenticateRequest,
    async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
        try {
            const filteredRequest = await requestUtils.filterRequest(req);
            const controllerResponse = await getUserPosts(filteredRequest);
            res.status(enums.StatusCodes.OK).send(controllerResponse);
        } catch(err) {
            next(err);
        }
    }
);

profileRouter.patch('/users/:userId', authenticateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await updateProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('', authenticateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await searchProfiles(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('/multiple-users', authenticateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getMultipleUsersProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('/users/:userId', authenticateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getUserProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

export default profileRouter;