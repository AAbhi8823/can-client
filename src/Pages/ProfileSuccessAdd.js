import React, { useEffect } from 'react'
import CANa from '../Photos/CANa.png'
import profilePic from '../Photos/UserProfile.png'
import bottomGrass from '../Photos/bottomGrass.png'
import leavesPic from '../Photos/leaves.png'
import leaveSecPic from '../Photos/cornerLeaf.png'
import './ProfileSuccessAdd.css'
import axios from 'axios'
import { baseurl } from '../Api/baseUrl'
import { Cookies } from 'react-cookie'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { useLocation, useNavigate } from 'react-router-dom'

function ProfileSuccessAdd() {
    const [userData, setuserData] = useState([])
    console.log(userData)
    const location = useLocation()
    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate('/ShowProfile')
    }

    console.log(location.state)

    const cookie = new Cookies()
    const token = cookie.get("token")
    // console.log(token)
    const showData = async (token) => {

        try {
            const data = await axios.post(`${baseurl}/api/singleuser?token=${token}`, {
                id: location.state
            })
            setuserData(data.data);
            // console.log(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (token) {
            showData(token)
        }
        // showData()
    }, [token])

    const isoDateString = "2023-09-15T00:00:00.000Z";
    const date = new Date(isoDateString);

    // Options for formatting the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <div>
            {/* {userData.length ?  */}
            <div className='lg:ml-[80px] term-logo  mt-2  flex items-center'>
                <img src="/static/media/LogoCAn.fc0060049246719a015b.png" alt="not found" className="w-[80px] h-[80px]" />
                <img src={CANa} alt="not found" className="w-[42.88px] h-[16.19px] " />
            </div>
            <div className='flex justify-center p-[20px]'>
                <div className=' p-[20px] md:w-[28%] profile_success '>
                    <div className='flex justify-center p-[20px] '>
                        <img src="/static/media/LogoCAn.fc0060049246719a015b.png" alt="not found" className="w-[80px] h-[80px]" />
                    </div>
                    <div className='text-yellow-500 text-center text-[25px] p-[20px]  flex justify-center'>
                        Profile Successfully added!
                    </div>
                    <div className=' justify-center bg-[#8D193C]  p-[10px] rounded-lg'>
                        <div className='flex justify-center'>
                            <div className='bg-[#fff] flex justify-center items-center px-[3px] py-[3px]' style={{ marginRight: "20px", borderRadius: "50%" }} >
                                <Avatar
                                    alt=" "
                                    src={userData?.data?.profile_photo}
                                    sx={{ width: 70, height: 70 }}

                                />
                            </div>

                            {/* <img  alt="not found" className="w-[80px] h-[80px]" /> */}

                            <div className='leading-6'>
                                {/* <p className='text-white'>{userData?.data?.username}</p>
                                <p className='text-white text-[12px]'>{userData?.data?.profile_category.category_Name} {userData?.data?.gender}</p>
                                <p className='text-white text-[12px]'>{userData?.data?.link_email}</p> */}

                                <p className='font-bold text-white'>{userData?.data?.username}</p>
                                <p className='text-white text-[12px]'>{userData?.data?.profile_category.category_Name} {userData?.data?.gender}</p>
                                <p className='text-white text-[12px]'>{userData?.data?.link_email}</p>
                            </div>
                        </div>

                        <div className='text-end'>
                            <p className='text-white text-[12px]' >{formattedDate}</p>
                        </div>
                    </div>
                    <div className='text-center p-[20px] '>
                        Your account has been successfully <br />
                        linked to his account.
                    </div>
                    <div className='cursor-pointer py-[50px] '>
                        <div onClick={handleSuccess} className=" bg-[#C31A7F]  text-center p-3 rounded-xl text-white font-semibold">Finish</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-rows-1 grass_div grid-cols-2 term-logo'>
                <div>
                    <img src={bottomGrass} alt="not found" className="w-[100%] h-[80px]" />
                </div>
                <div>
                    <img src={bottomGrass} alt="not found" className="w-[100%] h-[80px]" />
                </div>
            </div>
            <div className='term-logo'>
                <div>
                    <img src={leavesPic} alt="not found" className="leaves_img " />
                </div>
                <div>
                    <img src={leaveSecPic} alt="not found" className=" leaf_postion" />
                </div>
            </div>
            {/* :""} */}
        </div>
    )
}

export default ProfileSuccessAdd
