 import React, { createContext, useContext, useState } from "react";
 import { getUserFromLocalStorage, saveUserToLocalStorage } from "../utils/localStorage";
 
 // Create the context
 export const UserContext = createContext<any>(null);
 
 // Create the provider component
 const UserProviderComponent = ({ children }: { children: React.ReactNode }) => {
   const [loggedInUser, setLoggedInUser] = useState(() => getUserFromLocalStorage());
 
   const updateLoggedInUser = (user: any) => {
     setLoggedInUser(user);
     saveUserToLocalStorage(user); // Sync with localStorage
   };
 
   return (
     <UserContext.Provider value={{ loggedInUser, setLoggedInUser: updateLoggedInUser }}>
       {children}
     </UserContext.Provider>
   );
 };
 
 // Wrap the provider with React.memo (if needed for optimization)
 export const UserProvider = React.memo(UserProviderComponent);
 
 // Hook for easy access
 export const useUser = () => useContext(UserContext);