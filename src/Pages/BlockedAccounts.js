import React, { useEffect, useState } from 'react';
import account from '../Photos/account.jpg';
import { baseurl, base_token } from '../Api/baseUrl';
import axios from 'axios';

const BlockedAccounts = () => {
  const [blockUserData, setBlockuserdata] = useState([]);

  useEffect(() => {
    getBlockUser();
  }, []);

  const getBlockUser = async () => {
    try {
      const response = await axios.get(`${baseurl}/user/get-blocked-users`, {
        headers: {
          Authorization: `Bearer ${base_token}`
        }
      });
      setBlockuserdata(response?.data?.resData?.data);
      console.log("Response::>>", response?.data?.resData?.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggle = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${baseurl}/user/block-user`,
        { user_id: id },
        config
      );
      console.log("delete-story::>>", response);
      if (response) {
        console.log(response.data);
        setBlockuserdata((prevData) => prevData.filter(user => user._id !== id));
      } else {
        console.log("api error");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='flex flex-col justify-center w-full'>
      {blockUserData.length > 0 && blockUserData.map((data, index) => (
        <div
          key={index}
          className={`flex flex-row bg-white mt-2 px-6 py-4 rounded-[20px] items-center lg:md:w-[700px] justify-between border-[0.5px] border-[#e3e2e2]`}
          style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className='flex flex-row gap-3'>
            <div className='w-[60px] h-[60px] rounded-[100%] overflow-hidden'>
              <img src={data?.profile_image} alt='Account' />
            </div>
            <div className='flex flex-col'>
              <h2 className='font-semibold text-[18px]'>{data?.full_name}</h2>
              <p className='text-[#C31A7F] text-[14px] font-[500]'>
                {data?.user_profile}
              </p>
            </div>
          </div>
          <div>
            <button
              className='rounded-[15px] bg-[#C31A7F] text-white px-3 py-2'
              onClick={() => handleToggle(data._id)}
            >
              Unblock
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockedAccounts;
