import React from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import { NavLink } from 'react-router-dom'
import Vector from '../Photos/Vector.png'
const ResetPasswordSuccessfully = () => {
    return (
        <>
          <NavLink to='/'>
            <div className='lg:ml-[80px] mt-2 lg:absolute flex items-center justify-center'>
                <img src={LogoCAn} alt='not found' className='w-[80px] h-[80px]' />
                <img src={CANa} alt='not found' className='w-[42.88px] can-21 h-[16.19px]  ' />
            </div>
           </NavLink>
            <div className='lg:h-screen h-fit sm:block md:flex lg:p-0 px-4 pt-[100px] items-center  justify-center'>
                <div className='shadow-xl  px-[70px] py-[90px]  bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]' style={{
                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                }}>
                    <div className=' flex flex-col items-center'>
                        <div>
                      <img src={Vector} className='pb-10' alt="" />
                        </div>
                        <div>
                            <h1 className='lg:text-[28px]  text-[24px] font-semibold  text-[#C31A7F]'>Reset Password</h1>
                        </div>
                        <div className='text-center'>
                            <p className='text-[16px] text-[#555555] font-semibold'>Password reset is successfully done.</p>
                        </div>

                        <div className='mt-10'>
                            <NavLink to='/LoginForm'>
                                <div className='w-52 h-12 cursor-pointer'>
                                    <h2 className='bg-[#C31A7F]  text-center p-3 rounded-xl text-white font-semibold'>Go Back To Login</h2>
                                </div>
                            </NavLink>

                        </div>

                    </div>
                </div>
            </div>

            
        </>
    )
}

export default ResetPasswordSuccessfully
