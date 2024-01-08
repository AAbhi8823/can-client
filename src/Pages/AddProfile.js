import React, { useEffect, useState } from 'react'
import LogoCAn from '../Photos/LogoCAn.png'
import CANa from '../Photos/CANa.png'
import Video from '../Photos/Video.png'
import account from '../Photos/account.jpg'
import account2 from '../Photos/account2.jpg'
import CarouselMain from '../Components/CarouselMain'
import { IoAddCircleOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

import OldProfileImage from '../Photos/PofielPageImage.png'
import illus1 from '../Photos/illus1.png'
import vtwo from '../Photos/vtwo.gif'
import { RxCross1, RxCross2 } from 'react-icons/rx'
import lock from '../Photos/lock.png'
import PinInput from 'react-pin-input'
import Cookies from 'js-cookie'
import axios from 'axios'
import { async } from 'q'
import { baseurl } from '../Api/baseUrl'
import { TbSettingsFilled } from 'react-icons/tb'
import Avatar from '@mui/material/Avatar';
import logo2 from '../Photos/logo2.png'
import LoginCraousel from '../Components/LoginCraousel'
const AddProfile = () => {

    const [creatPin_open, setCreatPin_open] = useState(false)
    const [login_open, setLogin_open] = useState(false)
    const [pin, setPin] = useState('');
    const [repin, setRepin] = useState('');
    const [error, setError] = useState('');
    const [loginPin, setLoginPin] = useState('');
    const [perData, setperData] = useState()
    const [userBoxId, setUserboxId] = useState("")
    const [getdiv, setDiv] = useState(false)
    const [errMsg, seterrMsg] = useState(false)
    const [userid, setuserid] = useState("")

    const token = Cookies.get('token')
    const navigate = useNavigate()
    
    const getToken = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/api/getuseraccount?token=${token}`
        );
        setperData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const [isVerifying, setIsVerifing] = useState()
    const mainPin = async () => {
        setIsVerifing(true)
        try {
            const dataPin = await axios.post(`${baseurl}/api/userauthByPin_number`, {
                user_id: userBoxId,
                profile_pin: loginPin
            })
            console.log(dataPin.data.status)
            if (dataPin.data.status === true) {
                localStorage.setItem('active_user', userid)
                navigate('/home')
                setIsVerifing(false)

            }
            else {
                // console.log("not a user")
                seterrMsg(!errMsg)
                setIsVerifing(false)
            }


            // if (dataPin.status === true) {

            // }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    // console.log(perData)

    const handlePinChange = (value) => {
        setPin(value);
        console.log('Pin value:', value);
    };

    const handlePinChange1 = (value) => {
        setLoginPin(value);
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

    const creatPin = () => {
        if (token) {
            setCreatPin_open(!creatPin_open)
            navigate('/NewUserTitle')

            // console.log('token present')
        } else {
            console.log("not present")
        }
    }

    const openLogin = () => {
        setLogin_open(!login_open)
    }

    const getUser = (boxId) => {
        console.log("userID :", boxId);
        setUserboxId(boxId)
        setDiv(!getdiv)
    }

    const goToPin = () => {
        setDiv(!getdiv)
    }

    console.log("perData", perData)

    const usePin = () => {
        if (pin === repin && !token) {
            localStorage.setItem("userCreatePin", pin)
            navigate('/chooseTitle')
        } else {
            navigate('/NewUserTitle')
        }
    }


    return (
      <>
        {/* <button onClick={getit} >showToken</button> */}
        {creatPin_open && (
          <div
            className="fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50 "
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="bg-white h-max  rounded-3xl">
              <div className="relative flex lg:py-6  py-4 lg:px-4 items-center flex-col">
                <div className="absolute top-3 right-4">
                  <RxCross2 size={15} onClick={creatPin} />
                </div>

                <div className="text-xl  font-semibold">Create a Pin</div>
                <p className=" text-[14px]  text-center px-3 pt-2">
                  Its your space, so add a profile lock to keep your account
                  information with you
                </p>
                <div className=" text-2xl py-1 flex flex-row items-center justify-center w-full gap-4 ">
                  <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8 ">
                    PIN
                  </p>
                  {/* 
                                <input
                                    type="text"
                                    value={value}
                                    onChange={handleInputChange}
                                    maxlength="4"
                                    placeholder='__  __  __  __'
                                    className='w-[40%] placeholder:text-3xl placeholder:tracking-[0em] bg-transparent tracking-[1em]  mb-4 outline-none  '

                                /> */}
                  <PinInput
                    length={4}
                    id="pin"
                    value={pin}
                    onComplete={handlePinChange}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "30px",
                      textAlign: "center",
                      marginRight: "30px",
                    }}
                  ></PinInput>
                </div>
                <div className=" text-2xl py-1 flex flex-row items-center justify-center gap-4 w-full  ">
                  <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8">
                    Re Enter
                  </p>

                  {/* <input
                                    type="text"
                                    value={value1}
                                    onChange={handleInputChange1}
                                    maxlength="4"
                                    placeholder='__  __  __  __'
                                    className='w-[40%] placeholder:text-3xl placeholder:tracking-[0em] bg-transparent tracking-[1em]  mb-4 outline-none  '

                                /> */}
                  <PinInput
                    length={4}
                    id="repin"
                    value={repin}
                    onComplete={handleRepinChange}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "30px",
                      textAlign: "center",
                      marginRight: "30px",
                    }}
                  ></PinInput>
                </div>
                <div className="w-[40%] pt-5 flex flex-col items-center  ">
                  {/* {(value.length === 4 && value === value1) ?
                                    (<Link to={(value.length === 4 && value === value1) ? '/loginchoosetitle' : ''}>
                                        <div className='bg-[#C31A7F] text-center p-3 rounded-xl text-white'>Continue</div>
                                    </Link>)
                                    :
                                    (
                                        <div className='bg-[#C31A7F] text-center p-3 rounded-xl text-white opacity-50 '>Continue</div>


                                    )} */}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  <div className="flex flex-col justify-end pt-7">
                    <button
                      className={`w-48 h-12 bg-[#efc31a33] font-bold rounded-[20px] text-white items-center mx-auto ${
                        error && error === "Pins are equal"
                          ? "bg-[#efc31a]"
                          : "pointer-events-none"
                      }`}
                      disabled={error && error !== "Pins are equal"}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* loginPin */}

        {getdiv && (
          <div
            className="fixed inset-0 flex items-center justify-center lg:p-0 p-2 bg-black bg-opacity-50 z-50  "
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="bg-white h-max lg:w-[30%] w-[340px] rounded-3xl">
              <div className="relative flex py-6  items-center flex-col">
                <div className="absolute top-3 right-4 ">
                  <RxCross2 size={15} onClick={goToPin} />
                </div>

                <div className="text-xl ">
                  Enter {perData && perData.username} Pin
                </div>
                {errMsg && (
                  <div className="text-red-400 lg:text-xs">
                    Please Enter the correct pin!
                  </div>
                )}
                <div className="text-2xl py-6 flex flex-row items-center justify-center w-full">
                  <p className="text-xs  font-semibold flex justify-center w-[14%] pt-8 ">
                    PIN
                  </p>
                  <PinInput
                    length={4}
                    id="pin"
                    value={loginPin}
                    onComplete={handlePinChange1}
                    inputStyle={{
                      border: "none",
                      borderBottom: "1px solid black",
                      width: "30px",
                      textAlign: "center",
                      marginRight: "30px",
                    }}
                  ></PinInput>
                </div>
                <div className="flex justify-end w-[80%] pt-4">
                  {loginPin.length === 4 ? (
                    <div
                      className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white"
                      onClick={mainPin}
                    >
                      {isVerifying ? "Verifying..." : "Continue"}
                    </div>
                  ) : (
                    <div className="bg-[#C31A7F] text-center px-6 py-2 cursor-pointer rounded-xl text-white opacity-50 ">
                      Continue
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid flex justify-start center-1">
          <Link to="/">
            <div className="flex px-10 w-[100%]">
              <img src={logo2} className="lg:block md:block hidden" alt="" />
              <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
            </div>
          </Link>
        </div>
        <div>
          <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
            {/* <div className='hidden md:block lg:block w-[50%]   flex flex-col items-center justify-center   '>
                        <div className='flex flex-col items-center justify-center gap-4 '>

                            <div className=''>

                                <img src={illus1} className='w-[24vw]' alt='none' />
                            </div>

                            <div className='  flex flex-col items-center justify-center mt-4  '>
                                <h1 className='text-center text-[2.67vw] font-bold '>Hospital visits, easier.</h1>
                                <p className='text-center font-medium text-[1.33vw] mt-2 '>Upload and manage your medical records and reports,</p>
                                <p className='text-center font-medium text-[1.33vw] mt-2 '>all in one place.</p>
                            </div>
                            <div className='flex flex-row items-center gap-4 mt-4 '>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#C31A7F]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                                <div className='h-[0.78vw] w-[0.78vw] rounded-full bg-[#E7E7E7]'></div>
                            </div>
                        </div>
                    </div> */}

            <LoginCraousel />

            {/* right side */}
            <div className="md:w-1/2 lg:w-[35%] px-5">
              <form className="bg-white shadow-md rounded  rounded-2xl  mb-4">
                <div>
                  <img
                    src={vtwo}
                    className="w-full w-[100%] rounded-[20px]"
                    alt="none"
                  />
                </div>

                <div className="p-4 mx-4 lg:text-[1.7vw]   text-[25px] font-semibold text-center">
                  <h1 className="text-[#C31A7F]">
                    Select the profile you wish to <br /> continue with{" "}
                  </h1>
                </div>

                <div className="h-[60%] w-[100%] mt-2 relative">
                  <div className="flex justify-center  pt-[65px] pb-[65px] ">
                    {perData &&
                      perData.map((userget, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              setuserid(userget._id);
                              getUser(userget._id);
                            }}
                            className="w-[141px] mb-1 h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer"
                            style={{
                              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                              background:
                                userBoxId === userget._id
                                  ? "#c31a75"
                                  : "#FEE5EA",
                              color:
                                userBoxId === userget._id ? "white" : "black",
                            }}
                          >
                            <h1 className="font-semibold text-lg mt-5 ">
                              {userget.username}
                            </h1>
                            <p className="text-sm">
                              {userget.profile_category.category_Name}
                            </p>
                            <img
                              src={lock}
                              style={{
                                filter:
                                  userBoxId === userget._id
                                    ? "brightness(0) invert(1)"
                                    : "",
                              }}
                              alt="none"
                              className="h-5 w-5"
                            />
                            <div className="absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px]">
                              <Avatar
                                alt=" "
                                src={userget.profile_photo}
                                sx={{ width: 56, height: 56 }}
                              />
                            </div>
                          </div>
                        );
                      })}

                    {perData && perData.length === 3 ? (
                      ""
                    ) : (
                      <div
                        className="w-[141px] mb-1 mx-2 h-[130px] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer "
                        style={{
                          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div onClick={creatPin} className="w-[45%] h-[100%]">
                          <div className="h-full  rounded-3xl flex flex-col justify-center items-center ">
                            <h1 className="font-semibold text-lg">
                              <IoAddCircleOutline />
                            </h1>
                            <p className="text-sm text-center">Add Profile</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center px-[40px] text-[#C9C9C9] ">
                    You can add the profile of your Caregiver by clicking on the
                    Add profile button.
                  </div>
                </div>
              </form>
            </div>
            {/* <div class=" md:w-1/2 lg:w-[35%] px-5">
  <form class="bg-white shadow-md rounded  rounded-2xl  mb-4">
  <div>
                <img src={vtwo}  className='object-contain rounded-[20px]' alt='Video' />
              </div>
              <div className='text-center px-5'>
                <h2 className='text-[18px] lg:text-[1.1vw]'>You can add the profile of your Caregiver by clicking on the Add profile button.</h2>
              </div>
              <div className='h-[60%] w-[100%] mt-2 relative'>
                                <div className='flex justify-center  pt-[65px] pb-[65px] '>
                                    {
                                        perData && perData.map((userget, i) => {
                                            console.log(userget);
                                            return (
                                                <div key={i} onClick={() => {
                                                    setuserid(userget._id)
                                                    getUser(userget._id)
                                                }} className='w-[141px] mb-1 h-[130px] rounded-3xl mx-2 flex flex-col justify-center items-center cursor-pointer' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)', background: userBoxId === userget._id ? "#c31a75" : "#FEE5EA", color: userBoxId === userget._id ? "white" : "black" }}>
                                                    <h1 className='font-semibold text-lg mt-5 '>{userget.username}</h1>
                                                    <p className='text-sm'>{userget.profile_category.category_Name}</p>
                                                    <img src={lock} style={{ filter: userBoxId === userget._id ? 'brightness(0) invert(1)' : "" }} alt='none' className='h-5 w-5' />
                                                    <div className='absolute top-[28px] rounded-full overflow-hidden bg-white p-[3px]'>
                                                        <Avatar
                                                            alt=" "
                                                            src={userget.profile_photo}
                                                            sx={{ width: 56, height: 56 }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }



                                    {
                                        perData && perData.length === 3 ? "" : <div className='w-[141px] mb-1 mx-2 h-[130px] bg-[#FEE5EA] rounded-3xl flex flex-col justify-center items-center cursor-pointer ' style={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)' }} >
                                            <div onClick={creatPin} className='w-[45%] h-[100%]'>
                                                <div className='h-full  rounded-3xl flex flex-col justify-center items-center ' >
                                                    <h1 className='font-semibold text-lg'><IoAddCircleOutline /></h1>
                                                    <p className='text-sm text-center'>Add Profile</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                </div>
                                <div className='w-[40%] py-5 mx-auto' >
                                    <h2 className='bg-[#C31A7F] cursor-pointer lg:text-[1vw] font-semibold  text-center p-3 rounded-lg text-white'>Continue</h2>
                                </div>
<div className='flex justify-center py-5 gap-3'>
</div>
                    

  </form>
</div> */}
          </div>
        </div>
      </>
    );
}

export default AddProfile