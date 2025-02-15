import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const MONO_API_KEY = process.env.MONO_API_KEY;
const ML_MODEL_URL = 'https://creditworthiness-ml.onrender.com/predict';

/**
 * Mono API Helper
 */
const monoService = {
  /**
   * Get user identity (NIN verification)
   * @param {String} userId - Mono user ID
   * @returns {Object} - User identity data
   */
  async getUserIdentity(userId) {
    const url = `https://api.withmono.com/v1/accounts/${userId}/identity`;
    const headers = { Authorization: `Bearer ${MONO_API_KEY}` };

    const response = await axios.get(url, { headers });
    return response.data;
  },

  /**
   * Get user transactions
   * @param {String} userId - Mono user ID
   * @returns {Array} - List of transactions
   */
  async getUserTransactions(userId) {
    const url = `https://api.withmono.com/v1/accounts/${userId}/transactions?paginate=false`;
    const headers = { Authorization: `Bearer ${MONO_API_KEY}` };

    const response = await axios.get(url, { headers });
    return response.data.data;
  },
};

/**
 * Credit Score Service
 */
const creditScoreService = {
  /**
   * Calculate Credit Score
   * @param {String} userId - Mono user ID
   * @returns {Object} - Credit score and explanation
   */
  async calculateCreditScore(userId) {
    try {
      console.log('Fetching user NIN and financial data from Mono...');

      // Step 1: Fetch user identity (NIN)
      const userIdentity = await monoService.getUserIdentity(userId);
      const nin = userIdentity?.identity?.nin;
      console.log('User NIN:', nin);

      if (!nin) {
        throw new Error('NIN not found for user.');
      }

      // Step 2: Fetch transactions
      const transactions = await monoService.getUserTransactions(userId);

      if (!transactions || transactions.length === 0) {
        throw new Error('No transactions found for user.');
      }

      // Step 3: Calculate financial metrics
      const totalIncome = transactions
        .filter(txn => txn.type === 'credit')
        .reduce((sum, txn) => sum + txn.amount, 0);

      const totalSpending = transactions
        .filter(txn => txn.type === 'debit')
        .reduce((sum, txn) => sum + txn.amount, 0);

      const accountBalance = transactions[0]?.balance || 0;
      const creditUtilization = (totalSpending / totalIncome) * 100;

      // Ensure spending pattern does not exceed 100%
      const spendingPattern = Math.min((totalSpending / totalIncome) * 100, 100);

      // Step 4: Prepare data for ML model
      const financialData = {
        MonthlyIncome: totalIncome,
        AccountBalance: accountBalance,
        SpendingPattern: spendingPattern.toFixed(2),
        CreditUtilization: creditUtilization.toFixed(2),
      };

      console.log('Final Financial Data:', JSON.stringify(financialData, null, 2));

      // Step 5: Send data to ML model
      const mlResponse = await axios.post(ML_MODEL_URL, financialData);

      console.log('ML Model Response:', mlResponse.data);

      // Parse ML model response
      const { credit_score, risk_level, ai_insight } = mlResponse.data;

      return { credit_score, risk_level, ai_insight };
    } catch (error) {
      console.error('Error calculating credit score:', error.response?.data || error.message);
      throw new Error('Failed to calculate credit score.');
    }
  },
};

export default creditScoreService;
