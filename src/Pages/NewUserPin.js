import React, { useRef, useState } from 'react';
import LogoCAn from '../Photos/LogoCAn.png';
import CANa from '../Photos/CANa.png';
import Video from '../Photos/Video.png';
import CarouselMain from '../Components/CarouselMain';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SelfCare from '../Photos/SelfCare.png'
import vibird1 from '../Photos/vibird1.gif'
import PinInput from 'react-pin-input'
import axios from 'axios';
import { baseurl } from '../Api/baseUrl';
import  Cookies  from 'js-cookie'

const MultiPIN = () => {

    const [pin, setPin] = useState('');
    const [repin, setRepin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    
    // const cookie = new Cookies()
    const location = useLocation()

    console.log(location.state)
    console.log("location.state", location.state);

    const registerUserAccount = async () => {
        const email = localStorage.getItem('newUserData')
        const NewData = JSON.parse(email)
        // console.log(NewData.Name)
        const formData = new FormData()
        formData.set("email", NewData.email)
        formData.set("username", NewData.Name)
        formData.set("gender", NewData.Gender)
        formData.set("date_of_birth", NewData.newDOB)
        formData.set("profile_category", localStorage.getItem('newProfile'))
        formData.set("profile_pin", pin)
        formData.set("profile_photo",location.state)

        // formData.set("profile_photo", mainimage)

        const token = Cookies.get('token')
        console.log(token)

        console.log(NewData, localStorage.getItem('newProfile'))

        try {
            const data = await axios.post(`${baseurl}/api/add-another-account?token=${token}`, formData)
            console.log(data)
            if (data.data.status === true) {
                navigate('/NewAddedProfile',{
                    state:data.data.data 
                })
            }
        } catch (error) {
            console.log(error)
        }

        // localStorage.setItem('NewImage', image)
        // navigate('/') 
    };

    const handlePinChange = (value) => {
        setPin(value);
        console.log('Pin value:', value);
    };


    const handleRepinChange = (value) => {
        setRepin(value);
        console.log('Repin value:', value);

        if (pin === value) {
            setError('Pins are equal');
        } else {
            setError('Pins do not match, Please re-enter the pin correctly!');
        }
    };



    return (
        <>
            <div className='lg:ml-[80px] mt-2 lg:absolute flex items-center justify-center  '>
                <img src={LogoCAn} alt='not found' className='w-[80px] h-[80px]' />
                <img src={CANa} alt='not found' className='w-[42.88px] can-21 h-[16.19px]  ' />
            </div>
            <div>

                <div className='flex lg:flex-row lg:p-0 p-2 items-center justify-center'>
                    <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center '>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=''>
                                {/* <CarouselMain /> */}
                                <img src={SelfCare} alt='none' className='h-[390px] w-[390px]' />
                            </div>

                            <div className='mt-2 flex flex-col items-center justify-center gap-1 '>
                                <h1 className='text-center text-[32px]  font-semibold'>A companion to your relaxation.</h1>
                                <p className='text-center text-[18px] font-medium '>Listen to our evergreen radio, do guided meditations, and</p>
                                <p className='text-center text-[18px] font-medium '>record your memories to relax and unwind.</p>
                            </div>

                            <div className="flex flex-row items-center gap-4 mt-3">
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#C31A7F]'></div>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='h-[100vh]  flex lg:items-center'>
                        <div className='lg:h-[650px]  md:h-[660px] md:w-[660px] lg:w-[501px] sm:w-[330px] h-[550px]  lg:mr-[140px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <img src={vibird1} alt='Video' />
                            </div>

                            <div className='text-center lg:text-[30px] text-[24px]  font-semibold p-1  text-[#C31A7F]'>
                                <h1>Create a PIN</h1>
                            </div>
                            <div className='mt-2 flex flex-col items-center justify-center '>
                                <p className='lg:text-[18px] text-[14px] font-medium '>Its your space, so add a profile lock to keep
                                </p>
                                <p className='lg:text-[18px] text-[14px] font-medium'>your account information with you</p>
                            </div>

                            <div className='grid grid-rows-2 grid-cols-1 pin-code ' >
                                <div className='flex '>

                                    {/* <p className='text-sm  font-semibold flex justify-center w-[14%] '>PIN</p> */}

                                    {/* <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    maxlength="4"
                                    placeholder='__  __  __  __'
                                    className='w-[64%] placeholder:text-4xl placeholder:tracking-[0em] bg-transparent tracking-[.50em]  mb-4 outline-none  '
                                    
                                /> */}

                                    <label className=' lg:text-[18px] text-[14px] align-bottom lg:mr-[70px] flex items-end justify-center '> PIN </label>
                                    <PinInput
                                        className='mx-5'
                                        length={4}
                                        id='pin'
                                        value={pin}
                                        onComplete={handlePinChange}
                                        inputStyle={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            width: '30px',
                                            textAlign: 'center',
                                            marginRight: '30px',
                                        }}
                                    ></PinInput>
                                </div>

                                <div className='flex  '>
                                    <label className=' lg:text-[18px] text-[14px] align-bottom lg:mr-8 flex items-end justify-center '>Re Enter</label>
                                    <PinInput
                                        className=''
                                        length={4}
                                        id='repin'
                                        value={repin}
                                        onComplete={handleRepinChange}
                                        inputStyle={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            width: '30px',
                                            textAlign: 'center',
                                            marginRight: '30px',
                                        }}
                                    ></PinInput>

                                </div>
                            </div>





                            {error && <p className='text-red-500 text-center'>{error}</p>}

                            <div className='flex flex-col justify-center pt-2 '>
                                <button
                                    className={`w-[40%] h-12 rounded-lg bg-  bg-[#C31A7F] font-bold rounded-[20px]  text-white items-center mx-auto ${error && error === 'Pins are equal' ? '  bg-[#C31A7F]' : 'pointer-events-none'
                                        }`}
                                    disabled={error && error !== 'Pins are equal'}
                                >
                                    <h1 to='/ShowProfile' onClick={registerUserAccount}>Continue</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MultiPIN