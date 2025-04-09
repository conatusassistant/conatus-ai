'use client';

import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import AppCarousel, { defaultApps } from '@/components/AppCarousel';

export default function HomePage() {
  const [apps, setApps] = React.useState(defaultApps);

  const handleOpenAuthFlow = (appId: string) => {
    // In a real implementation, this would open the Composio OAuth flow
    console.log(`Opening auth flow for ${appId}`);
    
    // For demo purposes, let's toggle the connection status
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === appId ? { ...app, isConnected: !app.isConnected } : app
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold">Conatus</h1>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </header>

      {/* App Integration Carousel */}
      <div className="bg-white shadow-sm">
        <AppCarousel apps={apps} onOpenAuthFlow={handleOpenAuthFlow} />
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}