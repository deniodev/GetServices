import express from 'express';
import { createService, updateService, deleteService, getService, getServices } from '../controllers/service.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import reviewRouter from './review.route.js';

const router = express.Router();

//nested route
router.use('/:serviceId/reviews', reviewRouter);

router.post('/create', verifyToken, createService);
router.delete('/delete/:id', verifyToken, deleteService);
router.post('/update/:id', verifyToken, updateService);
router.get('/get/:id', getService);
router.get('/get', getServices)

export default router;