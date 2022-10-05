import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const route = Router();

const teamsController = new TeamsController();

route.get('/health', teamsController.routeHealth);
route.get('/', teamsController.getAllTeams);
route.get('/:id', teamsController.getOneTeam);

export default route;
