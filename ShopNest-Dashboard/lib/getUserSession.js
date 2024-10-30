// lib/getUserSession.ts

const getUserSession = async (req) => {
  const url = `https://shopnest-frontend.vercel.app/api/auth/session`;

  try {
    const fetchOptions = {
      method: 'GET',
      credentials: 'include' , // Cast to RequestCredentials
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // If running on the server, include cookies from the request
    if (req) {
      const cookieHeader = req.headers.get('cookie');
      if (cookieHeader) {
        fetchOptions.headers['Cookie'] = cookieHeader;
      }
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }

    const sessionData = await response.json();
    console.log('Session Data:', sessionData); // Log session data for debugging
    return sessionData; // Return session data to the caller
  } catch (error) {
    console.error('Error fetching session:', error);
    return null; // Return null on error
  }
};

export default getUserSession;
