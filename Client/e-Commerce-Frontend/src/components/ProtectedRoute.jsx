import React, { useEffect } from 'react'
import { useState } from 'react'
import instance from '../axiosConfig.js';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      validateToken();
    }, [])
    async function validateToken(){
        try {
            await instance.get("auth/check");
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }
        finally{
            setIsLoading(false);
        }
    }

    if (isLoading) return <h3>Loading...</h3>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute
