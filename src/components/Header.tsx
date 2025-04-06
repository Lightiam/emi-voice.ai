import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2">
              e
            </div>
            <span className="text-xl font-semibold">emilist</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/expert" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Join as an Expert
            </Link>
            <Link to="/jobs/new" className="text-gray-600 hover:text-gray-900">List New Job</Link>
            <div className="relative group">
              <Link to="/explore" className="text-gray-600 hover:text-gray-900 flex items-center">
                Explore Emilist
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
            <Link to="/signup" className="text-gray-600 hover:text-gray-900">Sign up</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};