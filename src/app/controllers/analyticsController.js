import analyticsService from '../services/analyticsService.js';
import openAiService from '../services/openAiService.js';

const analyticsController = {
  async getUserActivity(req, res) {
    try {
      const { userId } = req.params;
      const activityLogs = await analyticsService.fetchUserActivityLogs(userId);
      if (!activityLogs || activityLogs.length === 0) {
        return res.status(404).json({ message: 'No activity logs found for the user.' });
      }

      // Perform AI analysis on user activity logs
      const aiAnalysisResults = await openAiService.analyzeUserActivity(activityLogs);

      res.status(200).json({ data: activityLogs, analysis: aiAnalysisResults });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user activity logs.', error });
    }
  },

  async getFinancialTrends(req, res) {
    try {
      const trends = await analyticsService.fetchFinancialTrends();
      // Perform AI analysis on financial trends
      const aiAnalysisResults = await openAiService.analyzeFinancialTrends(trends);
      
      res.status(200).json({ data: trends, analysis: aiAnalysisResults });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching financial trends.', error });
    }
  },

  async getSystemUsage(req, res) {
    try {
      const systemUsage = await analyticsService.fetchSystemUsage();
      res.status(200).json({ data: systemUsage });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching system usage data.', error });
    }
  },

  async generateReport(req, res) {
    try {
      const { startDate, endDate } = req.body;
      const report = await analyticsService.generateDetailedReport(startDate, endDate);
      res.status(200).json({ data: report });
    } catch (error) {
      res.status(500).json({ message: 'Error generating report.', error });
    }
  },
};

export default analyticsController;
