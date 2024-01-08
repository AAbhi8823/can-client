import React, { useState } from 'react'
import Page from "../Layouts/Pages";
import {AiOutlineBell} from "react-icons/ai"
import {BsPersonSlash} from "react-icons/bs"
import {VscKey} from "react-icons/vsc"
import ProfileLock from './ProfileLock';
import SetPassword from '../Components/SetPassword';
import BlockedAccounts from './BlockedAccounts';
import Notification from './Notification';

const Settings = () => {

    // const [changePin, setChangePin] =useState(false);
    // const [changePass, setChangePass] =useState(false);
    // const [changeNotification, setChangeNotification] = useState(false);
    // const [changeBlockedAcc, setChangeBlockedAcc] =useState(false);
    
    // const handleChangePin =()=>{
    //     setChangePin(true);
    //     setChangePass(false);
    //     setChangeNotification(false);
    //     setChangeBlockedAcc(false);
    // }

    // const handleChangePass =()=>{
    //     setChangePass(true);
    //     setChangeNotification(false);
    //     setChangeBlockedAcc(false);
    //     setChangePin(false);
    // }
    // const handleChangeNotification =()=>{
    //     setChangeNotification(true);
    //     setChangeBlockedAcc(false);
    //     setChangePin(false);
    //     setChangePass(false);
    // }
    // const handleChangeBlockedAcc =()=>{
    //     setChangeNotification(false);
    //     setChangeBlockedAcc(true);
    //     setChangePin(false);
    //     setChangePass(false);
    // }
    const [selectedTab, setSelectedTab] = useState('notification');

    const handleChangeTab = (tabName) => {
        setSelectedTab(tabName);
    }
    
  return (
    <Page
    pageContent={(
        <>
                <div className=' flex flex-col  h-full w-full'>
                    {/* background */}
                    <div className='px-20 py-6'><h1 className='font-[600] lg:md:text-[30px] text-[18px]'>Settings/ Change your Pin</h1></div>
                    <div className='flex lg:md:flex-row flex-col items-start justify-center h-calc(100% -[50px]) w-full lg:md:mx-0 px-2 gap-10'>
                    <div className=' flex-col flex  lg:md:w-[35%] w-fit'>
                    {/* left side settings */}
                    <div className='flex flex-col w-auto flex-wrap'>
                        <div className='flex flex-col bg-white rounded-[25px] border-[0.5px] border-[#dfdede] cursor-pointer' style={{boxShadow:'0px 10px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                           {/* notification */}
                           
                            <div className={`flex flex-row gap-3 pb-4 pt-6 px-8 rounded-t-[25px] ${selectedTab === 'notification' ? 'bg-[#C31A7F]/25' : ''}`}  onClick={() => handleChangeTab('notification')}>
                            <div className='flex pt-[4px]'><AiOutlineBell size={20} className='  text-[#C31A7F]'/></div>
                            <div className=' flex flex-col'>
                                <h3 className=' text-[18px]'>Notification</h3>
                                <p className='text-[14px] text-[#7E7E7E] '>Select the kinds of notifications you get about your activities, interests, and recommendations.</p>
                                
                            
                            </div>
                            </div>
                            <hr/>
                            {/* blocked accounts */}
                            <div className={`flex flex-row gap-3 py-4 px-8 ${selectedTab === 'blockedAccounts' ? 'bg-[#C31A7F]/25' : ''}`} onClick={() => handleChangeTab('blockedAccounts')}>
                            <div className='flex pt-[4px]'><BsPersonSlash size={20} className='  text-[#C31A7F]'/></div>
                            <div className=' flex flex-col'>
                                <h3 className='font-semibold text-[18px]'>Blocked Accounts</h3>
                                <p className='text-[14px] text-[#7E7E7E]'>Manage the accounts, words, and notifications that you’ve blocked.</p>
                                
                            </div>
                            </div>
                            <hr/>
                            {/* Change your Password */}
                            <div className={`flex flex-row gap-3 py-4 px-8 ${selectedTab === 'changePassword' ? 'bg-[#C31A7F]/25' : ''}`} onClick={() => handleChangeTab('changePassword')} >
                            <div className='flex pt-[4px]'><VscKey size={20} className='  text-[#C31A7F]'/></div>
                            <div className=' flex flex-col'>
                            <h3 className='font-semibold text-[18px]'>Change Your Password</h3>
                                <p className='text-[14px] text-[#7E7E7E]'>Change your password at any time.</p>
                                
                            </div>
                            </div>
                            <hr/>
                            {/* change your pin */}
                            <div className={`flex flex-row gap-3 pb-6 pt-4 px-8 rounded-b-[25px] ${selectedTab === 'changePin' ? 'bg-[#C31A7F]/50' : ''}`} onClick={() => handleChangeTab('changePin')}>
                            <div className='flex pt-[4px]'><VscKey size={20} className='  text-[#C31A7F]'/></div>
                            <div className=' flex flex-col'>
                            <h3 className='font-semibold text-[18px]'>Change your pin</h3>
                                <p className='text-[14px] text-[#7E7E7E]'>Change your pin at any time.</p>
                            </div>
                            </div>
                            </div>
                    </div>
                   
                    </div>
                
                {/* right side  */}

                <div className='flex-col justify-center  items-start flex lg:md:w-[60%] w-full'>
                    {/* change password code */}
                    {selectedTab === 'changePassword' && <SetPassword />}

                    {/* change Pin code */}
                    {selectedTab === 'changePin' && <ProfileLock />}

                    {/* change blocked accounts */}
                    {selectedTab === 'blockedAccounts' && <BlockedAccounts />}

                    {/* change Notifications */}    
                    {selectedTab === 'notification' && <Notification />}
                </div>
                </div>
                </div>
                        </> 
                        )}/>

  )
}

export default Settings
