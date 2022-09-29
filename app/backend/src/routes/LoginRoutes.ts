import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const route = Router();

const loginController = new LoginController();

route.get('/login', loginController.endpoint);

export default route;
