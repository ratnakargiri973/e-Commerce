import React, { useState } from 'react'
import instance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await instance.post("/user/verify-otp", {username, otp});
    setMessage(response.message || response.error);
    navigate("/change-password");
  };
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit} className='flex gap-2 justify-center items-center'>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border-none outline-none p-2 rounded'
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className='border-none outline-none p-2 rounded'
        />
        <button type="submit" className='p-2 rounded bg-blue-500 text-white'>Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default VerifyOtp
