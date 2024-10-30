// lib/getUserSession.ts

const getUserSession = async () => {
  const url = `https://shopnest-frontend.vercel.app/api/auth/session`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure you fetch a fresh response
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }

    const sessionData = await response.json();
    console.log('Session Data:', sessionData);
    return sessionData;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
};

export default getUserSession;
