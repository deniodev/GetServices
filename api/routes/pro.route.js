import express from 'express';
import { createPro } from '../controllers/pro.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPro);

export default router;