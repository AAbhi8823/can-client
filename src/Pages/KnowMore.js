import React, { useEffect, useState } from 'react'
import NewNavigation from '../Components/NewNavigation'
import ColorCells from '../Photos/3ColorCells.png'
import MadeOfCells from '../Photos/MadeOfCells.png'
import CellsDestroy from '../Photos/CellsDestroy.png'
import VerticalCells from '../Photos/VerticalCells.png'
import BrokenCells from '../Photos/BrokenCells.png'
import BodyImage from '../Photos/BodyImage.png'
import LandingPageFooter from './LandingPageFooter'
import icebergExample from '../Photos/icebergExapmple.png'

import SearchLens from '../Photos/SearchLens.png'
import HomeIcons from '../Photos/HomeIcon.png'
import KnowAbout from '../Photos/KnowAbout.png'
import JoinMeet from '../Photos/JoinMeet.png'
import LogoCAn from '../Photos/LogoCAn.png'
import { NavLink } from 'react-router-dom';
import water1 from '../Photos/water1.png'
import water2 from '../Photos/water2.png'
import pradee from '../Photos/pradee.png'
import icebergExapmple from '../Photos/icebergExapmple.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import vector305 from '../Photos/Vector305.png'
// import vector304 from '../Photos/vector304.png'
import downArrow from '../Photos/downArrow.svg'
import NavLanding from '../Components/NavLanding'
import Madeof from '../Photos/Madeof.png'
import Madeof1 from '../Photos/Madeof1.png'
import Madeof2 from '../Photos/Madeof2.png'
import Madeof3 from '../Photos/Madeof3.png'
import Madeof4 from '../Photos/Madeof4.png'
import Iceberg1 from '../Photos/Iceberg1.png'
import { connect } from 'react-redux';
// import iceberg2 from '../Photos/iceberg2.png'
import iceberg2 from '../Photos/iceberg3.png'
// import Mobileice from '../Photos/Mobileice.png'
import Mobileice from '../Photos/Mobileice2.png'
import Body from '../Photos/Body.png'
import Ice from '../Photos/Ice.png'

const KnowMore = () => {


    const [scroll, setScroll] = useState(0);
    const [Nav, setNav] = useState(false);
    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        const checkScroll = () => {
            if (scroll > 0) {
                setNav(true);
            } else {
                setNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        checkScroll(); // Initial check when the component mounts

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scroll]);

    return (
        <>
            <div className='flex justify-center w-[100%]'>
                <NavLanding onStateChange={Nav} />
            </div>
            <div className='flex items-center justify-center pt-36 '>
                <h1 className='text-[2.604vw] text-center text-11 font-roboto font-bold px-5'>Know about <span className='text-[#B2437D]'>CANCER</span></h1>
            </div>
            <div className="grid grid-cols-1 px-[6%] pt-10  sm:grid-cols-2">
                <div className='pt-5 px-5'>
                    <div className='flex justify-center'>
                        <p className='text-[#084943] lg:block  text-12 hidden  text-end text-[1.041vw] '><span className='font-bold' >Cancer is sort of like a sickness, but you can't catch <br /> it like you catch a cold.</span>Here's how it works! Every <br /> living thing is made up of tiny little guys called <span className='font-bold'>cells.</span> </p>
                        <p className='text-[1.041vw] text-[#084943] lg:hidden block text-center font-roboto text-12  '>Cancer is sort of like a sickness, but you can't catch  it like you catch a cold.Here's how it works! Every  living thing is made up of tiny little guys called <span className='font-bold'>cells.</span></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={Madeof}  className='small-img w-[70%]' alt='madeofcells' />
                    </div>
                </div>
                <div className='pt-5 px-5'>
                    <div className='flex justify-center'>
                        <p className='text-[1.041vw] lg:block hidden text-[#084943] text-start font-roboto text-12  just-11' >Cells are like blocks, but they put themselves together. <br /><span className='font-bold'> One really cool thing about cells is that one cell <br /> can turn itself into two cells anytime it wants.</span></p>
                        <p className='text-[1.041vw] lg:hidden block text-[#084943] text-center font-roboto text-12  ' >Cells are like blocks, but they put themselves together. <span className='font-bold'> One really cool thing about cells is that one cell  can turn itself into two cells anytime it wants.</span></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={Madeof1}  className='small-img w-[40%]' alt='madeofcells' />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 px-[6%] pt-10  sm:grid-cols-2">
                <div className='pt-5 px-5'>
                    <div className='flex justify-center lg:px-10'>
                        <p className='text-[#084943] lg:block  hidden  text-12 text-center text-[1.041vw] '>Cells build body parts and make them work. All living things are made of cells, including humans, trees, and vegetables. <span className='font-bold'> Cells are polite, give space <br /> to work, and stop making new cells when there are enough to do a job.</span></p>
                        <p className='text-[1.031vw] text-[#084943] lg:hidden block text-center font-roboto text-12  '>Cells build body parts and make them work. All living things are made of cells, including humans, trees, and vegetables. <span className='font-bold'> Cells are polite, give space to work, and stop making new cells when there are enough to do a job.</span></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={MadeOfCells}  className='small-img w-[50%]' alt='madeofcells' />
                    </div>
                </div>
                <div className='pt-5 px-5'>
                    <div className='flex justify-center lg:Px-10'>
                        <p className='text-[1.041vw] lg:block  hidden text-[#084943] text-start font-roboto text-12  just-11' >Sometimes, a cell can become broken. It acts strangely and forgets its role, <br /> but it keeps making more cells. No one caused this. It's normal; healthy cells <br /> usually remove them, <span className='font-bold'>sometime healthy cells  don't see the broken cells.</span></p>
                        <p className='text-[1.041vw] lg:hidden  block text-[#084943] text-center font-roboto text-12 ' >Sometimes, a cell can become broken. It acts strangely and forgets its role, but it keeps making more cells. No one caused this. It's normal; healthy cells  usually remove them, <span className='font-bold'>sometime healthy cells  don't see the broken cells.</span></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={Madeof2}  className='small-img w-[70%]' alt='madeofcells' />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 px-[6%] pt-10  sm:grid-cols-2">
                <div className='pt-5 px-5'>
                    <div className='flex justify-center'>
                        <p className='text-[#084943] lg:block   hidden text-12 text-end text-[1.041vw] '>And the broken cells keep making more and more <br /> broken cells, faster and faster.  <span className='font-bold'> Before long, it's a huge <br /> mess. This huge mess of broken cells is called cancer.</span></p>
                        <p className='text-[1.041vw] text-[#084943] lg:hidden  block text-center font-roboto text-12  '>And the broken cells keep making more and more  broken cells, faster and faster.  <span className='font-bold'> Before long, it's a huge mess. This huge mess of broken cells is called cancer.</span></p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={Madeof3}  className='small-img w-[70%]' alt='madeofcells' />
                    </div>
                </div>
                <div className='pt-5 px-5'>
                    <div className='flex justify-center'>
                        <p className='text-[1.041vw] lg:block hidden text-[#084943] text-start font-roboto text-12  just-11' >Imagine someone scribbling on your paper while you’re drawing. <br /> That’s what cancer does to your body. <span className='font-bold'>It makes it tough for healthy <br /> cells to work properly, and the affected body part can’t function well.</span></p>
                        <p className='text-[1.041vw] lg:hidden  block text-[#084943] text-center font-roboto text-12' >Imagine someone scribbling on your paper while you’re drawing. That’s what cancer does to your body.It makes it tough for healthy  cells to work properly, and the affected body part can’t function well.</p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <img src={Body} className='small-img w-[60%]' alt='madeofcells' />
                    </div>
                </div>
            </div>


           
           
            

<div className='py-10 pb-0'>
    {/* <img src={iceberg2} className='lg:block md:block hidden  w-[100vw] ' alt="" /> */}
    <img src={Ice} className='lg:block md:block hidden  w-[100vw] ' alt="" />

    <img src={Mobileice} className='lg:hidden md:hidden block w-[100vw] ' alt="" />
</div>



                    <div className=' mt-20'>
                        <LandingPageFooter />
                    </div>
             
        </>
    )
}

export default KnowMore
