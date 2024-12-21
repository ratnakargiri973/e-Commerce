import React, { createContext, useState, useContext, useEffect } from 'react'
import instance from '../axiosConfig';

const AuthContext = createContext(null);



function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await instance.get('/auth/validate-token', {
        withCredentials: true,
      });

      console.log(response);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  function login(){
    setIsAuthenticated(true);
  }

  function authenticate(){
    setIsAuthenticated(true);
  }

  function deAuthenticate() {
    setIsAuthenticated(false);
  }

  async function logout() {
    try {
      const response = await instance.post("/user/logout", {
        withCredentials: true,
      });

      if(response.status === 200){
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  }

  return (
   <AuthContext.Provider
     value={{
         isAuthenticated,
         loading,
         login,
         logout,
         authenticate,
         deAuthenticate,
     }}>
      {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider;

export  function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
