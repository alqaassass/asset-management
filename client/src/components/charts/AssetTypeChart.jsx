import { useState, useEffect } from 'react';
import api from '../../api/axios';

function AssetTypeChart({ data, insight }) {
  const [allAssets, setAllAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAssets();
  }, []);

  const fetchAllAssets = async () => {
    try {
      const response = await api.get('/assets');
      setAllAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group assets by type
  const assetsByType = allAssets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {});

  const getTypeIcon = (type) => {
    const icons = {
      'Laptop': '💻',
      'Desktop': '🖥️',
      'Monitor': '🖨️',
      'Printer': '🖨️',
      'Phone': '📱',
      'Tablet': '📱',
      'Mouse': '🖱️',
      'Keyboard': '⌨️',
      'Server': '🖥️',
      'Router': '📡',
      'Switch': '🔌',
      'Scanner': '📠',
      'Projector': '📽️',
      'Webcam': '📷',
      'Headset': '🎧',
      'Docking Station': '🔌',
      'Storage': '💾',
      'Peripherals': '🔌'
    };
    return icons[type] || '📦';
  };

  const getGradientColor = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-teal-500 to-green-500',
      'from-violet-500 to-purple-500',
      'from-cyan-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  // Sort data by count descending
  const sortedData = [...data].sort((a, b) => parseInt(b.count) - parseInt(a.count));
  const maxCount = sortedData[0]?.count || 1;

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        🏷️ Assets by Type
      </h3>
      
      {/* Modern Card-Based Design */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {sortedData.map((item, index) => {
          const percentage = (parseInt(item.count) / maxCount) * 100;
          const assets = assetsByType[item.type] || [];
          
          return (
            <div key={item.type} className="group">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-4 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center text-2xl shadow-md`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-base">{item.type}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.count} assets • {item.percentage}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {item.count}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getGradientColor(index)} transition-all duration-1000`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                {/* Asset Names */}
                {loading ? (
                  <div className="text-center py-2">
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  </div>
                ) : assets.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {assets.map((asset) => (
                      <span
                        key={asset.id}
                        className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
                        title={`${asset.serial_number} - ${asset.status} ${asset.assigned_to ? `- ${asset.assigned_to}` : ''}`}
                      >
                        {asset.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {insight && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
        </div>
      )}
    </div>
  );
}

export default AssetTypeChart;
