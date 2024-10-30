// lib/getUserSession.ts
const url = `${process.env.SESSION_URL}/api/auth/session`;

const getUserSession = async () => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json(); // Return the parsed JSON response
  } catch (error) {
    console.error('Failed to fetch user session:', error);
    return null; // Return null if there's an error
  }
};

export default getUserSession;