import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ChartsSection from '../components/ChartsSection';

function Dashboard() {
  const [stats, setStats] = useState({
    overview: { total: 0, in_use: 0, inactive: 0, in_repair: 0, recentlyAdded: 0 },
    typeDistribution: [],
    topEmployees: [],
    locationStats: [],
    statusBreakdown: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Laptop': '💻',
      'Desktop': '🖥️',
      'Monitor': '🖨️',
      'Printer': '🖨️',
      'Phone': '📱',
      'Tablet': '📱'
    };
    return icons[type] || '📦';
  };

  const getProgressBarColor = (index) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500'];
    return colors[index % colors.length];
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">IT Asset Management Dashboard</h1>

      {/* Overview Stats */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Assets</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stats.overview.total}</dd>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">All registered assets</div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="px-4 py-5 sm:p-6">

            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Assets</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">{stats.overview.active}</dd>
            <div className="mt-2 text-sm text-green-600 dark:text-green-400">Currently in use</div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Inactive Assets</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">{stats.overview.inactive}</dd>
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">Not in use</div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:scale-105">
          <div className="px-4 py-5 sm:p-6">

            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Recently Added</dt>
            <dd className="mt-1 text-3xl font-semibold text-blue-600 dark:text-blue-400">{stats.overview.recentlyAdded}</dd>
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">Last 30 days</div>
          </div>
        </div>
      </div>

      {/* AI-Powered Charts Section */}
      <ChartsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Asset Types Distribution */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Most Used Asset Types</h2>
          <div className="space-y-4">
            {stats.typeDistribution.map((item, index) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(index)}`}
                      style={{ width: `${(item.count / stats.overview.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Employees */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Top Asset Holders</h2>
          <div className="space-y-4">
            {stats.topEmployees.map((employee, index) => (
              <div key={employee.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getProgressBarColor(index)}`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{employee.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressBarColor(index)}`}
                      style={{ width: `${(employee.assetCount / Math.max(...stats.topEmployees.map(e => e.assetCount))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8">{employee.assetCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Location Distribution */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Assets by Location</h2>
          <div className="space-y-3">
            {stats.locationStats.map((location, index) => (
              <div key={location.location} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📍</span>
                  <span className="font-medium text-gray-900 dark:text-white">{location.location}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {location.count} assets
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/assets"
              className="flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">📦</span>
              Manage Assets
            </Link>
            <Link
              to="/scan"
              className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">📷</span>
              Scan QR Code
            </Link>
            <Link
              to="/asset-types"
              className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="mr-2">🏷️</span>
              Manage Asset Types
            </Link>
          </div>

          {/* Status Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Asset Status Summary</h3>
            <div className="space-y-2">
              {stats.statusBreakdown.map((status, index) => (
                <div key={status.status} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status.status}</span>
                  <span className={`text-sm font-semibold ${status.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
