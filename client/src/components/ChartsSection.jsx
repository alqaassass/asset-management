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

  useEffect(() => {
    fetchChartsData();
  }, []);

  const fetchChartsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/insights/charts');
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🤖 AI-Powered Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 h-96 animate-pulse"
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🤖 AI-Powered Analytics
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchChartsData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🤖 AI-Powered Analytics
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Intelligent insights from your asset data
          </p>
        </div>
        <button
          onClick={fetchChartsData}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          🔄 Refresh
        </button>
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
