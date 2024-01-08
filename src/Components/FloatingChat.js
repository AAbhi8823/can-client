import React, { useState } from 'react'
import { BsChat } from 'react-icons/bs'
import account from '../Photos/account.jpg'
import { IoMdClose } from 'react-icons/io'
import commentIcon from '../Photos/commentIcon.png'

const FloatingChat = () => {

    const [showChat, setShowChat] = useState(false)

    function toggleChat() {
        setShowChat(!showChat)
    }

    return (
        <>
            <div className="fixed bottom-[2%] right-[1%] m-4 "
                onClick={toggleChat}
            >
                <div className='bg-[#FFFFFF] w-7 h-7 rounded-full absolute left-10 right-4 flex items-center cursor-pointer justify-center'>
                    <div className='bg-[#C31A7F] w-6 h-6 rounded-full flex items-center justify-center'>
                        <p className='text-[#FFFFFF] text-[10px] font-semibold'>+2</p>
                    </div>
                </div>
                <div className="bg-[#efc41977] hover:bg-[#EFC31999] cursor-pointer text-white font-bold p-4 rounded-full">
                    <img src={commentIcon} className='w-6' alt='none' />
                </div>
            </div>

            <div className={`fixed z-[10] bottom-[0%]  right-[4%] lg:w-[20%] lg:h-[60%] w-[250px] h-[400px] bg-[#FFF]  border-[]  rounded-[40px] transition-all duration-300 ${showChat ? '-translate-y-[5%] ' : 'translate-y-[100%]'}`} style={{ boxShadow: '0px 20px 60px 0px rgba(195, 26, 127, 0.20)' }}>
                <div className=' mt-6 mx-4 '>
                    <div className='relative'>

                        <h1 className='text-center font-semibold'>
                            New message
                        </h1>

                        <div className='absolute top-2 right-3'
                            onClick={toggleChat}>
                            <IoMdClose />
                        </div>

                    </div>

                    <div className='py-4 px-16'>
                        <hr />
                    </div>

                    <div className=' pt-3 '>

                        <div className='flex flex-row items-center justify-between  '>

                            <div className='relative flex flex-row items-center gap-3'>
                                <div className='bg-[#FFFFFF] w-6 h-6 rounded-full absolute bottom-8 left-8 flex items-center justify-center'>
                                    <div className='bg-[#C31A7F] w-5 h-5 rounded-full flex items-center justify-center'>
                                        <p className='text-[#FFFFFF] text-[8px] font-semibold'>2</p>
                                    </div>
                                </div>
                                <img className='w-12 h-12 rounded-full cursor-pointer ' src={account} alt='none' />


                                <div className='cursor-pointer'>
                                    <h1 className='font-semibold text-[16px]q'>Iqra Aziz</h1>
                                    <p className='text-[12px] text-[#7E7E7E] font-semibold' >How are you ?</p>
                                </div>
                            </div>

                            <div className=''>

                                <p className='text-[10px] text-[#7E7E7E] font-semibold'>12:00 pm</p>
                            </div>
                        </div>








                    </div>
                </div>
            </div>

        </>
    )
}

export default FloatingChat