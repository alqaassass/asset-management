import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function AssetStatusChart({ data, insight }) {
  const isDark = document.documentElement.classList.contains('dark');

  const COLORS = {
    in_use: isDark ? '#34D399' : '#10B981',
    active: isDark ? '#34D399' : '#10B981',
    inactive: isDark ? '#F87171' : '#EF4444',
    in_repair: isDark ? '#FBBF24' : '#F59E0B',
    maintenance: isDark ? '#FBBF24' : '#F59E0B'
  };

  const chartData = data.map(item => ({
    ...item,
    fill: COLORS[item.status] || '#8B5CF6'
  }));

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📊 Asset Status Distribution
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ status, percentage }) => `${status}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            animationDuration={1000}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
              borderRadius: '8px',
              color: isDark ? '#F9FAFB' : '#1F2937'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {insight && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
        </div>
      )}
    </div>
  );
}

export default AssetStatusChart;
