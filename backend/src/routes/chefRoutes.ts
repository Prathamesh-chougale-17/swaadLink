import express from 'express';
import * as chefController from '../controllers/chefController';

const router = express.Router();

router.get('/chefs', chefController.getAllChefs);
router.get('/chefs/:id', chefController.getChefById);
router.post('/chefs', chefController.createChef);
router.put('/chefs/:id', chefController.updateChef);
router.delete('/chefs/:id', chefController.deleteChef);
router.get('/chefs/search', chefController.searchChefs);

export default router;