import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

interface FeedItem {
  id: number;
  platform: string;
  title: string;
  body: string;
  link: string | null;
  popularity: number;
  timestamp: string | null;
  author?: string;
  authorImage?: string;
}

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  const iconMap: Record<string, string> = {
    twitter: '/icons/twitter.svg',
    reddit: '/icons/reddit.svg',
    twitch: '/icons/twitch.svg',
    news: '/icons/news.svg',
    slack: '/icons/slack.svg',
    default: '/icons/default.svg',
  };

  const iconSrc = iconMap[platform.toLowerCase()] || iconMap.default;

  return (
    <div className="w-6 h-6 rounded-full overflow-hidden">
      <Image
        src={iconSrc}
        alt={platform}
        width={24}
        height={24}
        className="object-cover"
      />
    </div>
  );
};

const SocialFeed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFeedItems();
  }, []);

  const fetchFeedItems = async () => {
    try {
      setIsLoading(true);

      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('No authenticated user');
        setIsLoading(false);
        return;
      }

      // Fetch feed items from Supabase
      const { data, error } = await supabase
        .from('feed_items')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching feed items:', error);
      } else {
        setFeedItems(data || []);
      }
    } catch (error) {
      console.error('Error in fetchFeedItems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilter = (platform: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(platform)) {
        return prev.filter((p) => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else {
      return `${diffDays}d`;
    }
  };

  const filteredItems = feedItems.filter((item) => {
    // Apply platform filters if any are active
    if (activeFilters.length > 0 && !activeFilters.includes(item.platform)) {
      return false;
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.body.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Search bar */}
      <div className="sticky top-0 bg-gray-50 z-10 p-4 shadow-sm">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-white rounded-full pl-10 pr-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search in social feed..."
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

        {/* Platform filters */}
        <div className="flex space-x-2 overflow-x-auto py-2 hide-scrollbar">
          {['Twitter', 'Reddit', 'Twitch', 'News'].map((platform) => (
            <button
              key={platform}
              className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilters.includes(platform)
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
              onClick={() => toggleFilter(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Feed content */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="loader"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No feed items found. Try adjusting your filters or connect more applications.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="p-4 bg-white">
              {/* Platform and timestamp */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <PlatformIcon platform={item.platform} />
                  <span className="text-sm font-medium">{item.platform}</span>
                  {item.author && <span className="text-gray-500 text-sm">• @{item.author}</span>}
                </div>
                <span className="text-xs text-gray-500">{formatTimestamp(item.timestamp)}</span>
              </div>

              {/* Content */}
              <div className="mb-3">
                {item.title && <h3 className="font-bold mb-1">{item.title}</h3>}
                <p className="text-sm text-gray-700">{item.body}</p>
              </div>

              {/* Media (if present) */}
              {item.link && item.link.match(/\.(jpeg|jpg|gif|png)$/i) && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={item.link}
                    alt="Post media"
                    width={400}
                    height={300}
                    className="object-cover w-full h-auto"
                  />
                </div>
              )}

              {/* Interactions */}
              <div className="flex justify-between text-gray-500 text-sm">
                <button className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{item.popularity || 0}</span>
                </button>

                <button className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>Reply</span>
                </button>

                <button className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialFeed;