import React, { useRef, useState } from 'react';
import LogoCAn from '../Photos/LogoCAn.png';
import CANa from '../Photos/CANa.png';
import Video from '../Photos/Video.png';
import { VscAccount } from 'react-icons/vsc';
import { IoCloseCircleSharp } from 'react-icons/io5';
import CarouselMain from '../Components/CarouselMain';
import Freeline from '../Photos/Freeline.png'
import { Form, NavLink, json, useNavigate } from 'react-router-dom';
import sixx from '../Photos/sixx.gif'
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseurl } from '../Api/baseUrl';

const LoginImage = () => {

    const navigate = useNavigate()
    const [mainimage, setmainImage] = useState();


    const [image, setImage] = useState();
    const hiddenChooseImage = useRef(null);

    const hideImage = () => {
        setImage(false)
    };

    const uploadImage = () => {
        hiddenChooseImage.current.click();
    };

    const handleImageUpload = (event) => {
        // const file = event.target.files[0];
        setmainImage(event.target.files[0])
        setImage(URL.createObjectURL(event.target.files[0]));
        // console.log(URL.createObjectURL(file));
    };

    const NewImage = async () => {

        // const email = localStorage.getItem('newUserData')
        // const NewData = JSON.parse(email)
        // // console.log(NewData.Name)
        // const formData = new FormData()
        // formData.set("email_phone", NewData.Email)
        // formData.set("username", NewData.Name)
        // formData.set("gender", NewData.Gender)
        // formData.set("date_of_birth", NewData.newDOB)
        // formData.set("profile_category", localStorage.getItem('newProfile'))
        // formData.set("profile_pin", localStorage.getItem('userCreatePin'))
        // formData.set("profile_photo", mainimage)

        // const token = Cookies.get('token')
        // console.log(token)

        // console.log(NewData, localStorage.getItem('newProfile'))

        // try {
        //     const data = await axios.post(`${baseurl}/api/add-another-account?token=${token}`, formData)
        //     console.log(data.data.status)
        //     if (data.data.status === true) {
                navigate('/NewUserPin',{
                    state:mainimage
                })
        //     }
        // } catch (error) {
        //     console.log(error)
        // }






        localStorage.setItem('NewImage', image)
        // navigate('/')
    }

    return (
        <>
            <div className='lg:ml-[80px] mt-2 lg:absolute flex items-center justify-center'>
                <img src={LogoCAn} alt='not found' className='w-[80px] h-[80px]' />
                <img src={CANa} alt='not found' className='w-[42.88px]  can-21 h-[16.19px]  ' />
            </div>
            <div>


                <div className='flex lg:flex-row lg:p-0 p-2 items-center justify-center'>
                    <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className=' '>
                                {/* <CarouselMain /> */}
                                <img src={Freeline} alt='none' className='h-[350px] w-[450px]' />
                            </div>

                            <div className=' flex flex-col items-center justify-center gap-1 '>
                                <h1 className='text-center text-[32px] font-semibold'>Care, one step away</h1>
                                <p className='text-center text-[18px] font-medium w-[100%] mt-2'>Set up an emergency phone line with your trusted contacts <br />
                                    to call anytime with the press of a button</p>
                            </div>

                            <div className="flex flex-row items-center gap-4 mt-3">
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full  bg-[#C31A7F]"></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div>


                    {/* right side */}
                    <div className='h-[100%] mt-11  flex lg:items-center'>
                        <div className='md:w-[660px] lg:w-[501px] lg:mr-[140px] lg:h-[88vh] md:h-[70vh] sm:h-[60vh]  w-[px] sm:w-[330px]  bg-[#D0F5D3] bg-opacity-10  z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <img src={sixx} className='object-contain rounded-[20px]' alt='Video' />
                            </div>
                            <div className='text-center text-3xl mt-5 mb-3 font-semibold p-1 text-[#EFC319]'>
                                <h1>Add Profile</h1>
                            </div>

                            <div className='border-2 border-dashed rounded-xl h-[30%] mx-8 my-2 flex justify-center items-center overflow-hidden'>
                                <div className='flex flex-col items-center'>
                                    {!image && (
                                        <div className='flex flex-col items-center cursor-pointer ' onClick={uploadImage}>
                                            <VscAccount size={50} />
                                            <h1>Choose image</h1>
                                        </div>
                                    )}

                                    {image && (
                                        <div className='relative'>
                                            <img src={image} alt='Uploaded' className='h-[38%] w-80 rounded-lg  ' />
                                            <button className='absolute top-0 right-0' onClick={hideImage}>
                                                <IoCloseCircleSharp color='white' />
                                            </button>
                                        </div>
                                    )}

                                    <input
                                        type='file'
                                        accept='image/*'
                                        ref={hiddenChooseImage}
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>

                            <div className='flex px-5 justify-center'>
                                <NavLink to='/loginprofile' className='flex justify-center py-2 w-[50%]'>
                                    <h2 className='bg-transparent border-[#C31A7F] border-2 w-[86%] text-center p-3 rounded-lg text-[#C31A7F]'>Add later</h2>
                                </NavLink>

                                {image ? (
                                    <div className='flex justify-center py-2 w-[50%]'>
                                        <div onClick={NewImage} className='w-[86%] cursor-pointer '>
                                            <h2 className=' bg-[#C31A7F] text-center p-3 rounded-lg text-white'>Continue</h2>
                                        </div>
                                    </div>)
                                    :
                                    (<div className='flex justify-center py-2 w-[50%]'>

                                        <div className='w-[86%] cursor-pointer '>
                                            <h2 className=' bg-[#C31A7F] opacity-50 text-center p-3 rounded-lg text-white'>Continue</h2>
                                        </div>
                                    </div>)

                                }


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginImage