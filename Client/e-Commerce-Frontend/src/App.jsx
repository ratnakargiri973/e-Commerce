import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import First from './pages/First';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSeller from './pages/RegisterSeller';
import VerifyEmail from './pages/VerifyEmail';
import AuthProvider from './contexts/auth';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <First />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/register-seller',
          element: <RegisterSeller />
        },
        {
          path: '/verify-email',
          element: <VerifyEmail />
        },
        {
          path: "/add-product",
          element: (
            <ProtectedRoute>
                 <AddProduct />
            </ProtectedRoute>
          )
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
                 <Profile />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])
  return (
    <AuthProvider>
         <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  )
}

export default App
