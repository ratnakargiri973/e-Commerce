import React from 'react'
import instance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await instance.post('/user/forgot-password', username);
      setMessage(response.message || response.error);
      navigate('/verify-otp');
    };
    
  return (
    <div>
       <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  )
}

export default ForgotPassword
