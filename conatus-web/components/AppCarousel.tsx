import React from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

interface AppData {
  id: string;
  name: string;
  icon: string;
  category: string;
  isConnected: boolean;
}

interface AppCarouselProps {
  apps: AppData[];
  onOpenAuthFlow: (appId: string) => void;
}

const AppCarousel: React.FC<AppCarouselProps> = ({ apps, onOpenAuthFlow }) => {
  return (
    <div className="w-full py-4">
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button className="bg-white rounded-full p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        
        <div className="overflow-x-auto hide-scrollbar px-8">
          <div className="flex space-x-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center min-w-[80px]"
              >
                <div className="relative w-14 h-14 mb-2">
                  {app.isConnected ? (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 border border-white z-10"></div>
                  ) : null}
                  <div className={`rounded-xl overflow-hidden shadow-sm ${app.isConnected ? 'bg-white' : 'bg-gray-100'}`}>
                    <Image
                      src={app.icon}
                      alt={app.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center font-medium truncate w-full">{app.name}</span>
                <button 
                  onClick={() => onOpenAuthFlow(app.id)}
                  className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                    app.isConnected 
                      ? 'bg-gray-100 text-gray-600' 
                      : 'bg-primary text-white'
                  }`}
                >
                  {app.isConnected ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button className="bg-white rounded-full p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Default apps data
export const defaultApps: AppData[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '/icons/gmail.svg',
    category: 'Communication',
    isConnected: true,
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    icon: '/icons/google-calendar.svg',
    category: 'Productivity',
    isConnected: true,
  },
  {
    id: 'drive',
    name: 'Google Drive',
    icon: '/icons/google-drive.svg',
    category: 'Storage',
    isConnected: true,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '/icons/slack.svg',
    category: 'Communication',
    isConnected: true,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '/icons/spotify.svg',
    category: 'Entertainment',
    isConnected: true,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '/icons/whatsapp.svg',
    category: 'Communication',
    isConnected: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    category: 'Professional',
    isConnected: true,
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '/icons/notion.svg',
    category: 'Productivity',
    isConnected: true,
  },
  {
    id: 'asana',
    name: 'Asana',
    icon: '/icons/asana.svg',
    category: 'Productivity',
    isConnected: false,
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '/icons/twitter.svg',
    category: 'Social Media',
    isConnected: false,
  },
];

export default AppCarousel;