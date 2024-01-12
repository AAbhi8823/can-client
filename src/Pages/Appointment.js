import React, { useState } from 'react';
import HomeNav from '../Components/HomeNav';
import Appoint from '../Photos/Appoint.png';
import SideMenu from '../Components/SideMenu';
import AppointmentPopup from '../Components/AppointmentPopup';
import Page from '../Layouts/Pages';
import axios from 'axios';
import apis from '../Api/baseUrl';
import { NavLink } from 'react-router-dom';

const Appointment = () => {
  //pop up
  const [pop, setPop] = useState(false);

  function PopUp() {
    setPop(!pop);
  }


  return (
    <Page
      pageContent={
        <>
          <div className="bg-[#FEF8FD] w-full flex flex-col items-center cursor-default h-full ">
            {/* background */}
            <div className="flex flex-col w-[90%]  mx-[5%]">
              <h1 className=" mt-6 text-lg lg:text-[1.2vw] text-[16px] font-semibold">
                Appointments
              </h1>
              <div className=" bg-white  mt-2 rounded-2xl gap-8 py-[90px] flex flex-col items-center justify-center">
                <div>
                  <img src={Appoint} className="" alt="Health_Record.jpg" />
                </div>
                <div className="lg:md:w-[30%] px-4 lg:text-[1.2vw] text-[16px] text-center  text-[#696969]">
                  <p className="">
                    Add your Appointment and their timing here so we can help
                    you keep track of them on time.
                  </p>
                </div>
                <div className='flex gap-4'>
                  <div
                    className="  bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer"
                    onClick={PopUp}
                  >
                    Add Appointment
                  </div>
                  <NavLink
                    to={"/appointment1"}
                    className="  bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer"
                  >
                    My Appointments
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* pop up */}
          {pop && <AppointmentPopup />}
        </>
      }
    />
  );
};

export default Appointment;
