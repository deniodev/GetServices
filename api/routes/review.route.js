import express from 'express';
import { createReview, getAllReviews } from '../controllers/review.controller.js';
import  { verifyToken } from '../utils/verifyUser.js';

const router = express.Router({mergeParams:true});

router
.route('/')
.get(getAllReviews)
.post(verifyToken,createReview);

export default router;
