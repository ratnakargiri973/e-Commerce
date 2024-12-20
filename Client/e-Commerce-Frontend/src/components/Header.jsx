import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='flex justify-between items-center px-8 bg-zinc-700 text-white py-4 z-10'>
    <h1  className='font-bold text-3xl'>
     <Link to="/">
         E-Commerce
     </Link>
    </h1>

    <ul className='flex flex-row justify-center items-center gap-3'>
      <li className='flex justify-center align-center gap-3'>
         <Link to="/contact" className='hover:text-gray-300'>Contact Us</Link>
      </li>

      <li className='flex justify-center align-center gap-3'>
         <Link to="/login" className='hover:text-gray-300'>Sign In</Link>
      </li>

      <li className='flex justify-center align-center gap-3'>
         <Link to="/register-seller" className='hover:text-gray-300'>Register as a seller</Link>
      </li>
    </ul>
 </header>
  )
}

export default Header
