import React from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import Video from '../Photos/Video.png'
import account from '../Photos/account.jpg'
import account2 from '../Photos/account2.jpg'
import CarouselMain from '../Components/CarouselMain'
import { IoAddCircleOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import OldLoginImage from '../Photos/OldLoginImage.png'
import OldProfileImage from '../Photos/PofielPageImage.png'
import illus1 from '../Photos/illus1.png'
import b4 from '../Photos/b4.png'

const OldUserLogin = () => {

    return (
        <>
            <div className='ml-[80px] mt-2 absolute flex items-center '>
                <img src={Logo} alt='not found' className='w-[80px] h-[80px]' />
                <img src={CAN} alt='not found' className='w-[42.88px] h-[16.19px]  ' />
            </div>
            <div>
                <div className='flex'>
                    <div className='w-[55%] mt-20  flex flex-col items-center justify-center  '>
                        <div className='flex flex-col items-center justify-center'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=''>
                                {/* <CarouselMain /> */}
                                <img src={illus1} className='h-[400px] w-[500px]' alt='none' />
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='flex items-center h-[100vh]'>
                        <div className='h-[90%] w-[60vh] shadow-xl mx-24 bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-lg rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.05)'
                        }}>

                            <div>
                                <img src={b4} alt='none' />
                            </div>

                            <div className='p-4 mx-4 text-lg font-semibold text-center'>
                                <h1>You can add the profile of your Caregiver by clicking on the Add profile button.</h1>
                            </div>

                            <div className='h-[60%] w-[100%] px-[10%] mt-10  flex justify-between  flex-wrap relative'>

                                <div className='w-[45%] h-[40%] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center ' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }}>
                                    <h1 className='font-semibold text-lg'>Sierra</h1>
                                    <p className='text-sm'>Fighter</p>
                                    <div className='absolute -top-5 rounded-full overflow-hidden bg-white w-[15%] h-[] '>
                                        <img src={account} alt='none' className='p-1 rounded-full' />
                                    </div>
                                </div>

                                <div className='w-[45%] h-[40%] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center ' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }} >
                                    <NavLink to='/OldUserLoginTitle' className='w-[45%] h-[100%]'>
                                        <div className='h-full  rounded-3xl flex flex-col justify-center items-center ' >
                                            <h1 className='font-semibold text-lg'><IoAddCircleOutline /></h1>
                                            <p className='text-sm'>Add Profile</p>
                                        </div>
                                    </NavLink>
                                </div>

                                <div className='w-[50%] ml-[25%] '>
                                    <div className='bg-[#C31A7F] text-center p-3 rounded-lg text-white'>Continue</div>
                                </div>


                            </div>



                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default OldUserLogin