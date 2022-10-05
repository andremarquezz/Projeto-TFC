import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import validateInfoLogin from '../middlewares/validateInfoLogin';
import LoginController from '../controllers/LoginController';

const route = Router();

const loginController = new LoginController();

route.get('/health', loginController.routeHealth);
route.get('/validate', validateToken, loginController.getRole);

route.post('/', validateInfoLogin, loginController.login);

export default route;
