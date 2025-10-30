import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function AssetAssignmentChart({ data, insight }) {
  const isDark = document.documentElement.classList.contains('dark');

  const COLORS = {
    Assigned: isDark ? '#60A5FA' : '#3B82F6',
    Unassigned: isDark ? '#FBBF24' : '#F59E0B',
    Shared: isDark ? '#A78BFA' : '#8B5CF6'
  };

  const chartData = data.map(item => ({
    ...item,
    count: parseInt(item.count),
    fill: COLORS[item.category] || '#8B5CF6'
  }));

  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        👥 Asset Assignment
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
            label={({ category, percentage }) => `${category}: ${percentage}%`}
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
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold fill-gray-900 dark:fill-white"
          >
            {totalCount}
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs fill-gray-600 dark:fill-gray-400"
          >
            Total Assets
          </text>
        </PieChart>
      </ResponsiveContainer>
      
      {insight && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
        </div>
      )}
    </div>
  );
}

export default AssetAssignmentChart;
