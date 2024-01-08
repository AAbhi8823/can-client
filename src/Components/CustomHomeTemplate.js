import React, { useState } from 'react'
import HomeNav from '../Components/HomeNav'
import VerticalAppointment from '../Components/VerticalAppointment'
import VerticalMedicine from '../Components/VerticalMedicine'
import premium from '../Photos/premium.png'
import { RiArrowDropDownLine } from 'react-icons/ri'
import SingleLineCalendar from '../Components/SingleLineCalender'
import VerticalSLC from '../Components/VericalSLC'


const HealthRecord = () => {

    //vertical calender , appointments and Medicine
    const [vertical, setVertical] = useState('Upcoming')

    const toggleVertical = (item) => {
        setVertical(item)
    }

    return (
        <>
            <div className=' h-[100%]'>

                <div>
                    <HomeNav />
                </div>

                <div className='flex'>
                    {/* background */}
                    <div className='bg-[#FEF8FD] h-[100vh] w-full flex flex-row'>

                    <div className='flex flex-col w-[65%] mx-[5%]'>
                            <div className='bg-white h-[24vh] ml-[13%] mt-8 rounded-2xl shadow-xl' >

                            </div>


                            

                        </div>

                        {/* right side */}
                        <div className='w-max pt-8 px-4 h-max relative'>
                            <div className=''>
                                <div className='bg-gradient-to-r from-[#D4F1FF] to-[#FFFFFF] h-[15%] w-[150%] rounded-2xl shadow-xl '>
                                    <img src={premium} className=' h-[100%] w-[60%] top-[0%] left-[43%] relative' />
                                </div>

                                <div className='text-center w-max absolute top-[18%] left-[20%] font-semibold'>
                                    <h1>Try Premium</h1>
                                    <h1>for free</h1>
                                </div>

                                <div className='w-max absolute top-[45%] left-[20%] text-xs text-[#00000073]'>
                                    One month free
                                </div>

                                <div className='w-max absolute top-[68%] left-[15%] bg-gradient-to-r from-[#efc41955] to-[#ed839a54] p-2 px-8 rounded-3xl'>
                                    Try free
                                </div>

                            </div>
                        </div>

                        {/* calender */}
                        <div className='h-[60%] w-[20%] bg-white top-[40%] left-[76%] absolute rounded-2xl shadow-xl overflow-hidden px-2'>

                            <div className=' pt-2'>
                                <SingleLineCalendar />
                            </div>

                            <div className='p-4'>
                                <hr />
                            </div>

                            <div className='px-3 font-semibold flex justify-between'>
                                <h1 onClick={() => toggleVertical('Upcoming')}
                                    className={vertical === 'Upcoming' ? 'text-black' : 'text-[#C4C4C4]'}>Upcoming</h1>
                                <h1 onClick={() => toggleVertical('Appointment')}
                                    className={vertical === 'Appointment' ? 'text-black' : 'text-[#C4C4C4]'}>Appointment</h1>
                                <h1 onClick={() => toggleVertical('Medicines')}
                                    className={vertical === 'Medicines' ? 'text-black' : 'text-[#C4C4C4]'}>Medicines</h1>
                            </div>

                            <div className=''>
                                <div className='flex flex-col'>
                                    {vertical === 'Upcoming' &&
                                        (<div className='w-full'>
                                            <VerticalSLC />
                                        </div>)}
                                    {vertical === 'Appointment' &&
                                        (<div className='w-full'>
                                            <VerticalAppointment />
                                        </div>)}
                                    {vertical === 'Medicines' &&
                                        (<div className='w-full'>
                                            <VerticalMedicine />
                                        </div>)}

                                    <div className='w-full h-[10%] absolute top-[90%] bg-white flex justify-center items-center font-semibold'>
                                        <div className='bg-[#c31a7f3c] flex items-center gap-2 pl-2 rounded-2xl'>
                                            <div className='flex px-4 items-center'>
                                                View all
                                                <RiArrowDropDownLine size={30} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default HealthRecord