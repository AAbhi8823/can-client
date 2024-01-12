import React, { useRef, useState, useEffect } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import vibird1 from '../Photos/vibird1.gif'
import { AiOutlineMail } from 'react-icons/ai'
import { BsGenderAmbiguous, BsStackOverflow } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { SlCalender } from 'react-icons/sl'
import { NavLink } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import c4 from '../Photos/c4.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { Signup } from '../Api/HandleApi'
import axios from 'axios'
// import { baseurl } from '../Api/baseUrl'
// import LoginOTP from './LoginOTP'
// import './Register.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';


const AdminLogin = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('');
  const [check, setcheck] = useState(false)

  function handleCheckChange(e) {
    setcheck(!check)
  }


  const handleEmailChange = (event) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);

    // Regular expression patterns to check if entered text is in email or mobile number format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/; // Assuming a 10-digit mobile number format

    if (!emailPattern.test(enteredValue) && !mobilePattern.test(enteredValue)) {
      setError('(Invalid Email or Mobile Number)');
    } else {
      setError('');
    }
  };

  const handleClick = () => {
    navigate('/AdminContent')
  }

  return (

    <>
      {/* right side */}
      <div className='h-[100vh] justify-center flex lg:items-center '>
        <form className=' md:w-[660px] lg:w-[501px] sm:w-[100%] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]'
        >
          <div className='text-center pt-0 lg:text-[30px] text-[24px]  font-semibold p-2   text-[#C31A7F]'>
            <div className='flex justify-center' >
              <img src={LogoCAn} alt='not found' className='w-[80px] h-[80px]' />
            </div>
            <h1>Admin Login</h1>
          </div>

          <div className='p-4 mx-5'>
            <div className='border-2 lg:h-12 h-12  mt-3   px-2 rounded-[20px] flex items-center '>
              <h1 className='font-bold flex items-center w-max h-full px-3 '>< AiOutlineUser size={20} /></h1>
              <div className='bg-[#000] h-[35px] w-[0.5px]  text-[20px]'></div>
              <input placeholder='Enter Email' className='border-none w-full bg-transparent placeholder: outline-none px-2'
                value={email}
                onChange={handleEmailChange} />
              <div className='text-red-400 lg:text-xs text-[10px]  lg:w-[50%] '>{error && <p>{error}</p>}</div>
            </div>
          </div>

          <div className='p-4 mx-5'>
            <div className='border-2 lg:h-12 h-12  mt-1   px-2 rounded-[20px] flex items-center justify-center '>
              <h1 className='font-bold flex items-center w-max h-full px-3 '><AiOutlineLock size={20} /></h1>
              <div className='    bg-[#000] h-[35px] w-[0.5px]  text-[20px]'></div>
              <input placeholder='Enter Password' className='border-none w-full bg-transparent placeholder: outline-none px-2'
              />
            </div>
          </div>
          <div className='flex justify-center lg:py-3 p-[10px]'
          >
            {/* 
                                {
                                    Username && email && startDate && check ? (<button onClick={handleRegistration} className=' bg-[#C31A7F] text-center py-[12px] px-[60px] rounded-xl text-white' type='submit'>Continue</button>) : (<button className=' bg-[#C31A7F] opacity-50 text-center py-[12px] px-[60px] rounded-xl text-white'>Continue</button>)
                                } */}

            <button onClick={handleClick} className=' bg-[#C31A7F] text-center py-[12px] px-[60px] rounded-xl text-white' type='submit'>Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}


export default AdminLogin