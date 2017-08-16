import * as express from 'express';
import auth from './auth';
const authRouter = express();

authRouter.use('/auth', auth);

export { authRouter };