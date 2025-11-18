import { useEffect, useState } from 'react';
import getUserId from '../utils/getUserId';
import { Link } from 'react-router-dom';

export default function UserGroups() {
  const [groups, setGroups] = useState([]);
  const [groupStats, setGroupStats] = useState({});

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = getUserId();
        const token = localStorage.getItem('token');
        const baseURL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;
        
        const res = await fetch(`${baseURL}/group-memberships/user/${userId}`, {
          method: 'GET',
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch groups');
        }
        
        const data = await res.json();
        const groupsData = Array.isArray(data) ? data : [data];
        setGroups(groupsData);
        
        // Fetch stats for each group
        const stats = {};
        for (const group of groupsData) {
          try {
            const expensesRes = await fetch(`${baseURL}/expenses/group/${group._id}`, {
              method: 'GET',
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
            
            const membersRes = await fetch(`${baseURL}/group-memberships/group/${group._id}`, {
              method: 'GET',
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
            
            if (!expensesRes.ok || !membersRes.ok) {
              throw new Error('Failed to fetch group stats');
            }
            
            const expensesData = await expensesRes.json();
            const membersData = await membersRes.json();
            
            stats[group._id] = {
              totalExpenses: expensesData.length,
              totalAmount: expensesData.reduce((sum, exp) => sum + exp.amount, 0),
              memberCount: Array.isArray(membersData) ? membersData.length : 1,
              lastActivity: expensesData.length > 0 ? 
                new Date(Math.max(...expensesData.map(e => new Date(e.createdAt)))).toLocaleDateString() : 
                'No activity'
            };
          } catch (err) {
            stats[group._id] = { totalExpenses: 0, totalAmount: 0, memberCount: 1, lastActivity: 'No activity' };
          }
        }
        setGroupStats(stats);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  const getGroupIcon = (groupName) => {
    const lower = groupName.toLowerCase();
    if (lower.includes('project')) return '📚';
    if (lower.includes('expense')) return '💰';
    if (lower.includes('friends')) return '👫';
    if (lower.includes('family')) return '🏠';
    if (lower.includes('trip')) return '✈️';
    if (lower.includes('health')) return '🏥';
    return '📂';
  };

  const getCardClass = (index) => {
    const cardStyles = [
      'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-200',
      'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200',
      'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-200',
      'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-200',
      'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-pink-200',
      'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-indigo-200'
    ];
    return cardStyles[index % cardStyles.length];
  };

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-3">📂</div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">No Groups Yet</h3>
        <p className="text-gray-500 mb-4">Create your first group to start splitting expenses</p>
        <Link
          to="/create-group"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Create Your First Group
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
      {groups.map((group, index) => {
        const stats = groupStats[group._id] || { totalExpenses: 0, totalAmount: 0, memberCount: 1, lastActivity: 'Loading...' };
        
        return (
          <Link
            key={group._id}
            to={`/groups/${group._id}`}
            className={`${getCardClass(index)} rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group border-0`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {getGroupIcon(group.name)}
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">{stats.memberCount}</span>
              </div>
            </div>
            
            {/* Group Info */}
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
              {group.name}
            </h2>
            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {group.description || 'No description available'}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">{stats.totalExpenses}</div>
                <div className="text-xs text-white/80">Expenses</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">₹{stats.totalAmount.toLocaleString()}</div>
                <div className="text-xs text-white/80">Total</div>
              </div>
            </div>
            
            {/* Last Activity */}
            <div className="text-xs text-white/70 border-t border-white/20 pt-3 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last: {stats.lastActivity}
            </div>
          </Link>
        );
      })}
    </div>
  );
}


