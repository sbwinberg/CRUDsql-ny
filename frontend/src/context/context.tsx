import { createContext, useContext, useState } from 'react';

// Skapa en kontext
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsloggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Funktion för att använda kontexten
export const useAuth = () => {
  return useContext(AuthContext);
};

