import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Checkbox from '../components/Checkbox';
import Profile from './Profile';
import CardComponent from '../components/Card';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// Navigation Items
const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
];

// Reusable Section Component
const Section = ({ id, title, children }) => (
  <section id={id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ imageSrc, title, description }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card className="shadow-lg h-100 rounded-lg">
      <Card.Img
        variant="top"
        src={imageSrc}
        alt={title}
        loading="lazy"
        onError={(e) => (e.target.src = '/img/placeholder.png')} // Fallback Image
      />
      <Card.Body>
        <Card.Title className="text-lg font-bold">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="success" className="transition duration-300 hover:bg-teal-600">
          Learn More
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

// Main Dashboard Component
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [preBuiltNotifications] = useState([
    { id: 1, name: 'Jane Doe', fileName: 'Web Design', time: '2 hours ago' },
    { id: 2, name: 'John Smith', fileName: 'App Mockup', time: '5 hours ago' },
    { id: 3, name: 'Sara Lee', fileName: 'Marketing Strategy', time: '1 day ago' },
  ]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Notifications from Supabase
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoadingNotifications(true);
        const { data, error } = await supabase
          .from('notifications')
          .select('*');
        if (error) throw error;
        setNotifications(data || []);
      } catch (err) {
        console.error('Error fetching notifications:', err.message);
        setError('Failed to fetch notifications. Please try again.');
      } finally {
        setLoadingNotifications(false);
      }
    };

    fetchNotifications();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    navigate('/');
  };

  // Navigate to Settings Page
  const handleNavigateToSettings = () => navigate('/settings');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
        <span className="text-2xl font-bold">Welcome to Your Dashboard</span>
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search Dashboard"
          className="px-4 py-2 text-gray-800 rounded-lg"
        />
        <Checkbox onChange={setMenuOpen} />
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="p-4 lg:hidden">
          <ul>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveSection(id);
                    setMenuOpen(false);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 block"
                >
                  {label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="text-indigo-600 hover:text-indigo-800 block"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Main Content */}
      <main className="p-6">
        {activeSection === 'overview' && (
          <div className="px-6 py-12 bg-white">
            <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold text-indigo-600">Effortless Project Management</h1>
                <p className="mt-4 text-gray-600">
                  Streamlined deployments with intuitive tools for rapid project delivery.
                </p>
              </div>
              <Row>
                <FeatureCard
                  imageSrc="/img/push-to-deploy.png"
                  title="Push to Deploy"
                  description="Deploy your projects effortlessly with just a click."
                />
                <FeatureCard
                  imageSrc="/img/ssl-certificates.png"
                  title="SSL Certificates"
                  description="Protect your data with automatic SSL certificates for secure connections."
                />
                <FeatureCard
                  imageSrc="/img/database-backups.png"
                  title="Database Backups"
                  description="Automatic database backups to ensure data security and reliability."
                />
              </Row>
            </div>
          </div>
        )}

        {activeSection === 'profile' && <Profile />}
        {activeSection === 'settings' && (
          <Section id="settings" title="Settings">
            <p>Customize your account and app settings for optimal performance.</p>
          </Section>
        )}

        {/* Notifications Section */}
        <Section id="notifications" title="Notifications">
          {loadingNotifications ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-600">
              <p>{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : notifications.length > 0 || preBuiltNotifications.length > 0 ? (
            <>
              {preBuiltNotifications.map(({ id, name, fileName, time }) => (
                <CardComponent key={id} name={name} fileName={fileName} time={time} />
              ))}
              {notifications.map(({ id, name, fileName, time }) => (
                <CardComponent key={id} name={name} fileName={fileName} time={time} />
              ))}
            </>
          ) : (
            <p>No notifications available at the moment.</p>
          )}
        </Section>

        {/* Call-to-Action */}
        <div className="mt-8">
          <button
            onClick={handleNavigateToSettings}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition"
          >
            <span>Manage Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
