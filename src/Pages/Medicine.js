import React from 'react'
import { useState } from 'react'
import Medicineimg from '../Photos/Medicineimg.png'
import MedicinePopup from '../Components/MedicinePopup';
import { NavLink } from 'react-router-dom';
import Page from '../Layouts/Pages';


const Medicine = () => {
  const [medicine, setMedicine]=useState(false);
  const toggleMedicine= ()=>{
    setMedicine(!medicine);
};
   return (
     <Page
       pageContent={
         <>
           <div className="bg-[#FEF8FD] w-full flex flex-col items-center cursor-default h-full">
             {/* background */}

             <div className="flex flex-col w-[90%] mx-[5%] justify-center ">
               <h1 className=" mt-6 text-lg lg:text-[1.2vw] text-[16px] font-semibold">
                 Medicines
               </h1>
               <div className=" bg-white px-4 rounded-[16px] flex flex-col items-center gap-8 justify-center py-[100px]">
                 <div>
                   <img src={Medicineimg} alt="medicine image" />
                 </div>
                 <div className="lg:md:w-[30%]  text-center">
                   <p className=" text-[#696969] lg:text-[1.2vw] text-[16px]">
                     Add your Medicines and there timing here so we can help you
                     talking them on time.
                   </p>
                 </div>
                 <div className="flex gap-4">
                   <div
                     className="   bg-[#C31A7F] text-white  lg:text-[1.2vw] text-[16px] px-4 py-2 rounded-[20px] cursor-pointer"
                     onClick={toggleMedicine}
                   >
                     Add Schedule
                   </div>
                   {medicine && (
                     <MedicinePopup toggleMedicine={toggleMedicine} />
                   )}

                   <NavLink
                     to={"/Medicine1"}
                     className="  bg-[#C31A7F] text-white lg:text-[1.20vw]  text-[16px] px-4 py-2 rounded-[20px] cursor-pointer"
                   >
                     My Medicine
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

export default Medicine