import { Router } from 'express';

import LeaderboardSController from '../controllers/LeaderboardSController';

const route = Router();

const leaderboardSController = new LeaderboardSController();

route.get('/health', leaderboardSController.routeHealth);
// route.get('/home', leaderboardSController.classificationHome);

export default route;
