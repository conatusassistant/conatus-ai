'use client';

import React, { useState, useEffect } from 'react';
import { defaultApps } from '@/components/AppCarousel';
import { supabase } from '@/lib/supabaseClient';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'automation', name: 'Automation' },
  { id: 'business', name: 'Business' },
  { id: 'communication', name: 'Communication' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'social', name: 'Social Media' },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [apps, setApps] = useState(defaultApps);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // In a real app, we would fetch integrations from Supabase
  useEffect(() => {
    // Simulate fetching data
    const fetchIntegrations = async () => {
      try {
        // This would be replaced with a real Supabase query
        console.log('Fetching integrations from Supabase...');
        
        // For demo, we're using the defaultApps
        setApps(defaultApps);
      } catch (error) {
        console.error('Error fetching integrations:', error);
      }
    };

    fetchIntegrations();
  }, []);

  const handleConnectApp = async (appId: string) => {
    // In a real app, this would initiate the Composio OAuth flow
    console.log(`Connecting app with ID: ${appId}`);
    
    // For demo purposes, toggle the connection status
    setApps(prevApps => 
      prevApps.map(app => 
        app.id === appId ? { ...app, isConnected: !app.isConnected } : app
      )
    );
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || app.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold">Library</h1>
        <p className="text-sm text-gray-500">Connect your favorite apps</p>
      </header>

      {/* Search Bar */}
      <div className="p-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Find your favorite apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white shadow-sm mb-4">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 p-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-end px-4 mb-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            className={`px-3 py-2 ${
              viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`px-3 py-2 ${
              viewMode === 'list' ? 'bg-gray-100' : 'bg-white'
            }`}
            onClick={() => setViewMode('list')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Apps Grid/List */}
      <div className="px-4 pb-4">
        {filteredApps.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-500">No apps found. Try adjusting your search.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-center mb-3">
                    <div className="relative w-16 h-16">
                      {app.isConnected && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 border border-white z-10"></div>
                      )}
                      <div className={`rounded-xl overflow-hidden shadow-sm ${app.isConnected ? 'bg-white' : 'bg-gray-100'} w-16 h-16 flex items-center justify-center`}>
                        {/* App icon would be here */}
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                          {app.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{app.category}</p>
                    <button
                      onClick={() => handleConnectApp(app.id)}
                      className={`w-full rounded-lg py-2 text-sm font-medium ${
                        app.isConnected
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {app.isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 flex items-center">
                  <div className="relative w-12 h-12 mr-4">
                    {app.isConnected && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-2 h-2 border border-white z-10"></div>
                    )}
                    <div className={`rounded-xl overflow-hidden ${app.isConnected ? 'bg-white' : 'bg-gray-100'} w-12 h-12 flex items-center justify-center`}>
                      {/* App icon would be here */}
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                        {app.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-xs text-gray-500">{app.category}</p>
                  </div>
                  <button
                    onClick={() => handleConnectApp(app.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      app.isConnected
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {app.isConnected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}