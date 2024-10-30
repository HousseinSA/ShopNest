// lib/getUserSession.ts

const getUserSession = async () => {

    const url = `https://shopnest-frontend.vercel.app/api/auth/session`; // Use environment variable for flexibility
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Ensures cookies are included for cross-domain requests
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }

      const sessionData = await response.json();
      return sessionData.user ; // Return session data to the caller
    } catch (error) {
      console.error('Error fetching session:', error);
      return null; // Return null on error
    }
  };
  
  export default getUserSession;
  