import { Request, Response, Router, NextFunction } from 'express';
import { requestUtils, enums, interfaces } from '../utils'; 
import { updateProfile, generateImageUploadUrl, getUserProfile } from '../controllers';

const profileRouter = Router();

profileRouter.post('/:id/image-upload-url', async (req: interfaces.ICustomerRequest, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await generateImageUploadUrl(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await updateProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

profileRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredRequest = await requestUtils.filterRequest(req);
        const controllerResponse = await getUserProfile(filteredRequest);
        res.status(enums.StatusCodes.OK).send(controllerResponse);    
    } catch(err) {
        next(err);
    }
});

export default profileRouter;