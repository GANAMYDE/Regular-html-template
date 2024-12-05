import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // for redirection

  // Fetch the user's current profile data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = supabase.auth.user();
      setUser(currentUser);
      if (currentUser) {
        setName(currentUser.user_metadata?.full_name || '');
        setUsername(currentUser.user_metadata?.username || '');
      } else {
        // Redirect to login page if no user is logged in
        navigate('/login');
      }
    };

    fetchUserData(); // Call function to load user profile
  }, [navigate]);

  // Handle profile save
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name, username },
      });

      if (error) throw error;

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setError('There was an error updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // You can show a loading message here
  }

  return (
    <StyledProfile>
      <h2>Edit Profile</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <SaveButton type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </SaveButton>
      </form>
    </StyledProfile>
  );
};

// Styled Components for Profile
const StyledProfile = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: royalblue;
  }

  input {
    border-radius: 8px;
    border: 1px solid #d1d5db;
    padding: 0.75rem 1rem;
    width: 100%;
    font-size: 1rem;
  }

  .input:focus {
    border-color: royalblue;
    outline: none;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: royalblue;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgb(56, 90, 194);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-bottom: 20px;
`;

export default Profile;
