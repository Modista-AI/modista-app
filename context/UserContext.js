

// context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook for consuming user data
export const useUser = () => useContext(UserContext);

// User Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to save user data to state and local storage
  const setUserDetails = (email, token, name) => {
    const userObject = { email, token, name };

    // Check if user data is different before updating
    if (!user || user.email !== email || user.token !== token || user.name !== name) {
      setUser(userObject);

      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(userObject));
    }
  };

  // Load user data from local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};