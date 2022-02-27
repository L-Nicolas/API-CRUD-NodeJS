import { Router } from 'express';
import UserCtrl from './user.controller';
const routeUser = Router();

routeUser.get('/api/user/get/:token', UserCtrl.getUser);
routeUser.post('/api/user/connect', UserCtrl.connectUser);

export { routeUser };