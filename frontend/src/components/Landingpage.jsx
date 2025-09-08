import React from 'react';

const LandingPage = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">📚</span>
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              ScholarSync
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={onShowAuth}
              className="px-6 py-2.5 text-blue-700 bg-white/95 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-medium border border-white/20"
            >
              Login
            </button>
            <button 
              onClick={onShowAuth}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Share & Discover
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
              Amazing Notes
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with students worldwide. Share your knowledge, discover incredible notes, 
            and build a community of learners that grows stronger every day.
          </p>
          <button 
            onClick={onShowAuth}
            className="px-10 py-4 bg-gradient-to-r from-white to-blue-50 text-blue-800 rounded-2xl text-lg font-semibold hover:from-blue-50 hover:to-white transition-all duration-300 shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1 border border-white/20"
          >
            Get Started Free
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="group bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:-translate-y-2">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-800 transition-colors">
              Smart Search
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Find exactly what you need with our AI-powered search engine that understands context and topics
            </p>
            <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          
          <div className="group bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:-translate-y-2">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">❤️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-800 transition-colors">
              Community Driven
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Like, comment, and engage with notes from fellow students in a supportive learning environment
            </p>
            <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          
          <div className="group bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:-translate-y-2">
            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-800 transition-colors">
              Easy Sharing
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Upload and share your notes instantly with drag-and-drop simplicity and automatic formatting
            </p>
            <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-blue-200 text-sm">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-blue-200 text-sm">Notes Shared</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
            <div className="text-blue-200 text-sm">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-200 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-white/5">
          <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;