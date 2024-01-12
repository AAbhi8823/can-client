import { React, useEffect, useState } from "react";
import Page from "../Layouts/Pages";
import CalenderRecords from "../Components/CalenderRecords";
import MedicinePopup from '../Components/MedicinePopup';
import axios from "axios";
import apis from "../Api/baseUrl";
import { NavLink, useLocation } from "react-router-dom";
import { MdPictureAsPdf } from "react-icons/md";
import Cookies from "js-cookie";
import { MdShare } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";


const MedicineBank = () => {
    let token = Cookies.get("token")
    let id = localStorage.getItem("active_user")
    const location = useLocation();

    const [medicinePopup, setMedicinePopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const [medicines, setMedicines] = useState(null);

    const toggleMedicine = () => {
      setMedicinePopup(!medicinePopup);
    }
    const getMedicines = async () => {
        const today = new Date();
        let dt = today.getDate.toString().length == 1 ? 0 + today.getDate().toString() : today.getDate()
    
        let date = queryParams.get("date") ? queryParams.get("date") : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dt
        console.log("date", date);
        const { data } = await axios.get(`${apis.GET_MEDICINE}?creater_Id=${id}&token=${token}&date=${date}`)
        setMedicines(data?.data)
        console.log("med",data.data)
      }
      useEffect(() => {

        let id = localStorage.getItem("active_user")
        if (token && id) {
          getMedicines()
        }
      }, [queryParams.get("date")])

      const data = [
        {
            id : 1,
            heading : "Capecitabine",
            title : "Oncology",
            date : "01/01/2023- 02/02/2023",
            title2 : "OD"

        },
        {
            id : 2,
            heading : "Capecitabine",
            title : "Oncology",
            date : "01/01/2023- 02/02/2023",
            title2 : "OD"

        },
        {
            id : 3,
            heading : "Capecitabine",
            title : "Oncology",
            date : "01/01/2023- 02/02/2023",
            title2 : "OD"

        },
        {
            id : 4,
            heading : "Capecitabine",
            title : "Oncology",
            date : "01/01/2023- 02/02/2023",
            title2 : "OD"

        },
        {
            id : 5,
            heading : "Capecitabine",
            title : "Oncology",
            date : "01/01/2023- 02/02/2023",
            title2 : "OD"

        }
      ]
    
  return (
    <Page pageContent={(
        <>
        <div className="">
        <div className="flex">
    <div className="bg-[#FEF8FD] w-full justify-between flex flex-row h-full">
    <div className=' mt-6 flex  m-4'>
              <button className="lg:text-[1.20vw] flex   lg:md:py-2 lg:md:px-10 p-2 shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] rounded-[15px] w-fit h-fit text-center"> Medicine</button>               
                </div >
                <div className="mt-6 px-5">
                   <button className='lg:text-[1.20vw] text-[16px] end-2   lg:z-0  bottom-4 lg:bottom-0  lg:py-2  p-2   bg-[#C31A7F] text-white  shadow-lg rounded-[15px] w-fit text-center' onClick={toggleMedicine}>  Add Medicine  </button>
                </div>
                {
                  medicinePopup && (
                    <MedicinePopup toggleMedicine={toggleMedicine} getMedicines={getMedicines} />
                  )
                }
        
        </div>
        
    </div>
    <div className="lg:px-20">
    <div className="flex flex-wrap justify-center md:justify-between lg:justify-between">
        <div></div>
    <div className="py-5 scale-75">
                  <CalenderRecords />
                </div>
                <div className="flex px-5 items-center">
                  <NavLink to={"/Medicine1"}>
                <button className="bg-[#A94360] text-white lg:text-[1.04vw] text-[16px] py-1 px-4 border border-pink-700 rounded-full">
  Medicine Bank
</button>
</NavLink>
                </div>
               
    </div>
<div className="flex flex-wrap justify-center md:justify-between lg:justify-between">
<div className="flex px-10 mt-2 items-center">
                <button className="bg-[#A94360]  lg:text-[1.04vw] text-[16px] text-white py-1 px-10 border border-pink-700 rounded">
                On Going Medicines</button>
                </div>
              <div className="flex mt-2 gap-5 px-5  ">
                <div className=" rounded-[12px] bg-[#FFE175]  lg:text-[1.04vw] text-[16px] text-[#C31A7F]  p-2 flex items-center cursor-pointer  text-[14px]">
                <button className="text-brown">
                <MdPictureAsPdf />
                </button>
                Export as default
                </div>
                <div className="bg-[#FFE175]  p-2 rounded-[12px] lg:text-[1.04vw] text-[16px]   cursor-pointer flex justify-center items-center  shadow-md">
                <MdShare className="color-white" />
                  </div>
                  <div className="cursor-pointer flex items-center  lg:text-[1.04vw] text-[16px] rounded-[12px] bg-[#FFE175] p-2">
                  <BiInfoCircle />
                  </div>
              </div>
  

                
</div>



    <div className=" flex flex-wrap justify-around gap-5 px-5 mt-5">
    {data.map((item,index)=>(
    <div className="border-[#C4C4C4] w-[100%] md:w-[48%] lg:w-[30%]  border-[1px] bg-[#fff] rounded-[20px] mt-5 px-10  py-6 justify-center" key={index}>
        <div className="flex  justify-between py-3">
            <h1 className="font-bold lg:text-[1.20vw] text-[20px]">{item.heading}</h1>
            <p className="text-[#7E7E7E] lg:text-[1.04vw] text-[16px] px-5">{item.title}</p>
        </div>
        <div className="flex justify-between py-3">
            <h1 className="text-[#C31A7F]  lg:text-[1.04vw] text-[16px]">{item.date}</h1>
            <p className="text-[#A94360] px-5  lg:text-[1.04vw] text-[16px]">{item.title2}</p>
        </div>
    </div>
    ))}
</div>

<div className="pt-5 flex  justify-center">
<button className=" lg:text-[1.04vw] text-[16px] bg-[#A94360] text-white py-1 px-16 border border-pink-700 rounded">
               Medical History</button>
                
</div>


<div className="lg:flex flex-wrap pt-10" >
   <div className="lg:w-[50%] mb-6 ">
    <div className="flex justify-center ">
    <button className="font-bold bg-[#EFC319] lg:text-[1.04vw] text-[16px] text-white py-1 px-16 border  rounded">
     January</button>
     </div>
     <div className=" flex flex-wrap justify-around gap-5 px-5 mt-3">
     {data.map((item,index)=>(
    <div className="border-[#C4C4C4] w-[100%] md:w-[40%] lg:w-[40%]  border-[1px] bg-[#fff] rounded-[20px] mt-5  py-6" key={index}>
    <div className="flex  justify-between ">
            <h1 className="font-bold lg:text-[0.84vw] text-[13px] px-5">{item.heading}</h1>
            <p className="text-[#7E7E7E] lg:text-[.50vw] text-[8px] px-5">{item.title}</p>
        </div>
        <div className="flex justify-between px-3 py-3">
            <h1 className="text-[#C31A7F]  lg:text-[1vw] text-[15px]">{item.date}</h1>
            <p className="text-[#A94360] lg:text-[.70vw] text-[8px] px-5">{item.title2}</p>
        </div>
    </div>
   ))}
     </div>
  
    </div>
    <div className="lg:w-[50%] mb-6 border-l-[3px]">
    <div className="flex justify-center ">
    <button className="font-bold lg:text-[1.04vw] text-[16px] bg-[#EFC319] text-white py-1 px-16 border  rounded">
     February</button>
     </div>
     <div className=" flex flex-wrap justify-around gap-5 px-5 mt-3">
     {data.map((item,index)=>(
    <div className="border-[#C4C4C4] w-[100%] md:w-[40%] lg:w-[40%]  border-[1px] bg-[#fff] rounded-[20px] mt-5  py-6" key={index}>
    <div className="flex  justify-between ">
            <h1 className="font-bold  lg:text-[0.84vw] text-[13px] px-5">{item.heading}</h1>
            <p className="text-[#7E7E7E] lg:text-[.50vw] text-[8px] px-5">{item.title}</p>
        </div>
        <div className="flex justify-between px-3 py-3">
            <h1 className="text-[#C31A7F]  lg:text-[1vw] text-[15px] ">{item.date}</h1>
            <p className="text-[#A94360] lg:text-[.70vw] text-[8px] px-5">{item.title2}</p>
        </div>
    </div>
   ))}
     </div>
  
    </div>
</div>
<div className="lg:flex flex-wrap pt-10" >
   <div className="lg:w-[50%]  mb-6  ">
    <div className="flex justify-center ">
    <button className="font-bold bg-[#EFC319] lg:text-[1.04vw] text-[16px] text-white py-1 px-16 border  rounded">
     March</button>
     </div>
     <div className=" flex flex-wrap justify-around gap-5 px-5 mt-3">
     {data.map((item,index)=>(
    <div className="border-[#C4C4C4] w-[100%] md:w-[40%] lg:w-[40%]  border-[1px] bg-[#fff] rounded-[20px] mt-5  py-6" key={index}>
    <div className="flex  justify-between ">
            <h1 className="font-bold   lg:text-[0.84vw] text-[13px] px-5">{item.heading}</h1>
            <p className="text-[#7E7E7E] lg:text-[.50vw] text-[8px] px-5">{item.title}</p>
        </div>
        <div className="flex justify-between px-3 py-3">
            <h1 className="text-[#C31A7F]   lg:text-[1vw] text-[15px]">{item.date}</h1>
            <p className="text-[#A94360] lg:text-[.70vw] text-[8px] px-5">{item.title2}</p>
        </div>
    </div>
   ))}
     </div>
  
    </div>
    <div className="lg:w-[50%] mb-6 border-l-[3px]">
    <div className="flex justify-center ">
    <button className="font-bold bg-[#EFC319] lg:text-[1.04vw] text-[16px] text-white py-1 px-16 border  rounded">
     April</button>
     </div>
     <div className=" flex flex-wrap justify-around gap-5 px-5 mt-3">
     {data.map((item,index)=>(
    <div className="border-[#C4C4C4] w-[100%] md:w-[40%] lg:w-[40%]  border-[1px] bg-[#fff] rounded-[20px] mt-5  py-6" key={index}>
    <div className="flex  justify-between ">
            <h1 className="font-bold  lg:text-[0.84vw] text-[13px] px-5">{item.heading}</h1>
            <p className="text-[#7E7E7E] lg:text-[.50vw] text-[8px] px-5">{item.title}</p>
        </div>
        <div className="flex justify-between px-3 py-3">
            <h1 className="text-[#C31A7F] lg:text-[1vw] text-[15px] ">{item.date}</h1>
            <p className="text-[#A94360] lg:text-[.70vw] text-[8px] px-5">{item.title2}</p>
        </div>
    </div>
   ))}
     </div>
  
    </div>
</div>
    </div>
 







        </div>

    </>
    )} />
  );
    }
export default MedicineBank;

