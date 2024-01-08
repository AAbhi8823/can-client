import React, { useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import account from '../Photos/account.jpg'
import CarouselMain from '../Components/CarouselMain'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import b4 from '../Photos/b4.png'
import WelcomScreen from '../Photos/WelcomeScreen.png'
import { RxCross2 } from 'react-icons/rx'
import PinInput from 'react-pin-input'
import { baseurl } from '../Api/baseUrl'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { useEffect } from 'react'
import vtwo from '../Photos/vtwo.gif'
import lkslk from '../Photos/lkslk.png'
import Avatar from '@mui/material/Avatar';
import logo2 from '../Photos/logo2.png'
import Craousel from '../Components/Craousel'
import lock from "../Photos/lock.png";

const ShowProfile = () => {

    const navigate = useNavigate()

    const cookie = new Cookies()
    const token = cookie.get("token")
    const [login_open, setLogin_open] = useState(false)
    const userValue = JSON.parse(localStorage.getItem('userValue')) || {}
    const Photo = JSON.parse(localStorage.getItem('userValue')) || {}

    const photo = Photo.profile_photo;
    const name = userValue.username;
    const title = userValue.profile_category;

    const [personId, setpersonId] = useState()
    const [singleuserData, setsingleuserData] = useState([])
    // console.log('Photo:', photo);
    // console.log('Name:', name);
    // console.log('Title:', title)



    const [creatPin_open, setCreatPin_open] = useState(false)
    // const [value, setValue] = useState('');
    const [pin, setPin] = useState('');
    const [repin, setRepin] = useState('');
    const [error, setError] = useState('');
    const [getdiv, setDiv] = useState(false)
    const [perData, setperData] = useState()
    const [loginPin, setLoginPin] = useState('');
    const [errMsg, seterrMsg] = useState(false)
    const [userID, setUserID] = useState(false)



    const[isverifing, setIsVerifing] = useState()
    const mainPin = async () => {
        setIsVerifing(true)
        try {
            const dataPin = await axios.post(`${baseurl}/api/userauthByPin_number`, {
                user_id: personId,
                profile_pin: loginPin
            })
            console.log(dataPin.data.status)
            if (dataPin.data.status === true) {
                navigate('/home')
                localStorage.setItem('active_user', userID)
                setIsVerifing(false)

            } else {
                setIsVerifing(false)
                seterrMsg(!errMsg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePinChange1 = (value) => {
        setLoginPin(value);
        console.log('Pin value:', value);
    };

    // const handleInputChange = (event) => {
    //     const inputValue = event.target.value;
    //     if (/^\d*$/.test(inputValue)) {
    //         setValue(inputValue);
    //     }
    // };
    // const [value1, setValue1] = useState('');


    // const handleInputChange1 = (event) => {
    //     const inputValue1 = event.target.value;
    //     if (/^\d*$/.test(inputValue1)) {
    //         setValue1(inputValue1);
    //     }
    // };
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

    const getsingleuser = async (token) => {
        try {
            const { data } = await axios.get(`${baseurl}/api/getuseraccount?token=${token}`)
            if (data?.status === true) {
                // console.log(data);
                setsingleuserData(data?.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        if (token && !singleuserData?.length) {
            getsingleuser(token)
            // console.log(token)
        }
    }, [token]);

    // console.log(singleuserData.length)


    const creatPin = () => {
        if (token) {
            // setCreatPin_open(!creatPin_open)
            // console.log('token present')
            navigate('/NewUserTitle')
        } else {
            console.log("not present")
        }
    }
    const openLogin = () => {
        setLogin_open(!login_open)
    }
    const changeColor = (gotId) => {
        setpersonId(gotId)
        setDiv(!getdiv)
    }

    const goToPin = () => {
        setDiv(!getdiv)
    }

    const usePin = () => {
        if (pin === repin && !token) {
            navigate('/chooseTitle')
        } else {
            localStorage.setItem("userCreatePin", pin)
            navigate('/NewUserTitle')
        }
    }

    return (
        <>
            {/* {creatPin_open && (
                <div className='fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50 '
                    style={{ backdropFilter: 'blur(2px)' }}>
                    <div className='bg-white h-max  rounded-3xl'>
                        <div className='relative flex lg:py-6  py-4 lg:px-4 items-center flex-col'>
                            <div className='absolute top-3 right-4 '>
                                <RxCross2 size={15} onClick={() => setCreatPin_open(false)} />
                            </div>
                            <div className='text-xl  font-semibold'>Create a Pin</div>
                            <p className=' text-[14px]  text-center px-3 pt-2'>Its your space, so add a profile lock to keep
                                your account information with you</p>
                            <div className=' text-2xl py-1 flex flex-row items-center justify-center w-full  '>

                                <p className='text-xs  font-semibold flex justify-center w-[14%] pt-8 '>PIN</p>

                                <PinInput
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
                            <div className=' text-2xl py-1 flex flex-row items-center justify-center w-full  '>

                                <p className='text-xs  font-semibold flex justify-center w-[14%] pt-8'>Re Enter</p>

                                <PinInput
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
                            <div className='w-[40%] pt-5 flex flex-col items-center  '>
                                {error && <p className='text-red-500 text-center'>{error}</p>}
                                <div className='flex flex-col justify-center pt-7'>
                                    <button onClick={usePin}
                                        className={`w-48 h-12 bg-[#efc31a33] font-bold rounded-[20px] text-white items-center mx-auto ${error && error === 'Pins are equal' ? 'bg-[#efc31a]' : 'pointer-events-none'
                                            }`}
                                        disabled={error && error !== 'Pins are equal'}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )} */}

            {
                getdiv && <div className='fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50  '
                    style={{ backdropFilter: 'blur(2px)' }}>

                    <div className='bg-white h-max lg:w-[30%] w-[340px] rounded-3xl'>
                        <div className='relative flex py-6  items-center flex-col'>
                            <div className='absolute top-3 right-4 '>
                                <RxCross2 size={15} onClick={goToPin} />
                            </div>
                            <div className='text-xl'>Enter {perData && perData.username} Pin</div>
                            {
                                errMsg && <div className='text-red-400 lg:text-xs' >
                                    Please Enter the correct pin!
                                </div>
                            }

                            <div className=' text-2xl py-6 flex flex-row items-center justify-center w-full  '>

                                <p className='text-xs  font-semibold flex justify-center w-[14%] pt-8 '>PIN</p>
                                <PinInput
                                    length={4}
                                    id='pin'
                                    value={loginPin}
                                    onComplete={handlePinChange1}
                                    inputStyle={{
                                        border: 'none',
                                        borderBottom: '1px solid black',
                                        width: '30px',
                                        textAlign: 'center',
                                        marginRight: '30px',
                                    }}
                                ></PinInput>
                            </div>
                            <div className='flex justify-end w-[80%] pt-4'>
                                {(loginPin.length === 4)

                                    ?

                                    <div className=' bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white' type="submit" onClick={mainPin}>
                                        {isverifing ? "Verifying..." : "Continue"}
                                    </div>

                                    :
                                    (
                                        <div className=' bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white opacity-50 '>Continue</div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            }
 <div className='grid flex justify-start center-1'>
 <Link to='/'>
                <div className='flex px-10 w-[100%]'>
                <img src={logo2} className="lg:block md:block hidden" alt="" />
          <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
                </div>
                </Link>
            </div>
            <div>
                <div className='flex lg:flex-row lg:p-0 p-2 items-center justify-center'>
{/* 
                    <div className='hidden lg:block w-[55%] mt-20  flex flex-col items-center justify-center '>
                        <div className='flex flex-col items-center justify-center'>
                            
                            <div className=''>
                            <img src={lkslk} className=' w-[490px]' alt='none' />

                                <div className='  flex flex-col items-center justify-center   '>

                                    <h1 className='text-center text-[36px] font-bold '>Welcome!</h1>

                                    <p className='text-[18px] font-medium mt-2 '>We welcome you to CAN with all our</p>
                                    <p className='text-[18px] font-medium '>Hearts. </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        {/* <div className='hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   '>
                        <div className='flex flex-col items-center justify-center gap-4 '>

                            <div className=''>

                                <img src={lkslk} className='w-[28vw]' alt='none' />
                            </div>
                            <div className='  flex flex-col items-center justify-center   '>

<h1 className='text-center lg:text-[2.67vw] text-[36px] font-bold '>Welcome!</h1>

<p className='text-[18px] lg:text-[1.33vw] font-medium mt-2 '>We welcome you to CAN with all our</p>
<p className='text-[18px] lg:text-[1.33vw] font-medium '>Hearts. </p>
</div>
            </div>
            <div className='flex flex-row items-center justify-center gap-4 mt-10 '>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]'></div>
              <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>                    
                        </div>
                    </div> */}
                    <Craousel/>
                    {/* right side */}
                     {/* <div className='h-[100vh]  flex lg:items-center'>
                        <div className='lg:h-[650px] md:w-[660px] lg:w-[501px] sm:w-[330px] sm:w-[100%] h-[550px] lg:mr-[140px] bg-[#D0F5D3] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]' style={{
                            boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'
                        }}>

                            <div>
                                <img src={vtwo} className='object-contain rounded-[20px]' alt='none' />
                            </div>

                            <div className='p-4 mx-4 lg:text-[25px]   text-[1px] font-semibold text-center'>
                                <h1 className='text-[#C31A7F]' >Select the profile you wish to <br /> continue with </h1>
                            </div>

                            <div className='h-[60%] w-[100%] mt-2 relative'>
                                <div className='flex justify-center  pt-[65px] pb-[65px]  ' >
                                    {
                                        singleuserData && singleuserData.map((userBox, i) => {
                                            console.log(userBox)
                                            return (
                                                <div key={i} onClick={() => {
                                                    setUserID(userBox._id)
                                                    changeColor(userBox._id)
                                                }}
                                                    style={{ background: personId === userBox._id ? "#c31a75" : "#FEE5EA", color: personId === userBox._id ? "white" : "black" }} className='w-[141px] mb-1 h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer'>
                                                    <h1 className='font-semibold mt-[10px] text-center text-lg'>{userBox.username}</h1>
                                                    <p className='text-sm'>{userBox.profile_category.category_Name}</p>
                                                    <div className='absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px] '>
                                                        <Avatar
                                                            alt=" "
                                                            src={userBox.profile_photo}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {
                                        singleuserData?.length === 3 ? "" : <div className='w-[141px] mb-1 mx-2 h-[130px] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }} >
                                            <div onClick={creatPin} className='w-[45%] h-[100%] mb-2'>
                                                <div className='h-full  rounded-3xl flex flex-col justify-center items-center ' >
                                                    <h1 className='font-semibold text-lg'><IoAddCircleOutline /></h1>
                                                    <p className='text-sm text-center'>Add Profile</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>






                                <div className='text-center px-[40px] text-[#C9C9C9] '>
                                

                                    You can add the profile of your Caregiver by clicking on the Add profile button.
                                </div>
                            </div>
                        </div>
                    </div>  */}
                    <div class=" md:w-1/2 lg:w-[35%] px-5">
                        <form>
                     <div>
                                <img src={vtwo} className='object-contain rounded-[20px] w-[100%]' alt='none' />
                            </div>

                            <div className='p-4 mx-4 text-[1.62vw] text-12   font-semibold text-center'>
                                <h1 className='text-[#C31A7F]' >Select the profile you wish to <br /> continue with </h1>
                            </div>

                            <div className='h-[80%] w-[100%] mt-2 relative'>
                            <form class="bg-white shadow-md rounded  rounded-2xl  mb-4">
                                <div className='flex justify-center  pt-[65px] pb-[65px]  ' >
                                    {
                                        singleuserData && singleuserData.map((userBox, i) => {
                                            console.log(userBox)
                                            return (
                                                <div key={i} onClick={() => {
                                                    setUserID(userBox._id)
                                                    changeColor(userBox._id)
                                                }}
                                                    style={{ background: personId === userBox._id ? "#c31a75" : "#FEE5EA", color: personId === userBox._id ? "white" : "black" }} className=' lg:w-[8vw] lg:h-[8vw] w-[171px]  h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer'>
                                                    <h1 className='font-semibold mt-[10px] text-center text-lg'>{userBox.username}</h1>
                                                    <p className='text-sm'>{userBox.profile_category.category_Name}</p>
                                                    <img src={lock} />
                                                    <div className='absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px] '>
                                                        <Avatar
                                                            alt=""
                                                            src={userBox.profile_photo}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    {/* {
                                        singleuserData?.length === 3 ? "" : <div className=' mb-1 mx-2 lg:w-[8vw] lg:h-[8vw] w-[171px]  h-[130px] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }} >
                                            <div onClick={creatPin} className='w-[45%] h-[100%] mb-2'>
                                                <div className='h-full  rounded-3xl flex flex-col justify-center items-center ' >
                                                    <h1 className='font-semibold text-lg'><IoAddCircleOutline /></h1>
                                                    <p className='lg:text-[1.33vw] text-[18px]  text-center'>Add Profile</p>
                                                </div>
                                            </div>
                                        </div>
                                    } */}
                                </div>






                                <div className='text-center lg:text-[1vw] px-[40px] text-[#C9C9C9] '>
                                    You can add the new profile by clicking on the Add profile button on profile page.
                                </div>
                                </form>
                            </div>
                            </form>
                        </div> 
                    </div>
                    </div>
                        
        </>
    )
}

export default ShowProfile