import { createContext, useState, useEffect, useContext } from 'react';

// Create the user context
export const UserContext = createContext();

// Context provider to wrap your application
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if there is a user object stored in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser); // Parse and return the user data from localStorage
    }
    return {
      role: "basic", // Default value
      name: "",
      email: "",
      id: 0,
    };
  });

  // UseEffect to update localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Save the user data to localStorage
    }
  }, [user]); // Run this effect whenever the user changes

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
// Hook to access the user context
export function useUser() {
  return useContext(UserContext);
}