import React from 'react'
import Lottie from 'lottie-react';
import plat1 from '../Photos/GIF/Group.json'
import plat2 from '../Photos/GIF/feedback.json'
import plat3 from '../Photos/GIF/three-friends.json'
import faimily from '../Photos/faimily.png'
import manyPeople from '../Photos/manyPeople.png'
import BeechPic from '../Photos/beechpic.png'
import LandingPage1 from '../Photos/LandingPage1.png'
import baloon2 from '../Photos/Baloon2.png'
import baloon1 from '../Photos/baloon1.png'
import rightSideImage from '../Photos/rightSideImage.png'
import leftSideImage from '../Photos/leftSideImage.png'
import caretaker from '../Photos/Caretaker.png'
import newtwork from '../Photos/Network.png'
import bullsEye from '../Photos/BullsEye.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import leftCloud1 from '../Photos/leftCloud1.png'
import leftCloud2 from '../Photos/leftCloud2.png'
import leftCloud3 from '../Photos/leftCloud3.png'
import leftCloud4 from '../Photos/leftCloud4.png'
import leftCloud5 from '../Photos/leftCloud5.png'
import leftCloud6 from '../Photos/leftCloud6.png'
import leftCloud7 from '../Photos/leftCloud7.png'

import rightCloud1 from '../Photos/rightCloud1.png'
import rightCloud2 from '../Photos/rightCloud2.png'
import rightCloud5 from '../Photos/rightCloud5.png'
import rightCloud6 from '../Photos/rightCloud6.png'
import firstFrame from '../Photos/firstFrame.png'
import firstFlowerFrame from '../Photos/firstFlowerFrame.png'
import secFlowerFrame from '../Photos/secFlowerFrame.png'
import Greenbg from '../Photos/Greenbg.png'




import { useState } from 'react';

function LandingPage() {
    const imageStyle = {
        width: '30%',
        height: 'auto',
        margin: '0 auto',
    };

    const imagesecStyle = {
        width: '23%',
        height: 'auto',
        margin: '0 auto',
    };

    const [state, setState] = useState(true)

    const handleEnter = () => setState(false)
    const handleLeave = () => setState(true)

    const [Hover, setHover] = useState(false)

    return (
        <>
            <div className='overflow-x-hidden'>
                <div className='relative' >
                    {/* <img className='w-[100%]' src={LandingPage1} /> */}
                    <img className='w-[100%]' src={BeechPic} />
                    <div className='w-full absolute top-[15.5rem]' >
                        <div className='relative' >
                            <img
                                src={leftCloud1}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 left-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full left-0 h-[200px] animate duration-[1s]"}
                            />
                            <img
                                src={leftCloud3}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 left-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full left-[-650px] h-[200px] animate duration-[1s]"}
                            />
                            <img
                                src={leftCloud4}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 left-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full left-0 h-[200px] animate duration-[1s]"}
                            />
                            <img
                                src={leftCloud6}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 left-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full left-[-650px] h-[200px] animate duration-[1s]"}
                            />
                        </div>
                        <div className='flex justify-end' >
                            <img
                                src={rightCloud1}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 right-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full right-[-650px] h-[200px] animate duration-[1s]"}
                            />
                            <img
                                src={rightCloud2}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 right-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full right-0 h-[200px] animate duration-[1s]"}
                            />
                            <img
                                src={rightCloud6}
                                alt="Overlay"
                                className={state ? 'absolute top-0 w-full opacity-40 right-[-100%] h-[200px] animate duration-[1s]' : "absolute opacity-40 top-0 w-full right-[-650px] h-[200px] animate duration-[1s]"}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 absolute top-0 w-full'>
                        <div className=''>
                            <div className={state ? 'w-[15%] absolute left-[0px] animate duration-[1s] ' : 'w-[15%] absolute left-[-300px] animate duration-[1s] '}>
                                <img src={leftSideImage} />
                            </div>
                        </div>
                        <div className=''>
                            <div className={state ? 'w-[15%] flex justify-end absolute right-[0px] animate duration-[1s] ' : 'w-[15%] justify-end absolute right-[-300px] animate duration-[1s] '} >
                                <img src={rightSideImage} />
                            </div>
                        </div>
                    </div>
                    <div className='absolute w-full lg:top-[10.5rem] top-20 grid grid-cols-4 h-[50vh] ' onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
                        <div className='relative'>
                            <div className='flex justify-end w-full absolute animate-balloonUpAndDown balloon' >
                                <img className='w-[30%]  ' src={baloon2} />
                            </div>
                        </div>
                        <div className='col-span-2 py-11' >
                            <div className='flex justify-center'>
                                <h2 className='text-sm mb-[15px] text-center text-[#084943] font-bold ' >Join the fight against cancer!</h2>
                            </div>
                            <div className='flex justify-center ' >
                                <button className='text-center text-[1.3vw]  bg-[#084943] text-[#fff] rounded-full px-[25px] py-[5px] outline-none ' >Join a meeting</button>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className=' h-[50%] w-full absolute animate-balloonUpAndDown balloon' >
                                <img className='w-[20%]' src={baloon1} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mx-auto mt-6'>
                    <div>
                        <div>
                            <p className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold' >
                                We can’t even imagine what you’re going through
                            </p>
                        </div>
                        <div>
                            <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] ' >
                                Cancer is so widespread in India with <span className='text-[#A94360]'>16 lakh new cases every year</span> yet the community is <br /> so isolated and hel pless.Let's strengthen the community together.
                            </p>
                        </div>
                    </div>
                    <div>
                        {/* <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showArrows={false}> */}

                        <Carousel infiniteLoop showThumbs={false} showArrows={false}>
                            <div className='py-[50px]' onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} >
                                <div>
                                    <img className='' style={imageStyle} src={firstFrame} />
                                    <div style={imagesecStyle} className={Hover ? 'absolute top-[50px] left-[596px] animate duration-[3s] ' : 'hidden animate duration-[3s]'}  >
                                        <img src={Greenbg} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 absolute top-[25%] lg:top-[20%] ' >
                                    <div className='flex justify-end' >
                                        <div className='w-[30%]' >
                                            <img className='' src={firstFlowerFrame} />
                                        </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <div className='w-[30%]' >
                                            <img className='' src={secFlowerFrame} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <h2 className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                                        Emotional Support
                                    </h2>
                                    <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                                        CAN aims to provide a non- judgemental empathetic space <br /> to the community so that they can be heard and understood.
                                    </p>
                                </div>
                            </div>

                            <div className='py-[50px]' onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} >
                                <div>
                                    <img className='' style={imageStyle} src={firstFrame} />
                                    <div style={imagesecStyle} className={Hover ? 'absolute top-[50px] left-[596px] animate duration-[3s] ' : 'hidden animate duration-[3s]'}  >
                                        <img src={Greenbg} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 absolute top-[25%] lg:top-[20%] ' >
                                    <div className='flex justify-end' >
                                        <div className='w-[30%]' >
                                            <img className='' src={firstFlowerFrame} />
                                        </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <div className='w-[30%]' >
                                            <img className='' src={secFlowerFrame} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <h2 className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                                        Emotional Support
                                    </h2>
                                    <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                                        CAN aims to provide a non- judgemental empathetic space <br /> to the community so that they can be heard and understood.
                                    </p>
                                </div>
                            </div>

                            <div className='py-[50px]' onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} >
                                <div>
                                    <img className='' style={imageStyle} src={firstFrame} />
                                    <div style={imagesecStyle} className={Hover ? 'absolute top-[50px] left-[596px] animate duration-[3s] ' : 'hidden animate duration-[3s]'}  >
                                        <img src={Greenbg} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 absolute top-[25%] lg:top-[20%] ' >
                                    <div className='flex justify-end' >
                                        <div className='w-[30%]' >
                                            <img className='' src={firstFlowerFrame} />
                                        </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <div className='w-[30%]' >
                                            <img className='' src={secFlowerFrame} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <h2 className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                                        Emotional Support
                                    </h2>
                                    <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                                        CAN aims to provide a non- judgemental empathetic space <br /> to the community so that they can be heard and understood.
                                    </p>
                                </div>
                            </div>
                            {/* <div className='py-[50px]' >
                                <img style={imageStyle} src={newtwork} />
                                <div className="mt-5 ">
                                    <h2 className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                                        You are not alone!
                                    </h2>
                                    <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                                        Acknowledging and learning from individual  experiences. Reassuring individuals <br /> that their struggles are valid and they are not alone in this fight against cancer
                                    </p>
                                </div>
                            </div>
                            <div className='py-[50px]' >
                                <img style={imageStyle} src={bullsEye} />
                                <div className="mt-5 ">
                                    <h2 className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                                        Empathy comes from shared experiences
                                    </h2>
                                    <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                                        Opening up and venting your cancer-related concerns will provide a sense of connection, <br /> as people on the same boat will truly empathise with your experiences and offer a warm <br /> and comforting presence.
                                    </p>
                                </div>
                            </div> */}
                        </Carousel>
                    </div>
                    <div>
                        <p className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold ' >
                            Our Vision
                        </p>
                        <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] '>
                            Supporting cancer patients with genuine care. We aim to create a platform <br /> where they find a safe space, kindling hope and strength. Spreading <br /> awareness, partnering with experts, nurturing well-being. Together, <br /> conquering cancer, inspiring healing and growth.
                        </p>
                        <p className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw] mt-[40px] text-[#929292] mb-3 '>CAN as an initiative started because</p>
                    </div>
                    <div className='flex justify-center' >
                        <button className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw]  bg-[#88C2C8] text-[#fff] rounded-full hover:bg-[#084943] px-[25px] py-[10px]' >Our Stdddory</button>
                    </div>
                    <div className='flex items-center justify-center lg:py-[100px] md:py-[100px] '>
                        <img className='object-cover px-[10%] sm:w-[100%] lg:w-[100%]' src={manyPeople} alt='none' />
                    </div>
                    <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 mt-5 gap-14 ' >
                        <div className='' >
                            <div className='flex justify-center' >
                                <Lottie style={{ width: '30%' }} animationData={plat3} />
                            </div>
                            <div className='flex justify-center' >
                                <p className='text-center lg:text-[1.5vw] text-[#9D1F60] font-bold md:text-[1.5vw] text-[3vw] '> CAN Companion</p>
                            </div>
                            <div className='flex justify-center mt-5 '>
                                <ul className='list-disc' >
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Hassle free whatsapp notification with <br /> access to your health vault
                                    </li>
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Medicine and appointment reminders on <br /> whatsapp itself
                                    </li>
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Get notifications to the meetings directly
                                    </li>
                                    <li className='  mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        One place for all your cancer needs
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='' >
                            <div className='flex justify-center' >
                                <Lottie style={{ width: '30%' }} animationData={plat2} />
                            </div>
                            <div className='flex justify-center' >
                                <p className='lg:text-[1.5vw] text-[#9D1F60] font-bold md:text-[1.5vw] text-[3vw] '>Feed</p>
                            </div>
                            <div className='flex justify-center mt-5 '>
                                <ul className='list-disc' >
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Share and read your moods, thoughts <br /> and success stories
                                    </li>
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Share your cancer timelines with a <br /> verified community on the same <br />frequency.
                                    </li>
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Find curated information on cancerF
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='' >
                            <div className='flex justify-center' >
                                <Lottie style={{ width: '30%' }} animationData={plat1} />
                            </div>
                            <div className='flex justify-center' >
                                <p className='text-center lg:text-[1.5vw] text-[#9D1F60] font-bold md:text-[1.5vw] text-[3vw] '>Support Group Meetings</p>
                            </div>
                            <div className='flex justify-center mt-5 ' >
                                <ul className='list-disc' >
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Register for your support meetings
                                    </li>
                                    <li className=' mb-3 font-bold md:text-[0.7vw] text-[2.5vw]'>
                                        Place to vent, share experience and learn from veterans
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='px-[80px] py-[50px]' >
                        <p className='lg:text-[3vw] md:text-[3vw] text-[6vw]  mb-[15px] text-center text-[#084943] font-bold '>Let’s fight cancer together!</p>
                        <div className='flex justify-center'>
                            <button className='text-center lg:text-[1.5vw] md:text-[1.5vw] text-[3vw]  bg-[#88C2C8] text-[#fff] rounded-full hover:bg-[#084943] px-[25px] py-[10px]'>
                                Start Your Journey
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={faimily} alt='none' style={{ width: '100%' }} />
                </div>
            </div>
        </>

    )
}

export default LandingPage
