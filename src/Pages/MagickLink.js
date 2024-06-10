import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../Api/baseUrl';
import loadingImg from '../Photos/GIF/loader.gif';

const MagickLink = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${baseurl}/user/reset-password`, {
        token,
        password,
      });

      if (response?.data?.resData.status === true) {
        navigate('/login');
      } else {
        setError("Failed to reset password");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="shadow-xl p-[30px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]">
        <h1 className="lg:text-[2vw] text-[24px] font-semibold text-[#C31A7F]">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={handlePasswordChange}
            className="border-2 rounded-[20px] p-4"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="border-2 rounded-[20px] p-4"
          />
          {error && <p className="text-red-400">{error}</p>}
          <button
            type="submit"
            className={`bg-[#C31A7F] text-white font-semibold p-3 rounded-xl ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <img src={loadingImg} alt="Loading" className="w-10" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MagickLink;
