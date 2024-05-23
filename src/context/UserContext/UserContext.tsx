"use client"
import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

// Define the shape of the user object and the context value
interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userLoading: boolean
}

// Create Context for User
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    userLoading: true
});

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        console.log("The storedUser is:",storedUser);

        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            // Handle the error appropriately (e.g., clear the invalid data from localStorage)
            localStorage.removeItem('userData');
          }
        }
        setUserLoading(false);
    }, []);


    return (
       <UserContext.Provider value={{user , setUser ,userLoading}}>
            {children}
       </UserContext.Provider>
    );
};

export default UserContextProvider;