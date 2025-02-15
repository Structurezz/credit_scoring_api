import axios from 'axios';

const openAiService = {
  async analyzeUserActivity(activityLogs) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions', // Adjust the endpoint based on your usage
        {
          model: 'text-davinci-003', // Choose an appropriate model
          prompt: `Analyze the following user activity logs and provide insights: ${JSON.stringify(activityLogs)}`,
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error analyzing user activity with OpenAI:', error);
      throw new Error('Failed to analyze user activity with OpenAI.');
    }
  },

  async analyzeFinancialTrends(financialTrends) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: `Analyze the following financial trends and provide insights: ${JSON.stringify(financialTrends)}`,
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error analyzing financial trends with OpenAI:', error);
      throw new Error('Failed to analyze financial trends with OpenAI.');
    }
  },
};

export default openAiService;
