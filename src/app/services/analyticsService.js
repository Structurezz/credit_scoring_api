import Analytics from '../models/Analytics.js';

const analyticsService = {
  /**
   * Fetch user activity logs.
   * @param {String} userId
   * @returns {Promise<Array>}
   */
  async fetchUserActivityLogs(userId) {
    return await Analytics.find({ userId });
  },

  /**
   * Fetch system-wide usage data.
   * @returns {Promise<Object>}
   */
  async fetchSystemUsage() {
    return await Analytics.aggregate([
      { $group: { _id: null, totalRequests: { $sum: '$requestCount' } } },
    ]);
  },

  /**
   * Fetch financial trends based on user transactions.
   * @returns {Promise<Array>}
   */
  async fetchFinancialTrends() {
    return await Analytics.aggregate([
      { $match: { type: 'transaction' } },
      { $group: { _id: '$month', totalAmount: { $sum: '$amount' } } },
      { $sort: { _id: 1 } },
    ]);
  },

  /**
   * Generate detailed analytics report.
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<Array>}
   */
  async generateDetailedReport(startDate, endDate) {
    return await Analytics.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
  },
};

export default analyticsService;
