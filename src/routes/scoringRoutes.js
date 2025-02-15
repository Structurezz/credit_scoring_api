import express from 'express';
import creditScoreController from '../app/controllers/scoringController.js';

const router = express.Router();

// Correctly reference the method inside the controller
router.post('/calculate', creditScoreController.calculateCreditScore);

export default router;
