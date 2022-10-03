import { Router } from 'express';
import validateInfoLogin from '../middlewares/validateInfoLogin';
import LoginController from '../controllers/LoginController';

const route = Router();

const loginController = new LoginController();

route.get('/', loginController.routeHealth);
route.get('/validate', loginController.getRole);

route.post('/', validateInfoLogin, loginController.login);

export default route;
