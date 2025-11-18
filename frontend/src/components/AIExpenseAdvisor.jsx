import { useState, useEffect } from 'react';
import { getExpenseAnalysis } from '../utils/openaiApi';

/**
 * NEW FEATURE: AI Expense Advisor Component
 * Uses Expense Insights API to provide smart financial insights and recommendations
 * This is a standalone feature that doesn't modify existing code
 */
export default function AIExpenseAdvisor({ expenses = [] }) {
  const [insights, setInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      // Backend fetches actual expense data from database - no need to pass expenses
      const analysis = await getExpenseAnalysis(expenses);
      if (analysis && (analysis.includes('temporarily unavailable') || analysis.includes('Error:'))) {
        setError('AI service is currently unavailable. Showing general tips instead.');
      }
      setInsights(analysis);
    } catch (err) {
      console.error('AI Advisor Error:', err);
      setError(`Failed to fetch AI insights: ${err.message}. Check browser console for details.`);
      setInsights('Unable to connect to AI service. Please check:\n\n• Backend server is running\n• You are logged in\n• Internet connection is active\n• Try refreshing the page');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-fetch insights when component mounts or expenses change
    // Backend will fetch actual data from database
    fetchAIInsights();
  }, [expenses.length]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg border border-purple-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">AI Expense Advisor</h3>
            <p className="text-xs text-gray-600">Smart Expense Insights</p>
          </div>
        </div>
        <button
          onClick={fetchAIInsights}
          disabled={loading || expenses.length === 0}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-xs mt-1 text-yellow-700">Check browser console for details</p>
            </div>
          </div>
        </div>
      )}

      {loading && !insights ? (
        <div className="space-y-3">
          <div className="h-4 bg-purple-200 rounded animate-pulse"></div>
          <div className="h-4 bg-purple-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-purple-200 rounded animate-pulse w-4/6"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-4 border border-purple-100">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {insights || 'Click refresh to get AI-powered insights about your expenses!'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center space-x-2 text-xs text-gray-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Smart insights generated from your expense patterns and financial tips</span>
      </div>
    </div>
  );
}

