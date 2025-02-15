import express from 'express';
import analyticsController from '../app/controllers/analyticsController.js';

const router = express.Router();


router.get('/user-activity/:userId', analyticsController.getUserActivity);

router.get('/system-usage', analyticsController.getSystemUsage);

router.get('/financial-trends', analyticsController.getFinancialTrends);

router.post('/generate-report', analyticsController.generateReport);

export default router;
