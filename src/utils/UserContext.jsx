import React, { createContext, useState } from "react";

// Create UserContext
export const UserContext = createContext();

// Create UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state for user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
