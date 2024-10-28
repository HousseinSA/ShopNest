'use client'
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Fetch the session from your API
        const response = await fetch('https://shopnest-frontend.vercel.app/api/auth/session', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use the token from localStorage
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        } else {
          console.error('Failed to fetch session:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
      }
    };

    fetchSession();
  }, []);

  return session

};

export default Dashboard;
