'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for internal navigation

const Overview = () => {
  const [user, setUser] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Add state for error handling
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state on new fetch attempt

        // Fetch user data
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        setUser(userData.user);

        // Simulated API call for recent activities
        const activities = [
          { id: 1, action: 'Updated profile details', timestamp: '2 hours ago' },
          { id: 2, action: 'Uploaded a new profile picture', timestamp: '1 day ago' },
          { id: 3, action: 'Changed account password', timestamp: '3 days ago' },
        ];
        setRecentActivities(activities);

      } catch (error) {
        setError(error.message); // Set error message if fetching data fails
        console.error('Error fetching overview data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  // Navigate to settings page
  const handleNavigateToSettings = () => {
    navigate('/settings');  // Using React Router for navigation
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Display Error if any */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* User Profile Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        ) : (
          user && (
            <div className="flex items-center space-x-6">
              <img
                src={user.user_metadata?.profile_image || '/images/default-avatar.png'}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-indigo-600 object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{user.user_metadata?.full_name || 'User'}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ) : recentActivities.length > 0 ? (
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between border-b pb-2 last:border-none"
              >
                <p className="text-gray-700">{activity.action}</p>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent activities to display.</p>
        )}
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-8">
        <button
          onClick={handleNavigateToSettings}  // Use handle function to navigate
          className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition"
        >
          <span>Manage Settings</span>
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Overview;
