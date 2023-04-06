import { Router } from 'express';
import profileRouter from './profile';

const router = Router();
router.use('/users/:userId/profile', profileRouter);

export default router;
