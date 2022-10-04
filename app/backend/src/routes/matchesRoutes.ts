import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const route = Router();

const matchesController = new MatchesController();

route.get('/health', matchesController.routeHealth);
route.get('/', matchesController.getMatches);

export default route;
