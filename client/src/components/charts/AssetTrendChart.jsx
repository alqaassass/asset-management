import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AssetTrendChart({ data, insight }) {
  const isDark = document.documentElement.classList.contains('dark');

  const colors = {
    line: isDark ? '#60A5FA' : '#3B82F6',
    grid: isDark ? '#374151' : '#E5E7EB',
    text: isDark ? '#F9FAFB' : '#1F2937'
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📈 Asset Acquisition Trend
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="month" 
            stroke={colors.text}
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke={colors.text}
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${colors.grid}`,
              borderRadius: '8px',
              color: colors.text
            }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke={colors.line}
            strokeWidth={3}
            dot={{ fill: colors.line, r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {insight && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
        </div>
      )}
    </div>
  );
}

export default AssetTrendChart;
