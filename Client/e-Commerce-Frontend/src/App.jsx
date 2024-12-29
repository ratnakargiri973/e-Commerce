import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import First from './pages/First';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSeller from './pages/RegisterSeller';
import VerifyEmail from './pages/VerifyEmail';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import CartProvider from './contexts/CartProvider';
import CreateCoupons from './pages/CreateCoupons';
import MyCoupons from './pages/MyCoupons';
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import { AuthProvider } from './contexts/Auth.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import VerifyOtp from './components/VerifyOtp.jsx';
import Changepassword from './components/Changepassword.jsx';

function AppWrapper(){
  return (
    <CartProvider>
      <First />
    </CartProvider>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppWrapper />,
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
          path: "/forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "/verify-otp",
          element: <VerifyOtp />
        },
        {
          path: "/change-password",
          element: <Changepassword />
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
        },
        {
          path: "/product/:id",
          element: <SingleProduct />
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          )
        },
        {
          path: "/my-coupons",
          element: (
            <ProtectedRoute>
              <MyCoupons />
            </ProtectedRoute>
          )
        },
        {
          path: "/my-coupons/add",
          element: (
            <ProtectedRoute>
              <CreateCoupons />
            </ProtectedRoute>
          )
        },
        {
          path: "/blogs",
          element: <Blogs />
        },
        {
          path: "/blogs/add",
          element: (
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])
  return (
    <AuthProvider>
         <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
