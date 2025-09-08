import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="search-gradient rounded-2xl p-1 shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for notes, subjects, or authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500 text-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute -right-2 -top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;