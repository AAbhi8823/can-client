import React, { useState } from 'react'
import Logo from '../Photos/Logo.png'
import CAN from '../Photos/CAN.png'
import Video from '../Photos/Video.png'
import { NavLink } from 'react-router-dom'
import Roles_Fighter from '../Photos/Roles_Fighter.png'
import Roles_Caregiver from '../Photos/Roles_Caregiver.png'
import Roles_Veteran from '../Photos/Roles_Veteran.png'
import { HiArrowLeft } from 'react-icons/hi'
import illus1 from '../Photos/illus1.png'

const OldUserLoginTitle = () => {

    const [select, setSelect] = useState('')

    function selectedOption(value) {
        setSelect(value)
    }

    return (
        <>
            <div className='ml-[80px] mt-2 absolute flex items-center  '>
                <img src={Logo} alt='not found' className='w-[80px] h-[80px]' />
                <img src={CAN} alt='not found' className='w-[42.88px] h-[16.19px] ' />
            </div>


            <div >



                <div className='flex items-center justify-center ml-60 gap-20 '>

                    <div className='w-[55%] mt-16   flex flex-col items-center justify-center  '>
                        <div className='flex flex-col items-center justify-center'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=''>
                                {/* <CarouselMain /> */}
                                <img src={illus1} className='h-[400px] w-[500px]' alt='none' />
                            </div>



                        </div>
                    </div>

                    {/* Main container */}
                    <div className='flex items-center h-[100vh]  w-full justify-center'>
                        <div className='h-[90%] w-[60vh] shadow-xl mx-24 bg-[#D9D9D9] bg-opacity-10 z-10 backdrop-blur-lg rounded-md'>

                            <div className='mt-6 mx-4 gap-4 flex items-center font-semibold'>
                                <NavLink to='/OldUserLogin'>
                                    <HiArrowLeft />
                                </NavLink>
                                <div>Adding profile for your loved one</div>
                            </div>

                            <div>
                                <img src={Video} alt='none' />
                            </div>

                            <div className='text-center font-semibold text-lg pb-2 flex items-center justify-center px-4'>
                                Whose profile do you want to add?
                            </div>

                            <div className='w-[100%]'>
                                <div className=' flex flex-col items-center justify-center gap-4' >

                                    <div className='flex justify-center' onClick={() => selectedOption('Fighter')}>
                                        <img src={Roles_Fighter} alt='not found' className={`w-[90%] relative ${select === 'Fighter' ? 'opacity-100' : 'opacity-50'}`} />
                                        <div className='absolute top-[40%] left-60 text-white text-xl '>
                                            <h3 className='font-semibold text-xl'>Fighter</h3><div className='flex flex-col relative'><p className='text-[16px]'>I will defeat</p><p className='text-[16px] absolute top-[70%]'>cancer</p></div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center' onClick={() => selectedOption('Caregiver')}>
                                        <img src={Roles_Caregiver} alt='not found' className={`w-[90%] relative ${select === 'Caregiver' ? 'opacity-100' : 'opacity-50'}`} />
                                        <div className='absolute top-[57%] left-60 text-white text-xl'>
                                            <h3 className='font-semibold text-xl'>Caregiver</h3><div className='flex flex-col relative'><p className='text-[16px]'>I will help fighter</p><p className='text-[16px] absolute top-[70%]'>defeat cancer</p></div>
                                        </div>
                                    </div>

                                    <div className='flex justify-center' onClick={() => selectedOption('Veteran')}>
                                        <img src={Roles_Veteran} alt='not found' className={`w-[90%] relative ${select === 'Veteran' ? 'opacity-100' : 'opacity-50'}`} />
                                        <div className='absolute top-[74%] left-60 text-white text-xl'>
                                            <h3 className='font-semibold text-xl'>Veteran</h3><div className='flex flex-col relative'><p className='text-[16px]'>I have defeated</p><p className='text-[16px] absolute top-[70%]'>cancer</p></div>
                                        </div>
                                    </div>


                                    {select ?
                                        (<NavLink to='/home' className=' w-[50%]'>
                                            <h2 className={`bg-[#C31A7F] text-center p-3 rounded-lg text-white `}>Continue</h2>
                                        </NavLink>)
                                        :
                                        (
                                            <div className='w-[50%]'>
                                                <h2 className={`   bg-[#C31A7F] text-center p-3 rounded-lg text-white `}>Continue</h2>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default OldUserLoginTitle