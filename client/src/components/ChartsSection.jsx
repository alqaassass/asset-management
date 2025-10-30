import { useState, useEffect } from 'react';
import api from '../api/axios';
import AssetTrendChart from './charts/AssetTrendChart';
import AssetStatusChart from './charts/AssetStatusChart';
import AssetTypeChart from './charts/AssetTypeChart';
import AssetAssignmentChart from './charts/AssetAssignmentChart';

function ChartsSection() {
  const [chartsData, setChartsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('1year');

  useEffect(() => {
    fetchChartsData();
  }, [timeRange]);

  const fetchChartsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/insights/charts?range=${timeRange}`);
      setChartsData(response.data);
    } catch (err) {
      console.error('Error fetching charts data:', err);
      setError('Failed to load charts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent mb-6">
          🤖 AI-Powered Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 h-96 animate-pulse"
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent mb-6">
          🤖 AI-Powered Analytics
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchChartsData}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!chartsData) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">
            🤖 AI-Powered Analytics
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Intelligent insights from your asset data
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-1">
            <button
              onClick={() => setTimeRange('1week')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                timeRange === '1week'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              1 Week
            </button>
            <button
              onClick={() => setTimeRange('1month')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                timeRange === '1month'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              1 Month
            </button>
            <button
              onClick={() => setTimeRange('1year')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                timeRange === '1year'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              1 Year
            </button>
          </div>
          <button
            onClick={fetchChartsData}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetTrendChart 
          data={chartsData.trendData.data} 
          insight={chartsData.trendData.insight}
        />
        <AssetStatusChart 
          data={chartsData.statusData.data} 
          insight={chartsData.statusData.insight}
        />
        <AssetTypeChart 
          data={chartsData.typeData.data} 
          insight={chartsData.typeData.insight}
        />
        <AssetAssignmentChart 
          data={chartsData.assignmentData.data} 
          insight={chartsData.assignmentData.insight}
        />
      </div>
    </div>
  );
}

export default ChartsSection;
