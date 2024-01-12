import React, { useState } from 'react';
import { IoKeyOutline } from 'react-icons/io5';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const SetPassword = () => {
  const eye1 = false;
  const eye2 = false;
  const eye3 = false;

  const [firstpass1, setFirstpass1] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const passwordChange1 = (e) => {
    setFirstpass1(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmNewPass = (e) => {

    setConfirmNewPass(e.target.value);
    setPasswordsMatch(newPass === e.target.value);
  };

  return (
    <div className='flex flex-col bg-white px-20 py-8 rounded-[20px] gap-3 lg:md:w-[700px] border-[0.5px] border-[#e3e2e2]' style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)' }}>
      <div className='flex items-center gap-4  px-3 p-2 border-2 rounded-[20px]'>
        <IoKeyOutline />
        <div className='font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
        <input
          placeholder='Current Password'
          className='bg-transparent w-full outline-none'
          type={eye1 ? 'text' : 'password'}
          onChange={passwordChange1}
          minLength={3}
          value={firstpass1}
        />
      </div>
      <div className='text-[#3C37FF] flex text-[12px] font-[400] -mt-2 justify-end cursor-pointer'><a href='/ForgotPassword'>Forgot Password?</a></div>
      <div className='flex items-center gap-4  px-3 p-2 border-2 rounded-[20px]'>
        <IoKeyOutline />
        <div className='font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
        <input
          placeholder='New Password'
          className='bg-transparent w-full outline-none'
          type={eye2 ? 'text' : 'password'}
          onChange={handleNewPass}
          minLength={3}
          value={newPass}
        />
      </div>
      <div className='flex items-center gap-4  px-3 p-2 border-2 rounded-[20px]'>
        <IoKeyOutline />
        <div className='font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
        <input
          placeholder='Re-enter Password'
          className='bg-transparent w-full outline-none'
          type={eye3 ? 'text' : 'password'}
          onChange={handleConfirmNewPass}
          minLength={3}
          value={confirmNewPass}
        />
      </div>
      {!passwordsMatch && confirmNewPass.length >= newPass.length && (
        <div className='text-red-500 text-[12px]'>Passwords don't match</div>
      )}
      <label htmlFor="signout" className='text-[#7C7C7C]'>
        <input type='checkbox' id="signout" className='text-[#7C7C7C] rounded-[10px]] mr-4' />Sign out of all devices
      </label>
      <div className='flex flex-row  pt-5 gap-2 justify-end'>
        <button className='text-center py-[6px] px-5 rounded-xl text-[#7C7C7C] border-2'>Cancel</button>
        {(newPass===confirmNewPass) ?
                                    (
                                        <button className='bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white' >Save</button>
                                    )
                                    :
                                    ( 
                                        <button className='bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white opacity-50 '>Save</button>
                                        
                                         
                                    )}
        {/* Add your logic for handling the save button */}
      </div>
    </div>
  );
};

export default SetPassword;
