import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import LogoutButton from './LogoutButton';

function Layout({ onLogout }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <span className="text-white text-xl">📦</span>
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">IT Asset Manager</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Manage your assets efficiently</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
                <Link
                  to="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/assets"
                  className={`${
                    isActive('/assets')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Assets
                </Link>
                <Link
                  to="/scan"
                  className={`${
                    isActive('/scan')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Scan
                </Link>
                <Link
                  to="/asset-types"
                  className={`${
                    isActive('/asset-types')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Types
                </Link>
                <Link
                  to="/employees"
                  className={`${
                    isActive('/employees')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Users
                </Link>
                <Link
                  to="/vendors"
                  className={`${
                    isActive('/vendors')
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30'
                  } inline-flex items-center px-3 pt-1 border-b-2 text-xs lg:text-sm font-medium transition-all duration-200 rounded-t-lg`}
                >
                  Vendors
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DarkModeToggle />
              <div className="hidden sm:block">
                <LogoutButton onClick={onLogout} />
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/dashboard')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/assets"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/assets')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Assets
              </Link>
              <Link
                to="/scan"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/scan')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Scan QR
              </Link>
              <Link
                to="/asset-types"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/asset-types')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Asset Types
              </Link>
              <Link
                to="/employees"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/employees')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Employees
              </Link>
              <Link
                to="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  isActive('/vendors')
                    ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 dark:hover:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200`}
              >
                Vendors
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
