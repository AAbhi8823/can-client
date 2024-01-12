import React from 'react'
import {BsCheck2} from 'react-icons/bs'
import {RxCross2} from 'react-icons/rx'
import {BiArrowBack} from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import HomeNav from '../Components/HomeNav'


const SubscriptionModels = () => {
  return (
    <div className='bg-[#FFF6FB] min-h-screen h-[100%] '>
    <div className='header'><HomeNav /></div>
        {/** title space */}
        
        {/** Subscription Models components */}
        <div className=' justify-start pl-20 mt-7'><NavLink to='/home'><BiArrowBack size={24}  className=''/></NavLink></div>
        <div className='flex flex-row justify-center items-center '>
        
        <div className='flex flex-col justify-center items-center p-4 pt-0'>
       
                <h1 className='text-[black] text-[26px] font-bold '>Choose the Plan that’s right for you</h1>
                <p className='text-[black] text-[16px]  font-semibold'>Subscribers with a verified</p>
        </div>
        </div>
        <div className='flex flex-row flex-wrap px-5   justify-evenly  '>
        
            {/** Model 1 */}
            <div className='flex flex-col  w-[350px] mt-2 h-full bg-[#C31A7F] rounded-[30px] justify-center items-center py-[25px]'style={{boxShadow: '0px 20px 60px 0px #0000001A'}}>
            <div className='flex w-[100px] h-[100px] rounded-full bg-white items-center justify-center text-center shadow-2xl' style={{boxShadow: '0px 5px 20px 0px #0000001A'
            }}><h2 className='font-bold text-[18px] px-7'>1 Month</h2></div>
            <div className='text-white text-[20px] font-bold py-3'>₹ 50.00</div>
               
                    <ul className='list-none w-full px-[35px]'>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center leading-[2]'><BsCheck2/>1 Meeting Per Day</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>2 posts Per Day</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>No Featured Posts</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Post Filter Option </li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Featured Section Filter Locked</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Medicine Vault Locked </li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Scheduler Locked</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><RxCross2/>Whatsapp Feature Availability </li>
                    </ul>
                    <button className='border-[2px] border-white text-white rounded-[20px] w-[153px] h-[45px] mt-12 -mb-2'><NavLink to='/Subscription_Payment_Method'>Buy Now</NavLink></button>
            </div>
            {/** Model 2*/}
            <div className='flex flex-col w-[350px] mt-2 h-full sm:mt-3 bg-[#084943] rounded-[30px] justify-center items-center py-[25px]'style={{boxShadow: '0px 20px 60px 0px #0000001A'}}>
                <div className='flex w-[100px] h-[100px] rounded-full bg-white items-center text-center justify-center shadow-2xl' style={{boxShadow: '0px 5px 20px 0px #0000001A'
                }}><h2 className='font-bold text-[18px] px-7'>6 Month</h2></div>
                <div className='text-white text-[20px] font-bold py-3 '>₹ 250.00</div>
                    <ul className='list-none w-full px-[35px]'>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>1 Meeting Per Day</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>2 posts Per Day</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>No Featured Posts</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Post Filter Option </li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Featured Section Filter Locked</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Medicine Vault Locked </li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Scheduler Locked</li>
                        <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Whatsapp Feature Availability </li>
                    </ul>
                    <button className='border-[2px] border-white text-white rounded-[20px] w-[153px] h-[45px] mt-12 -mb-2'><NavLink to='/Subscription_Payment_Method'>Buy Now</NavLink></button>
            </div>
            {/** Model 3 */}
            <div className='flex flex-col w-[350px] h-full mt-2 bg-[#FFA000;] rounded-[30px] justify-center items-center py-[25px]' style={{boxShadow: '0px 20px 60px 0px #0000001A'}}>
            <div className='flex w-[100px] h-[100px] rounded-full bg-white items-center  text-center justify-center shadow-2xl' style={{boxShadow: '0px 5px 20px 0px #0000001A'
            }}><h2 className='font-bold text-[18px] px-7'>1 Year</h2></div>
            <div className='text-white text-[20px] font-bold py-3'>₹ 500.00</div>
                <ul className='list-none w-full px-[35px]'>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>1 Meeting Per Day</li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>2 posts Per Day</li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>No Featured Posts</li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Post Filter Option </li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Featured Section Filter Locked</li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Medicine Vault Locked </li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Scheduler Locked</li>
                    <li className='flex flex-row  text-white text-[14px] gap-4 items-center  leading-[2]'><BsCheck2/>Whatsapp Feature Availability </li>
                </ul>
                <button className='border-[2px] border-white text-white rounded-[20px] w-[153px] h-[45px] mt-12 -mb-2'><NavLink to='/Subscription_Payment_Method'>Buy Now</NavLink></button>
            </div>
        </div>
        </div>
   
  )
}

export default SubscriptionModels
