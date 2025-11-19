const express = require('express');
const router = express.Router();
const Expense = require('../model/expenseModel');
const Group = require('../model/groupModel');
const GroupMembership = require('../model/groupMembershipModel');
const auth = require('../middleware/auth');

// Use node-fetch for Node.js compatibility (or native fetch if Node 18+)
let fetch;
try {
  if (typeof globalThis.fetch === 'function') {
    fetch = globalThis.fetch;
  } else {
    fetch = require('node-fetch');
  }
} catch (e) {
  fetch = globalThis.fetch;
}

/**
 * Get expense insights using free public API + smart local analysis
 * POST /api/expense-insights/analyze
 * No API key required - uses free public APIs
 */
router.post('/analyze', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Expense Insights Request received for user:', userId);

    // Fetch user's groups
    const memberships = await GroupMembership.find({ userId })
      .populate('groupId', 'name description');
    
    if (memberships.length === 0) {
      return res.json({ 
        text: 'Join or create a group and add some expenses to get personalized insights!' 
      });
    }

    const groupIds = memberships.map(m => m.groupId._id);
    
    // Fetch all expenses from user's groups
    const expenses = await Expense.find({ groupId: { $in: groupIds } })
      .populate('groupId', 'name')
      .populate('paidBy.userId', 'name')
      .populate('splitMember.userId', 'name')
      .sort({ createdAt: -1 })
      .limit(50);

    if (expenses.length === 0) {
      return res.json({ 
        text: 'Add some expenses to your groups to get personalized insights!\n\n💡 Tip: Start tracking your daily expenses to see spending patterns.' 
      });
    }

    console.log('Found', expenses.length, 'expenses for analysis');

    // Smart Local Analysis (No API needed)
    const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const avgAmount = totalAmount / expenses.length;
    const maxExpense = Math.max(...expenses.map(e => e.amount || 0));
    const minExpense = Math.min(...expenses.map(e => e.amount || 0));
    
    // Category analysis
    const categoryKeywords = {
      'Food': ['food', 'restaurant', 'dinner', 'lunch', 'breakfast', 'cafe', 'pizza', 'burger', 'meal', 'coffee', 'snack'],
      'Travel': ['taxi', 'uber', 'flight', 'hotel', 'train', 'bus', 'travel', 'trip', 'fuel', 'gas', 'parking'],
      'Shopping': ['shopping', 'store', 'mall', 'amazon', 'purchase', 'buy', 'clothes', 'shoes'],
      'Entertainment': ['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'party', 'music'],
      'Bills': ['bill', 'electricity', 'water', 'internet', 'phone', 'rent', 'utility', 'subscription'],
      'Health': ['medicine', 'pharmacy', 'doctor', 'hospital', 'gym', 'fitness', 'health'],
      'Education': ['book', 'course', 'tuition', 'school', 'college', 'education', 'learning']
    };
    
    const categoryMap = {};
    expenses.forEach(e => {
      const desc = (e.description || '').toLowerCase();
      let category = 'Other';
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(kw => desc.includes(kw))) {
          category = cat;
          break;
        }
      }
      categoryMap[category] = (categoryMap[category] || 0) + e.amount;
    });
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
    
    // Date analysis
    const now = new Date();
    const thisMonth = expenses.filter(e => {
      const expDate = new Date(e.createdAt);
      return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    });
    const thisMonthTotal = thisMonth.reduce((sum, e) => sum + (e.amount || 0), 0);
    
    const thisWeek = expenses.filter(e => {
      const expDate = new Date(e.createdAt);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return expDate >= weekAgo;
    });
    const thisWeekTotal = thisWeek.reduce((sum, e) => sum + (e.amount || 0), 0);

    // User's payment pattern
    const userPaidExpenses = expenses.filter(e => 
      e.paidBy.some(p => p.userId._id.toString() === userId.toString())
    );
    const userPaidTotal = userPaidExpenses.reduce((sum, e) => {
      const userPayer = e.paidBy.find(p => p.userId._id.toString() === userId.toString());
      return sum + (userPayer?.amount || 0);
    }, 0);

    // Get free financial advice from public API (no auth needed)
    let financialTip = '';
    try {
      // Using Advice Slip API - Free, no authentication required
      const adviceResponse = await fetch('https://api.adviceslip.com/advice');
      if (adviceResponse.ok) {
        const adviceData = await adviceResponse.json();
        financialTip = adviceData.slip?.advice || '';
      }
    } catch (error) {
      console.log('Advice API not available, using local tips');
    }

    // Build personalized insights
    const insights = [];

    // Insight 1: Spending Summary
    insights.push(`📊 **Spending Summary**\n`);
    insights.push(`You've spent ₹${totalAmount.toLocaleString()} across ${expenses.length} transactions.`);
    insights.push(`Average expense: ₹${avgAmount.toFixed(2)}`);
    insights.push(`Highest expense: ₹${maxExpense.toLocaleString()}`);
    insights.push(`This month: ₹${thisMonthTotal.toLocaleString()} (${thisMonth.length} expenses)`);
    insights.push(`This week: ₹${thisWeekTotal.toLocaleString()} (${thisWeek.length} expenses)\n`);

    // Insight 2: Category Analysis
    if (topCategory) {
      insights.push(`💰 **Top Spending Category: ${topCategory[0]}**\n`);
      insights.push(`You spent ₹${topCategory[1].toLocaleString()} on ${topCategory[0]}.`);
      insights.push(`This is ${((topCategory[1] / totalAmount) * 100).toFixed(1)}% of your total spending.\n`);
    }

    // Insight 3: Category Breakdown
    insights.push(`📈 **Category Breakdown:**\n`);
    Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([cat, amt]) => {
        const percentage = ((amt / totalAmount) * 100).toFixed(1);
        insights.push(`• ${cat}: ₹${amt.toLocaleString()} (${percentage}%)`);
      });
    insights.push('');

    // Insight 4: Payment Pattern
    insights.push(`💳 **Your Payment Pattern:**\n`);
    insights.push(`You've paid ₹${userPaidTotal.toLocaleString()} total (${userPaidExpenses.length} expenses).`);
    if (userPaidTotal > totalAmount * 0.5) {
      insights.push(`You're paying more than 50% of expenses - consider splitting more evenly!\n`);
    } else {
      insights.push(`Good balance in expense sharing!\n`);
    }

    // Insight 5: Smart Recommendations
    insights.push(`💡 **Smart Recommendations:**\n`);
    
    if (thisWeekTotal > thisMonthTotal * 0.5) {
      insights.push(`⚠️ You've spent ${((thisWeekTotal / thisMonthTotal) * 100).toFixed(0)}% of this month's total in just this week. Consider slowing down spending.`);
    }
    
    if (avgAmount > 1000) {
      insights.push(`💸 Your average expense is ₹${avgAmount.toFixed(0)} - look for ways to reduce large expenses.`);
    }
    
    if (topCategory && topCategory[1] > totalAmount * 0.4) {
      insights.push(`🎯 ${topCategory[0]} is ${((topCategory[1] / totalAmount) * 100).toFixed(0)}% of spending - consider budgeting for this category.`);
    }
    
    insights.push(`✅ Track expenses daily to identify patterns and save more!`);

    // Add free financial tip if available
    if (financialTip) {
      insights.push(`\n🌟 **Financial Tip:** ${financialTip}`);
    } else {
      insights.push(`\n🌟 **Financial Tip:** Save at least 20% of your income and build an emergency fund!`);
    }

    const finalText = insights.join('\n');
    
    res.json({ 
      text: finalText
    });
  } catch (error) {
    console.error('Expense Insights Error:', error);
    res.json({ 
      text: `Here are some general financial tips:\n\n• Track your expenses regularly to identify spending patterns\n• Set a monthly budget and review it weekly\n• Look for opportunities to reduce recurring expenses\n• Save at least 20% of your income when possible\n\nNote: ${error.message}`
    });
  }
});

module.exports = router;

