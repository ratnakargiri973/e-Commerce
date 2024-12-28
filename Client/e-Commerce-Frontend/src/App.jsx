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
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import CartProvider from './contexts/CartProvider';
import CreateCoupons from './pages/CreateCoupons';
import MyCoupons from './pages/MyCoupons';

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
