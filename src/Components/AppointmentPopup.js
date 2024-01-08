import React, { useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdOutlineCloudUpload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../Api/baseUrl";
import Cookies from "js-cookie";
import { useEffect } from "react";

const AppointmentPopup = ({ edit, edit_id, getappointment }) => {
  const [pop, setPop] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [PDF, setPDF] = useState();
  const hiddenChoosePDF = useRef();
  const [PDFname, setPDFname] = useState("");
  console.log("edit", edit, edit_id);

  console.log("edit", edit, edit_id);

  const [formValues, setFormValues] = useState({
    appointmentName: "",
    doctorName: "",
    hospitalName: "",
    hospitalAddress: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentNote: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF(file);
    } else {
      console.log("Invalid file type");
    }
    setPDFname(file.name);
  };

  const handleSave = () => {
    // Perform save operation or any other necessary actions

    // Close the popup
    setPop(!pop);

    // Redirect to Appointment1 page with form values as URL parameters
    const queryParams = new URLSearchParams(formValues);
    navigate(`/appointment1?${queryParams}`);
    let token = Cookies.get("token");

    console.log(formValues);
  };

  const uploadPDF = () => {
    hiddenChoosePDF.current.click();
  };

  const closeUploadPDF = () => {
    setPDF(!PDF);
  };

  const getsingle_appointment = async (id) => {
    try {
      const { data } = await axios.post(
        `${apis.SINGEL_FETCH_APPOINTMENT}/?token=${token}`,
        {
          appointment_Id: id,
        }
      );
      if (data.status == true) {
        setFormValues({
          appointmentName: data.data.appointmentName,
          appointmentDate: data.data.date,
          appointmentTime: data.data.time,
          appointmentNote: data.data.note,
          hospitalAddress: data.data.hospitalAddress,
          hospitalName: data.data.hospitalName,
          doctorName: data.data.doctorName,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (edit && edit_id) {
      getsingle_appointment(edit_id);
    }
  }, [edit_id]);

  const [isEditing, setIsEditing] = useState();

  const editappointment = async () => {
    setIsEditing(true);
    try {
      let id = localStorage.getItem("active_user");
      console.log();
      let datas = {
        appointment_Id: edit_id,
        appointmentName: formValues.appointmentName,
        doctorName: formValues.doctorName,
        hospitalName: formValues.hospitalName,
        hospitalAddress: formValues.hospitalAddress,
        date: formValues.appointmentDate,
        note: formValues.appointmentNote,
        time: formValues.appointmentTime,
      };
      const { data } = await axios.put(
        `${apis.UPDATE_APPOINTMENT}/?token=${token}`,
        datas
      );
      console.log(data);

      if (data.status == true) {
        console.log(data);
        setPop(false);
        setIsEditing(false);
        let token = Cookies.get("token");
        let id = localStorage.getItem("active_user");
        getappointment(token, id);
      }
    } catch (error) {
      console.log(error);
      setIsEditing(false);
    }
  };

  const [isSaving, setIsSaving] = useState();
  const createappointment = async () => {
    setIsSaving(true);
    try {
      let id = localStorage.getItem("active_user");
      console.log();
      let datas = {
        patients_id: id,
        appointmentName: formValues.appointmentName,
        doctorName: formValues.doctorName,
        hospitalName: formValues.hospitalName,
        hospitalAddress: formValues.hospitalAddress,
        date: formValues.appointmentDate,
        note: formValues.appointmentNote,
        time: formValues.appointmentTime,
      };
      const { data } = await axios.post(
        `${apis.CREATE_APPOINTMENT}/?token=${token}`,
        datas
      );
      console.log(data);

      if (data.status == true) {
        console.log(data);
        setPop(false);

        navigate(`/appointment1`);
        setIsSaving(false);
        // Redirect to Appointment1 page with form values as URL parameters
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-2 bg-black bg-opacity-50 z-50 ${
        !pop ? "hidden" : ""
      }`}
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="lg:md:w-[40%] h-fit bg-white rounded-[24px] flex flex-col justify-center px-5 py-2 relative">
        <div className="flex items-center justify-center font-semibold">
          <h1 className="text-lg">Add Appointment</h1>
          <div
            className="absolute right-[8%] cursor-pointer"
            onClick={() => setPop(!pop)}
          >
            <RxCross1 />
          </div>
        </div>
        <div className="h-[80%] w-[100%] flex flex-col items-center">
          {/* <div className='w-[90%] h-[50%] mt-[3%] border-dotted rounded-lg border-2 border-gray-300 flex flex-col justify-center items-center'>
            {!PDF ? (
              <>
                <div className='text-[12px] text-[#7E7E7E] pr-10 py-2 w-full'>
                  <p className='w-full text-right italic'>Max File Size: 3 MB</p>
                </div>
                <div className='flex flex-col items-center mb-4'>
                  <MdOutlineCloudUpload size={50} color='#7E7E7E' />
                  <h1>Drag and drop or</h1>
                  <h1 className='text-[#3F75F3] font-semibold cursor-pointer' onClick={uploadPDF}>
                    Browse
                  </h1>
                  <p className='text-sm w-[100%] text-center text-[#7E7E7E]'>Add Appointment Letter</p>
                </div>
              </>
            ) : (
              <div className='relative flex items-center justify-center h-full w-full'>
                <div className='flex items-center gap-2'>
                  <BsFileEarmarkPdf size={30} />
                  <p className='font-semibold text-xl'>{PDFname}</p>
                </div>
                <button className='absolute top-5 right-5' onClick={closeUploadPDF}>
                  <IoCloseCircleSharp color='black' />
                </button>
              </div>
            )}
            <input
              type='file'
              accept='application/pdf'
              ref={hiddenChoosePDF}
              style={{ display: 'none' }}
              onChange={handlePDFUpload}
            />
          </div> */}
          <form className="flex flex-wrap justify-between lg:mx-[4%] mt-4">
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="appointmentName"
                  id="appointmentName"
                  value={formValues.appointmentName}
                  onChange={handleInputChange}
                  className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />

                <label
                  for="appointmentName"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Appointment Name
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="doctorName"
                  id="doctorName"
                  value={formValues.doctorName}
                  onChange={handleInputChange}
                  className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />

                <label
                  for="DoctorName"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Doctor's Name
                  </p>
                </label>
              </div>
            </div>
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="hospitalName"
                  id="hospitalName"
                  value={formValues.hospitalName}
                  onChange={handleInputChange}
                  className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />

                <label
                  for="hospitalName"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Hospital's Name
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  name="hospitalAddress"
                  id="hospitalAddress"
                  value={formValues.hospitalAddress}
                  onChange={handleInputChange}
                  className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />

                <label
                  for="hospitalAdd"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400  duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Hospital's Address
                  </p>
                </label>
              </div>
            </div>
            <div className="flex gap-6 w-full">
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="text"
                  onFocus={(e) => {
                    e.target.type = "date";
                  }}
                  value={formValues.appointmentDate}
                  onChange={handleInputChange}
                  id="appointmentDate"
                  name="appointmentDate"
                  className=" block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="appointmentDate"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    DD/MM/YYYY
                  </p>
                </label>
              </div>
              <div className="relative z-0 w-1/2 mb-4 group">
                <input
                  type="time"
                  onFocus={(e) => {
                    e.target.type = "time";
                  }}
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formValues.appointmentTime}
                  onChange={handleInputChange}
                  className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="time"
                  className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                  <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                    Time
                  </p>
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-4 group">
              <input
                type="text"
                name="appointmentNote"
                id="appointmentNote"
                value={formValues.appointmentNote}
                onChange={handleInputChange}
                className="block  w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black  dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                placeholder=" "
                required
              />

              <label
                for="appointmentNote"
                className="peer-focus:font-medium absolute px-2 lg:md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 left-3 z-10 origin-[0]  peer-focus:left-3 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                <p className="bg-white border-0 rounded-[8px] peer-focus:bg-transparent">
                  Add note
                </p>
              </label>
            </div>
          </form>
          <div className="flex gap-4 mb-3 mt-3 w-full justify-end px-8">
            <button
              className="border-2 py-1 px-2 md:lg:w-[15%] border-[#7E7E7E] text-center rounded-[12px]"
              onClick={() => setPop(!pop)}
            >
              Cancel
            </button>
            {!edit ? (
              <button
                type="submit"
                className="  bg-[#C31A7F] px-2 py-1 md:lg:w-[15%] text-white text-center rounded-[12px]"
                // onClick={handleSave}
                onClick={() => {
                  createappointment();
                }}
              >
                {isSaving ? "Creating..." : "Save"}
              </button>
            ) : (
              <button
                type="submit"
                className="  bg-[#C31A7F] px-2 py-1 md:lg:w-[15%] text-white text-center rounded-[12px]"
                // onClick={handleSave}
                onClick={() => {
                  editappointment();
                }}
              >
                {isEditing ? "Saving..." : "Edit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPopup;

