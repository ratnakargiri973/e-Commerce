import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function First() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-start bg-zinc-300 h-96">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default First;
