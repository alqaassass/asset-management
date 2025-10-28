import { useState, useEffect } from 'react';
import api from '../api/axios';

function NewsTicker() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 5000); // Change news every 5 seconds
      return () => clearInterval(interval);
    }
  }, [news.length]);

  const fetchNews = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      const stats = response.data;
      
      // Generate news based on current stats
      const newsItems = [];
      
      if (stats.overview.in_repair > 0) {
        newsItems.push({
          id: 'repair_alert',
          type: 'warning',
          icon: '⚠️',
          text: `${stats.overview.in_repair} asset${stats.overview.in_repair > 1 ? 's' : ''} currently in repair - Check maintenance schedule`
        });
      }
      
      if (stats.overview.recentlyAdded > 0) {
        newsItems.push({
          id: 'new_assets',
          type: 'info',
          icon: '📦',
          text: `${stats.overview.recentlyAdded} new asset${stats.overview.recentlyAdded > 1 ? 's' : ''} added this month - Update inventory records`
        });
      }
      
      newsItems.push({
        id: 'total_assets',
        type: 'success',
        icon: '📊',
        text: `Total ${stats.overview.total} assets managed - ${stats.overview.in_use} currently in use`
      });
      
      if (stats.topEmployees && stats.topEmployees.length > 0) {
        newsItems.push({
          id: 'top_user',
          type: 'info',
          icon: '👤',
          text: `${stats.topEmployees[0].name} has the most assigned assets (${stats.topEmployees[0].assetCount})`
        });
      }
      
      newsItems.push({
        id: 'system_status',
        type: 'success',
        icon: '✅',
        text: 'System running smoothly - All services operational'
      });
      
      setNews(newsItems);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([{
        id: 'error',
        type: 'error',
        icon: '❌',
        text: 'Unable to fetch latest updates - Check connection'
      }]);
    }
  };

  const getNewsColor = (type) => {
    switch (type) {
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'error':
        return 'from-red-500 to-pink-500';
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'info':
      default:
        return 'from-blue-500 to-indigo-500';
    }
  };

  if (!isVisible || news.length === 0) return null;

  const currentNews = news[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <div className={`bg-gradient-to-r ${getNewsColor(currentNews.type)} rounded-lg shadow-lg p-4 text-white transform transition-all duration-500 hover:scale-105`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-bounce">{currentNews.icon}</span>
            <div>
              <p className="text-sm font-medium opacity-90">Asset Management News</p>
              <p className="text-lg font-semibold">{currentNews.text}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* News indicator dots */}
            <div className="flex space-x-1">
              {news.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200 transition-colors ml-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-white bg-opacity-20 rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all duration-5000 ease-linear"
            style={{
              width: '100%',
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default NewsTicker;