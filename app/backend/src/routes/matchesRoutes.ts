import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

const route = Router();

const matchesController = new MatchesController();

route.get('/health', matchesController.routeHealth);
route.get('/', matchesController.getMatches);
route.post('/', validateToken, matchesController.saveMatch);
route.patch('/:id/finish', matchesController.endMatch);
route.patch('/:id', matchesController.updateMatch);

export default route;
