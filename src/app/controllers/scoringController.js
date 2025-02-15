import creditScoreService from '../services/creditScoreCalculator.js';

/**
 * Credit Score Controller
 */
const creditScoreController = {
  /**
   * Handle credit score calculation request.
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async calculateCreditScore(req, res) {
    try {
      const { nin } = req.body;

      if (!nin) {
        return res.status(400).json({ error: 'NIN is required' });
      }

      // Call credit score service
      const result = await creditScoreService.calculateCreditScore(nin);

      return res.status(200).json(result);
    } catch (error) {
      console.error('Credit Score Error:', error.message);
      return res.status(500).json({ error: 'Failed to calculate credit score.' });
    }
  },
};

export default creditScoreController;
