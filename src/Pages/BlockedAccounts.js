import React, { useState } from 'react';
import account from '../Photos/account.jpg';

const BlockedAccounts = () => {
  const [divData, setDivData] = useState([
    {
      id: 1,
      name: 'Ananaya Nagpal',
      role: 'Caregiver',
      image: account,
      isVisible: true, // Set initial visibility state for this div
    },
    {
      id: 2,
      name: 'Another Person',
      role: 'Role Name',
      image: account,
      isVisible: true,
    },
    {
        id: 3,
        name: 'Another Person',
        role: 'Role Name',
        image: account,
        isVisible: true,
      },
      {
        id: 4,
        name: 'mukesh',
        role: 'Role Name',
        image: account,
        isVisible: true,
      },
    // Add more data objects for each div as needed
  ]);

  const handleToggle = (id) => {
    setDivData((prevDivData) =>
      prevDivData.map((data) =>
        data.id === id ? { ...data, isVisible: false } : data
      )
    );
  };

  return (
    <div className='flex flex-col   justify-center w-full'>
      {divData.map((data) => (
        data.isVisible && (
          <div
            key={data.id}
            className={`flex flex-row bg-white mt-2  px-6 py-4 rounded-[20px] items-center lg:md:w-[700px] justify-between border-[0.5px] border-[#e3e2e2]`}
            style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)' }}
          >
            <div className='flex flex-row gap-3 '>
              <div className='w-[60px] h-[60px] rounded-[100%] overflow-hidden'>
                <img src={data.image} alt='Account' />
              </div>
              <div className='flex flex-col'>
                <h2 className='font-semibold text-[18px]'>{data.name}</h2>
                <p className='  text-[#C31A7F] text-[14px] font-[500]'>
                  {data.role}
                </p>
              </div>
            </div>
            <div>
              <button
                className='rounded-[15px] bg-[#C31A7F] text-white px-3 py-2'
                onClick={() => handleToggle(data.id)}
              >
                Unblock
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default BlockedAccounts;
