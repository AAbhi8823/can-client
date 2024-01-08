import React, { useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import Video from '../Photos/Video.png'
import { Link, json } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import { IoKeyOutline } from 'react-icons/io5'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import Feed from '../Photos/Feed.png'
import vthree from '../Photos/vthree.gif'
// import axios from 'axios'
import { baseurl } from '../Api/baseUrl'
import logo2 from '../Photos/logo2.png'
import Craousel from '../Components/Craousel'
const LoginOTP = () => {


    const SetPassword = async () => {
        const userValue = JSON.parse(localStorage.getItem('userValue')) || {};

        userValue.password = firstpass;
        userValue.confirmPassword = firstpass1;

        localStorage.setItem('userValue', JSON.stringify(userValue));
        console.log(userValue)

    }

    const [eye, setEye] = useState()
    const [eye1, setEye1] = useState()


    //see pass
    function seePass() {
        setEye(!eye)
    }
    function seePass1() {
        setEye1(!eye1)
    }

    //final
    const [firstpass, setFirstpass] = useState('')

    function passwordChange(e) {
        setFirstpass(e.target.value)
    }

    const [firstpass1, setFirstpass1] = useState(null)

    function passwordChange1(e) {
        setFirstpass1(e.target.value)
    }

    return (
      <>
        <div className="grid flex justify-start center-1">
          <Link to="/">
            <div className="flex px-10 w-[100%]">
              <img src={logo2} className="lg:block md:block hidden" alt="" />
              <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
            </div>
          </Link>
        </div>

        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          {/* <div className='hidden lg:block w-[50%] mt-20  flex flex-col items-center justify-center  '>
                        <div className='flex flex-col gap-7 items-center justify-center '>
                          
                            <div className=''>
                      
                                <img src={Feed} className='h-[350px] w-[350px]' alt='none' />
                            </div>

                         <div className='mt-5 flex flex-col items-center justify-center  '>
                                <h1 className='text-center text-[36px] font-semibold  '>Stay up to date, and inspired</h1>
                                <p className=' font-medium text-[18px]  mt-2'>Read curated articles on the latest research, and success</p>
                                <p className='font-medium text-[18px] '>stories from our community.</p>
                            </div>

                            <div className='flex flex-row items-center gap-4 mt-3 '>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div> */}
          {/* <div className='hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   '>
                        <div className='flex flex-col items-center justify-center gap-4 '>

                            <div className=''>

                                <img src={Feed} className='w-[22vw]' alt='none' />
                            </div>

              <div className="mt-5 flex flex-col items-center justify-center  ">
                <h1 className="text-center text-[22px] lg:text-[2.34vw] font-semibold  ">
                  Stay up to date, and inspired
                </h1>
                <p className=" font-medium  lg:text-[1.16vw]  mt-2">
                  Read curated articles on the latest research, and success
                </p>
                <p className="font-medium text-12 lg:text-[1.16vw] ">
                  stories from our community.
                </p>
              </div>

                            <div className='flex flex-row items-center gap-4 mt-3 '>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        
                        </div>
                    </div> */}
          <Craousel />

          <div class=" md:w-1/2 lg:w-[35%] px-5">
            <form class="bg-white shadow-md rounded  rounded-2xl  mb-4">
              <div className="py-5">
                <img src={vthree} className="w-full" alt="none" />
              </div>

              <div className="text-center text-[1.56vw] text-11 mt-5 font-semibold  p-1  text-[#C31A7F]">
                <h1>Create your password</h1>
              </div>
              <div className="mt-6 flex flex-col ">
                <div className="border-2 lg:h-[3.27vw] h-12 mx-4 mt-3  lg:mx-8 lg:m-2 px-4 rounded-[20px] flex items-center justify-center gap-4">
                  <IoKeyOutline className="lg:text-[1vw]" />
                  <div className="font-bold bg-[#000] h-[35px]  w-[1px] inline-block text-[20px]"></div>
                  <input
                    placeholder="Enter password"
                    className="bg-transparent w-full outline-none border-0 text-[18px]  lg:text-[1.1vw] "
                    type={eye ? "text" : "password"}
                    onChange={passwordChange}
                    minLength={3}
                    value={firstpass}
                  />
                  <div onClick={seePass}>
                    {eye ? (
                      <AiOutlineEye className="lg:text-[1vw]" />
                    ) : (
                      <AiOutlineEyeInvisible className="lg:text-[1vw]" />
                    )}
                  </div>
                </div>
              </div>
              <div className="border-2 lg:h-[3.27vw] h-14 mx-4  mt-5 lg:mx-8 lg:m-2 px-4 rounded-[20px] flex items-center justify-center gap-4">
                <IoKeyOutline className="lg:text-[1vw]" />
                <div className="font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]"></div>
                <input
                  placeholder="Re-enter password"
                  className="bg-transparent w-full outline-none border-0 text-[18px] lg:text-[1.1vw] "
                  type={eye1 ? "text" : "password"}
                  onChange={passwordChange1}
                  minLength={3}
                  value={firstpass1}
                />
                <div onClick={seePass1}>
                  {eye1 ? (
                    <AiOutlineEye className="lg:text-[1vw]" />
                  ) : (
                    <AiOutlineEyeInvisible className="lg:text-[1vw]" />
                  )}
                </div>
              </div>

              {firstpass.length < 8 && (
                <div className="text-red-500 lg:text-[1vw]  text-12 text-center">
                  Your password should be greater than 8 digits.
                </div>
              )}

              <div className="flex justify-center py-10 gap-3">
                {firstpass.length >= 8 && firstpass === firstpass1 ? (
                  <Link to="/choosetitle" className="">
                    <button
                      onClick={SetPassword}
                      className=" bg-[#C31A7F] lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl text-white"
                    >
                      Continue
                    </button>
                  </Link>
                ) : (
                  <div className="">
                    <button className=" bg-[#C31A7F] lg:text-[1.1vw] px-2 text-center py-[12px] px-[60px] rounded-xl text-white opacity-60">
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* right side */}
          {/* <div className='h-[100%] mt-11 flex lg:items-center'>
                        <div className='  md:w-[660px] lg:w-[501px] lg:mr-[140px]  sm:w-[100%] py-[50px] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <img src={vthree}  className='object-contain rounded-[20px]' alt='none' />
                            </div>
                            <div className='text-center lg:text-3xl text-[24px] mt-5 font-semibold  p-1  text-[#C31A7F]'>
                                <h1>Create your password</h1>
                            </div>

                            <div className='mt-6 flex flex-col gap-3'>
                                <div className='border-2 lg:h-14 h-12 mx-4 mt-3  lg:mx-8 lg:m-2 px-4 rounded-[20px] flex items-center justify-center gap-4'>
                                    <IoKeyOutline />
                                    <div className='font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    <input placeholder='Enter password'
                                        className='bg-transparent w-full outline-none'
                                        type={eye ? 'text' : 'password'}
                                        onChange={passwordChange}
                                        minLength={3}
                                        value={firstpass}
                                    />
                                    <div onClick={seePass}>
                                        {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </div>
                                </div>
                                <div className='border-2 lg:h-14 h-12 mx-4  lg:mx-8 lg:m-2 px-4 rounded-[20px] flex items-center justify-center gap-4'>
                                    <IoKeyOutline />
                                    <div className='font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    <input placeholder='Re-enter password'
                                        className='bg-transparent w-full outline-none'
                                        type={eye1 ? 'text' : 'password'}
                                        onChange={passwordChange1}
                                        minLength={3}
                                        value={firstpass1}
                                    />
                                    <div onClick={seePass1}>
                                        {eye1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                    </div>
                                </div>

                                {firstpass.length < 8 && (
                                    <div className='text-red-500 text-sm text-center'>
                                        Your password should be greater than 8 digits.
                                    </div>
                                )}

                            </div>

                            <div className='flex justify-center py-6'>

                                


                                {firstpass.length >= 8 && (firstpass) === (firstpass1) ?
                                    (<Link to='/choosetitle' className='w-[40%]' onClick={SetPassword}>
                                        <h2 className='bg-[#C31A7F] cursor-pointer  text-center p-3 rounded-lg text-white'>Continue</h2>
                                    </Link>)
                                    :
                                    (<div className='w-[40%]'>
                                        <h2 className='bg-[#C31A7F] opacity-50  text-center p-3 rounded-lg text-white'>Continue</h2>
                                    </div>)
                                }
                            </div>



                        </div>
                    </div> */}
        </div>
      </>
    );
}


export default LoginOTP