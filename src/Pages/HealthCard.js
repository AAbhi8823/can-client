import React, { useEffect, useState } from 'react'
import HomeNav from '../Components/HomeNav'
import VerticalAppointment from '../Components/VerticalAppointment'
import VerticalMedicine from '../Components/VerticalMedicine'
import premium from '../Photos/premium.png'
import HealthReco from '../Photos/HealthReco.png'
import { RiArrowDropDownLine } from 'react-icons/ri'
import SingleLineCalendar from '../Components/SingleLineCalender'
import VerticalSLC from '../Components/VericalSLC'
import { NavLink, useNavigate } from 'react-router-dom'
import SideMenu from '../Components/SideMenu'
import Page from "../Layouts/Pages";
import Cookies from 'js-cookie'
import axios from 'axios'
import { baseurl } from "../Api/baseUrl";

const HealthCard = () => {

    const navigate = useNavigate();
    //vertical calender , appointments and Medicine
    const [vertical, setVertical] = useState('Upcoming')

    const toggleVertical = (item) => {
        setVertical(item)
    }

     const fetchHealthData = async () => {
       const token = Cookies.get("token");
       const id = localStorage.getItem("active_user");
       try {
         const response = await axios.get(
           `${baseurl}/api/healthcard?token=${token}&id=${id}`
         );
         if (response.data.status == true) {
           navigate("/Healthcard2")
         } else {
           console.log("No data received from the API");
         }
       } catch (error) {
         console.log("Error fetching health data:", error);
       }
     };

     useEffect(()=>{
      fetchHealthData()
     },[])

    return (
      <Page
        pageContent={
          <>
            {/* background */}
            <div className="bg-[#FEF8FD] w-full flex flex-row h-full">
              <div className="flex flex-col w-[90%] mx-[5%]">
                <h1 className="mt-6 text-lg lg:text-[1.2vw] text-[16px] font-semibold">
                  Health Card
                </h1>
                <div className="bg-white  mt-2 rounded-2xl gap-8 py-[100px] flex flex-col items-center justify-center">
                  <div>
                    <img src={HealthReco} alt="Health_Record.jpg" />
                  </div>
                  <div className="lg:md:w-[25%] px-4 lg:text-[1.2vw] text-[16px] text-center  text-[#696969] ">
                    Create your Fit-to-Fly Report Card by filling in your
                    details.
                  </div>
                  <NavLink to="/HealthCard1">
                    <div className="   bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer">
                      Make Your Health Card
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </>
        }
      />
    );
};

export default HealthCard