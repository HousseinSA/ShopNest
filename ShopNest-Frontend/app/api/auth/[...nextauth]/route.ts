// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // Import from the new file

// Define the NextAuth API route handler
const handler = NextAuth(authOptions);

// Export the handler for each HTTP method
export { handler as GET, handler as POST };

export {authOptions}