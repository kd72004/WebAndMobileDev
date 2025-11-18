// Expense Insights API integration for smart expense categorization and suggestions

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Get expense category and description suggestions (legacy function - not used)
 * @param {string} description - Expense description
 * @param {number} amount - Expense amount
 * @returns {Promise<{category: string, suggestions: string[], smartDescription: string}>}
 */
export const getExpenseInsights = async (description, amount) => {
  try {
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured');
      return {
        category: 'Other',
        smartDescription: description,
        suggestions: []
      };
    }

    const prompt = `Analyze this expense and provide:
1. A category (one word: Food, Travel, Shopping, Entertainment, Bills, Health, Education, Other)
2. A smart, concise description (max 30 characters)
3. 3 alternative description suggestions

Expense: "${description || 'Expense'}"
Amount: ₹${amount || 0}

Respond ONLY with valid JSON in this exact format:
{
  "category": "category_name",
  "smartDescription": "improved description",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that analyzes expenses and provides structured JSON responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '{}';
    
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        category: parsed.category || 'Other',
        smartDescription: parsed.smartDescription || description,
        suggestions: parsed.suggestions || []
      };
    }

    // Fallback if JSON parsing fails
    return {
      category: 'Other',
      smartDescription: description,
      suggestions: []
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Return fallback values
    return {
      category: 'Other',
      smartDescription: description,
      suggestions: []
    };
  }
};

/**
 * Get smart expense analysis and tips
 * Uses backend proxy to avoid CORS issues
 * Backend fetches actual expense data from database for personalized analysis
 * @param {Array} expenses - Optional: Array of expense objects (not used, kept for compatibility)
 * @returns {Promise<string>} Analysis text
 */
export const getExpenseAnalysis = async (expenses) => {
  try {
    const baseURL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;
    const token = localStorage.getItem('token');

    if (!token) {
      return 'Please login to get AI-powered insights about your expenses!';
    }

    // Backend will fetch actual expense data from database
    const response = await fetch(`${baseURL}/expense-insights/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({}) // Empty body - backend fetches from DB
    });

    if (!response.ok) {
      // If backend endpoint doesn't exist, try direct OpenAI call
      if (response.status === 404) {
        return await getDirectExpenseAnalysis(expenses);
      }
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', response.status, errorData);
      throw new Error(errorData.message || `API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.text || 'No insights available at this time.';
  } catch (error) {
    console.error('OpenAI API Error Details:', error);
    // Try direct OpenAI call as fallback
    try {
      return await getDirectExpenseAnalysis(expenses);
    } catch (fallbackError) {
      // Return helpful fallback tips
      return `Here are some general financial tips:\n\n• Track your expenses regularly to identify spending patterns\n• Set a monthly budget and review it weekly\n• Look for opportunities to reduce recurring expenses\n• Save at least 20% of your income when possible\n\nNote: AI insights are temporarily unavailable. Please try again later.`;
    }
  }
};

/**
 * Direct OpenAI API call for expense analysis (fallback)
 * @param {Array} expenses - Array of expense objects
 * @returns {Promise<string>} Analysis text
 */
const getDirectExpenseAnalysis = async (expenses) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  // Summarize expenses for analysis
  const expenseSummary = expenses && expenses.length > 0
    ? expenses.slice(0, 10).map(exp => `${exp.description}: ₹${exp.amount}`).join(', ')
    : 'No expenses found';

  const prompt = `Analyze these expenses and provide smart financial insights and recommendations:
${expenseSummary}

Provide 3-5 actionable tips in a friendly, conversational tone. Focus on spending patterns, savings opportunities, and budgeting advice.`;

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful financial advisor that provides practical, actionable advice about expense management.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'OpenAI API request failed');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No insights available at this time.';
};

