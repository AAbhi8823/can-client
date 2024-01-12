import React, { useState } from 'react'
import HomeNav from '../Components/HomeNav'
import VerticalAppointment from '../Components/VerticalAppointment'
import VerticalMedicine from '../Components/VerticalMedicine'
import premium from '../Photos/premium.png'
import HealthReco from '../Photos/HealthReco.png'
import { RiArrowDropDownLine } from 'react-icons/ri'
import SingleLineCalendar from '../Components/SingleLineCalender'
import VerticalSLC from '../Components/VericalSLC'
import { NavLink } from 'react-router-dom'
import SideMenu from '../Components/SideMenu'
import Page from "../Layouts/Pages";
const HealthRecord = () => {

    //vertical calender , appointments and Medicine
    const [vertical, setVertical] = useState('Upcoming')

    const toggleVertical = (item) => {
        setVertical(item)
    }

    return (
      <Page
        pageContent={
          <>
            {/* background */}
            <div className="bg-[#FEF8FD] w-full flex flex-row h-full">
              <div className="flex flex-col w-full px-[5%]">
                <h1 className="mt-6 text-lg lg:text-[1.2vw] text-[16px] font-semibold">
                  Health Record
                </h1>
                <div className="bg-white  mt-2 rounded-2xl  flex flex-col items-center gap-8 py-[100px] justify-center">
                  <div>
                    <img src={HealthReco} alt="Health_Record.jpg" />
                  </div>
                  <div className="lg:md:w-[25%] lg:text-[1.2vw] text-[16px] text-center text-[#696969]">
                    Add your document here of easy access anytime anywhere.
                  </div>
                  <div className="flex gap-4">
                    <NavLink to="/HealthRecord1">
                      <div className="    bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer">
                        Add health Record
                      </div>
                    </NavLink>
                    <NavLink
                      to={"/HealthRecord1"}
                      className="  bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer"
                    >
                      My Health Record
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    );
}

export default HealthRecord