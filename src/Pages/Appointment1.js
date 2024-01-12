import React, { useEffect, useRef, useState } from 'react'
import CalenderRecords from '../Components/CalenderRecords'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { TfiClipboard } from 'react-icons/tfi'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AppointmentPopup from '../Components/AppointmentPopup'
import Page from '../Layouts/Pages';
import axios from 'axios'
import apis from '../Api/baseUrl'
import Cookies from 'js-cookie'
const Appointment1 = () => {

  //pop up
  const [pop, setPop] = useState(false)
  const [edit, setedit] = useState("")
  const [edit_id, setedit_id] = useState("")
  function PopUp() {
    setPop(!pop)
  }
  const getcurrentdate = () => {
    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    console.log(`${currentHours}:${currentMinutes}:${currentSeconds}`);
    return currentHours + "/" + currentMinutes + "/" + currentSeconds

  }

  const [isClickedAppointment, setIsClickedAppointment] = useState(true)
  const handleIsClickedAppointment = () => {
    setIsClickedAppointment(!isClickedAppointment);
  }
  const [isClickedMedicine, setIsClickedMedicine] = useState(false)
  const handleIsClickedMedicine = () => {
    setIsClickedMedicine(!isClickedMedicine);
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const appointmentName = queryParams.get('appointmentName');
  const doctorName = queryParams.get('doctorName');
  const hospitalName = queryParams.get('hospitalName');
  const hospitalAddress = queryParams.get('hospitalAddress');
  const appointmentDate = queryParams.get('appointmentDate');
  const appointmentTime = queryParams.get('appointmentTime');
  const appointmentNote = queryParams.get('appointmentNote');



  const [notePop, setNotePop] = useState(false);
  const handleNotePopUp = () => {
    setNotePop(!notePop);
  }


  const [appoinmentdatea, setappoinmentData] = useState([])
  const [temp, settemp] = useState(queryParams.get("edit"))

  const getappointment = async (token, id) => {
    try {
      const today = new Date();
      let dt = today.getDate.toString().length == 1 ? 0 + today.getDate().toString() : today.getDate()
      const { data } = await axios.post(`${apis.GET_APPOINTMENT}?token=${token}`, {
        date: queryParams.get("date") ? queryParams.get("date") : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dt, patients_id: id
      })

      if (data.status == true) {
        setappoinmentData(data.data)
      } else {
        setappoinmentData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAppointment=()=>{
    
  }

  useEffect(() => {
    let token = Cookies.get("token")
    let id = localStorage.getItem("active_user")
    if (token && id) {
      getappointment(token, id)
      settemp("")
    }
  }, [queryParams.get("date")])

  return (
    <Page pageContent={(
    <>
    
        {/* background */}
        <div className='bg-[#FEF8FD] w-full h-full flex flex-row relative'>


          <div className='flex flex-col w-full lg:md:mx-[5%] py-10 mx-auto '>

            <div className='  mt-6 flex justify-between m-4  '>
              <div className={`flex lg:md:gap-8 gap-3  lg:md:w-[50%] w-full`}>

                <NavLink to='/appointment1'> <button className={`lg:text-[1.20vw] flex   lg:md:py-2 lg:md:px-6 p-2 rounded-[15px] w-fit text-center h-fit '  ${isClickedAppointment ? 'bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)]' : 'bg-[#ffffff7b] '} `} onClick={() => handleIsClickedAppointment()}>Appointments</button>  </NavLink>
                {/* <NavLink to='/Medicine1'><button className={`lg:text-[1.20vw] flex   lg:md:py-2 lg:md:px-10 p-2 shadow-[0px_5px_20px_0px_rgba(0,0,0,0.05)] rounded-[15px] w-fit h-fit text-center ${isClickedMedicine ? 'bg-white shadow-lg' : 'bg-[#ffffff7b] '}`} onClick={() => { handleIsClickedMedicine() }}> Medicine</button>    </NavLink> */}
              </div>
              <div> 
                <button className='lg:text-[1.20vw] text-[16px] lg:h-[5vh] lg:block  hidden  text-sm  end-2 z-10 lg:z-0  bottom-4 lg:bottom-0  lg:py-2 lg:px-6 p-2   bg-[#C31A7F] text-white  shadow-lg rounded-[15px] w-fit text-center' onClick={PopUp}>  Add Appointment     </button>
                <button className='lg:text-[1.20vw] text-[16px] lg:h-[5vh] lg:hidden  block  text-sm  end-2 z-10 lg:z-0  bottom-4 lg:bottom-0  lg:py-2 lg:px-6 p-2   bg-[#C31A7F] text-white  shadow-lg rounded-[15px] w-fit text-center' onClick={PopUp}>  Add </button>
                </div>

              {/* pop up */}
              {pop && (<AppointmentPopup edit={edit} edit_id={edit_id} getappointment={getappointment} />)}

            </div>

            <div className='bg-white min-h-[80vh] max-h-fit   mt-2 rounded-2xl shadow-xl flex flex-col items-center px-8 ' >

              <div className='py-5 scale-75'>
                <CalenderRecords />
              </div>

              <div className='bg-[#FEF8FD] relative min-h-[70%] max-h-fit w-full rounded-[24px] p-6 flex flex-col gap-3'>

                <h1 className=''>
                  Today's Appointment
                </h1>
                <table className="relative table   justify-around bg-white border-gray-200 border rounded-[20px] text-left md:p-4 p-1 " style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>

                  {appoinmentdatea && appoinmentdatea.map((it) => {
                    console.log(it)
                    return (
                      <tr className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly  overflow-y-visible">
                        <td className="flex flex-col items-center text-left justify-center   lg:border-[#C4C4C4] pr-4">
                          <h1 className="font-semibold lg:text-[1vw] whitespace-nowrap text-[18px]">
                            {new Date(it.date).toLocaleDateString()}
                          </h1>
                          <h1 className="text-[#7E7E77] px-6 lg:text-[1vw] lg:px-0">
                            {it.time}
                          </h1>
                        </td>

                        <td className="flex flex-col lg:flex-col md:flex-row items-start text-left   px-4 gap-2 lg:border-r-[1px] lg:border-l-[1px] lg:border-[#C4C4C4]">
                          <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                            Appointment name
                          </div>
                          <div className="font-semibold lg:text-[1vw] text-[15px]">
                            {it.appointmentName}
                          </div>
                        </td>
                        <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2    lg:border-[#C4C4C4]">
                          <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                            Doctor's name
                          </div>
                          <div className="font-semibold lg:text-[1vw] text-[15px]">
                            {it.doctorName}
                          </div>
                        </td>

                        <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2  lg:border-r-[1px] lg:border-l-[1px] lg:border-[#C4C4C4]">
                          <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                            Hospital's name
                          </div>
                          <div className="font-semibold lg:text-[1vw] text-[15px]">
                            {it.hospitalName}
                          </div>
                        </td>

                        <td className="flex flex-col lg:flex-col md:flex-row text-left px-4 gap-2   lg:border-[#C4C4C4]">
                          <div className="whitespace-nowrap lg:text-[1vw] text-[13px] font-semibold text-[#7E7E77]">
                            Hospital's address
                          </div>
                          <div className="font-semibold lg:text-[1vw] text-[15px] text-left">
                            {it.hospitalAddress}
                          </div>
                        </td>

                        <td
                          colSpan={3}
                          className="flex px-4  lg:border-l-[1px]  "
                        >
                          <table className="flex w-full h-full lg:justify-end justify-center md:justify-center items-center">
                            <tr className=" ">
                              <td className="pr-2">
                                <div className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer">
                                  {notePop && (
                                    <div
                                      className="absolute"
                                      onClick={handleNotePopUp}
                                    >
                                      <div className="relative lg:-left-24 -left-10 top-5 min-w-[100px] flex flex-col flex-wrap p-2 items-start text-left bg-white shadow-md rounded-[15px]">
                                        <h4 className="text-[#7E7E77]">Note</h4>
                                        <p className="flex flex-wrap max-w-[200px]">
                                          {it.note}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  <TfiClipboard onClick={handleNotePopUp} />
                                </div>
                              </td>
                              <td>
                                <div className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer">
                                  <MdDeleteOutline onClick={deleteAppointment(it._id)}/>
                                </div>
                              </td>
                              <td className="pl-2">
                                <div
                                  className="bg-[#c31a7f38] p-2 rounded-[12px] cursor-pointer"
                                  onClick={() => {
                                    setPop(!pop);
                                    setedit_id(it._id);
                                    setedit(true);
                                  }}
                                >
                                  <MdOutlineModeEditOutline
                                    onClick={() => {
                                      setPop(!pop);
                                      setedit_id(it._id);
                                      setedit(true);
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    );
                  })}
                </table>


              

              </div>
            </div>
          </div>

        </div>
      

    </>
     )} />
  )
}

export default Appointment1