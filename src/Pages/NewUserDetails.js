import React, { useState, useEffect, useRef } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import five from '../Photos/five.gif'
import { AiOutlineMail } from 'react-icons/ai'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { SlCalender } from 'react-icons/sl'
import { NavLink, useNavigate } from 'react-router-dom'
import CarouselMain from '../Components/CarouselMain'
import c4 from '../Photos/c4.png'
import PageImg from '../Photos/p8.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import 'select2'; // Import Select2 after jQuery
import { WidthFull } from '@mui/icons-material'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
const LoginDetails = () => {

    //Email input bo

    const navigate = useNavigate()

    //before continue
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [gender, setgender] = useState('')
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (e) => {
        // Handle the selected value here
        setgender(e.target.value);
    };


    function changeUsername(e) {
        setUsername(e.target.value)
    }


    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function handleGenderChange(e) {
        setgender(e.target.value)
    }

    function handledobChange(e) {
        setStartDate(e.target.value)
    }



    const newDetails = () => {

        const NewUserData = {
            Email: Email,
            Name: Username,
            Gender: gender,
            newDOB: startDate
        }
        
        localStorage.setItem('newUserData', JSON.stringify(NewUserData))
        navigate('/NewUserImage')
        // console.log(Username, gender, startDate)
    }



    const selectRef = useRef(null);

    useEffect(() => {

        $(selectRef.current).select2({
            minimumResultsForSearch: Infinity,
        });


        $(selectRef.current).on('change', function () {
            const selectedValue = $(this).val();
            setgender(selectedValue);
        });


        return () => {
            $(selectRef.current).select2('destroy');
            $(selectRef.current).off('change');
        };
    }, []);

    return (

        <>

            <div className='lg:ml-[80px] mt-2 lg:absolute flex items-center justify-center  '>
            <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
            </div>



            <div className=' '>



                <div className='flex lg:flex-row lg:p-0 p-2 items-center justify-center '>
                    <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center '>

                        <div className='flex flex-col items-center justify-center gap-2'>
                            {/* <img src={WelcomeScreen} className='' /> */}
                            <div className='w-[60%] -mt-20'>
                                {/* <CarouselMain /> */}
                                <img src={PageImg} alt='none' />
                            </div>

                            <div className=' flex flex-col items-center justify-center gap-1 -mt-10'>
                                <h1 className='text-center text-[32px] font-semibold'>You are not alone</h1>
                                <p className='text-center text-[18px] font-medium w-[100%]'>Join and host meeting to share relate and listen to experiences. <br />
                                    Add people you connect with to your support group to <br />
                                    chat, call, and spend time with..</p>
                            </div>

                            <div className="flex flex-row items-center gap-4 mt-4">
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className="h-[12px] w-[12px] rounded-full  bg-[#C31A7F]"></div>
                                <div className="h-[12px] w-[12px] rounded-full bg-[#E7E7E7]"></div>
                                <div className='h-[12px] w-[12px] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div>


                    {/* right side */}
                    <div className='h-[100vh]  flex lg:items-center'>
                        <div className='md:w-[660px] lg:w-[501px] lg:mr-[140px] lg:h-[88vh] md:h-[80vh] sm:h-[60vh]  sm:w-[330px]  bg-opacity-10  z-10 backdrop-blur-md rounded-[20px] ' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>

                            <div>
                                <img src={five} className='object-contain rounded-[20px]' />
                            </div>

                            <div className='text-center text-[34px]  font-semibold p-2 text-[#EFC319]'>
                                <h1>Your Details</h1>
                            </div>

                            <div className='p-4'>

                                <div className='border-2 h-14 my-4 mx-5 px-2 rounded-[20px] flex items-center justify-center gap-4'>
                                    <h1 className='font-bold flex  items-center w-max h-full lg:px-2 px-1'><VscAccount /></h1>
                                    <div className='  bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    <input placeholder='Enter full name' className='border-none w-full bg-transparent  outline-none'
                                        value={Username} onChange={changeUsername} />
                                </div>

                                <div className='border-2 h-14 my-4 mx-5 px-2 rounded-[20px] flex items-center justify-center gap-4'>
                                    <h1 className='font-bold flex  items-center w-max h-full lg:px-2 px-1'><VscAccount /></h1>
                                    <div className='  bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    <input placeholder='Enter Email' className='border-none w-full bg-transparent outline-none'
                                        value={Email} onChange={changeEmail} />
                                </div>

                                <div className='border-2 h-14 mx-5  px-2 rounded-[20px] flex items-center gap-4'>
                                    <h1 className='font-bold flex items-center w-max h-full lg:px-2 px-1'><BsGenderAmbiguous /></h1>
                                    <div className=' bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    {/* <label htmlFor="gender" className="mr-2">
                                        Gender:
                                    </label> */}
                                    <select
                                        // onChange={handleGender}
                                        style={{ width: "100%", background: "transparant" }}
                                        value={gender}
                                        id="gender"
                                        ref={selectRef}
                                        name="gender"
                                        className=" py-2 w-full bg-red rounded-md focus:outline-none focus:none bg-transparent px-2 "
                                    >
                                        <option disabled selected value="">Choose Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {/* <Select options={options} className='w-full bg-transparent placeholder:p-2 outline-none bg-slate-200 ' defaultInputValue='Gender' /> */}
                                </div>

                                <div className='border-2 h-14 mx-5 my-4 px-2 rounded-[20px] flex items-center gap-4'>
                                    <h1 className='font-bold flex items-center w-max h-full lg:px-2 px-1'><SlCalender /></h1>
                                    <div className='bg-[#000] h-[35px] w-[1px] inline-block text-[20px]'></div>
                                    {/* <input placeholder='Date of Birth' className='border-none w-full bg-transparent placeholder:p-2 outline-none'
                                    value={dob}
                                    onChange={handledobChange} /> */}
                                    {/* <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        isClearable
                                        placeholder="Date of Birth"
                                        className='outline-none bg-transparent overflow-hidden'
                                    /> */}

                                    <input type='date' placeholder='Date of Birth' onChange={(date) => {setStartDate(date.target.value)
                                    console.log(date.target.value);
                                    }} style={{  outline:"none", width: "100%" }} />

                                </div>
                            </div>

                            <div className='flex justify-center py-2'>
                                {Username && gender && startDate ?
                                    (
                                        // <div to='/loginimage' className='w-[50%]'>
                                        <div to='/loginimage' onClick={newDetails} className='w-[50%] cursor-pointer'>
                                            <h2 className=' bg-[#C31A7F]  text-center p-3 rounded-xl text-white'>Continue</h2>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='w-[50%]'>
                                            <h2 className=' bg-[#C31A7F] opacity-50 text-center p-3 rounded-xl text-white'>Continue</h2>
                                        </div>
                                    )
                                }
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default LoginDetails