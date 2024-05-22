import React, { useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { MdOutlineCloudUpload, MdOutlineModeEditOutline } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Page from "../Layouts/Pages";
import { NavLink, useNavigate } from "react-router-dom";
const HealthCard1 = () => {
  const hiddenChoosePDF = useRef();
  const hiddenChoosePDF1 = useRef();
  const hiddenChoosePDF2 = useRef();
  const [healthCardData, setHealthCardData] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    height: "",
    weight: "",
    cancer_type: "",
    cancer_stage: "",
    // last_treatment:"",
    current_treatment: "",
    presiding_doctor: "",
    hospital_details_primary: "",
    // hospital_details: ""
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "", phone: "" },
  ]);
  const [PDF, setPDF] = useState(null);
  const [PDF2, setPDF2] = useState(null);
  const [PDF3, setPDF3] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id.startsWith("emergency_name_") || id.startsWith("emergency_phone_")) {
      const contactIndex = parseInt(id.split("_")[2], 10);
      const updatedContacts = [...emergencyContacts];
      const inputType = id.split("_")[1];

      if (inputType === "name") {
        updatedContacts[contactIndex].name = value;
      } else if (inputType === "phone") {
        updatedContacts[contactIndex].phone = value;
      }

      setEmergencyContacts(updatedContacts);
    } else {
      setHealthCardData({
        ...healthCardData,
        [id]: value,
      });
    }
  };
  const handleAddEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
  };
  const handleOnsubmit = async () => {
    setIsSubmitting(true);
    const token = Cookies.get("token");
    const formData = new FormData();
    // formData.append("adhaar_card", PDF);
    // formData.append("fit_to_fly_certificate", PDF2);
    // formData.append("biopsy_certificate", PDF3);
    for (const key in healthCardData) {
      formData.append(key, healthCardData[key]);
    }
    try {
      const response = await axios.post(
        `${baseurl}/healthcard/add-health-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token here
          },
        }
      );
      if (response) {
        toast.success("Health Card Created Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

        const formData2 = new FormData();
        formData2.set("health_card_id", response.data.data._id);
        formData2.set("emergencyContacts", JSON.stringify(emergencyContacts));

        const response2 = await axios.post(
          `${baseurl}/api/add_emergencyContacts?token=${token}`,
          formData2
        );

        if (response2) {
          console.log(response2);
        } else {
          console.log("api error");
        }
      } else {
        toast.error("Failed to create health card!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Failed to create health card!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF(file);
    } else {
      console.log("Invalid file type");
    }
  };

  const handlePDFUpload1 = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF2(file);
    } else {
      console.log("Invalid file type");
    }
  };

  const handlePDFUpload2 = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF3(file);
    } else {
      console.log("Invalid file type");
    }
  };

  const uploadPDF = () => {
    hiddenChoosePDF.current.click();
  };

  const uploadPDF1 = () => {
    hiddenChoosePDF1.current.click();
  };

  const uploadPDF2 = () => {
    hiddenChoosePDF2.current.click();
  };
  return (
    <Page
      pageContent={
        <>
          <div className="h-fit w-full bg-[#FEF8FD] flex flex-col gap-4 pb-5 justify-center items-center lg:px-20 px-3">
            <h1 className=" pt-6 font-semibold">Make Your Health Card</h1>
            <div className=" h-full  bg-white rounded-xl py-2">
              <form className="flex flex-wrap items-center justify-center gap-7 mx-[4%] my-4">
                <div className=" md:w-[46%] relative group w-full">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full h-12 px-4 text-sm peer  outline-none border rounded-lg "
                    onChange={handleInputChange}
                  />
                  <label
                    for="name"
                    className="transform duration-300 peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Name
                  </label>
                </div>

                <div className="md:w-[46%] w-full relative group ">
                  <label
                    for="gender"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    required
                    className="w-full h-12 px-4 text-sm peer outline-none border rounded-lg bg-white "
                    onChange={handleInputChange}
                  >
                    <option className="hover:bg-[#EFC31933]" value="Male">
                      Male
                    </option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    onFocus={(e) => {
                      e.target.type = "date";
                    }}
                    id="date_of_birth"
                    required
                    className="block w-full text-sm h-12 bg-transparent border rounded-lg p-2 appearance-none focus:outline-none  peer"
                    placeholder=" "
                    onChange={handleInputChange}
                  />
                  <label
                    for="dob"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 "
                  >
                    Date of Birth
                  </label>
                </div>
                <div className="md:w-[46%] w-full relative group">
                  <label
                    for="blood_group"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Blood Group
                  </label>
                  <select
                    id="blood_group"
                    required
                    className="block px-2 py-2  w-full text-sm bg-transparent rounded-lg border h-12  bg-white focus:outline-none focus:ring-0  peer"
                    placeholder=" "
                    onChange={handleInputChange}
                  >
                    <option value="default"> </option>
                    <option value="A+">A +ive</option>
                    <option value="A-">A -ive</option>
                    <option value="AB+">AB +ive</option>
                    <option value="AB-">AB -ive</option>
                    <option value="B+">B +ive</option>
                    <option value="B-">B -ive</option>
                    <option value="O+">O +ive</option>
                    <option value="O-">O -ive</option>
                  </select>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="height"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                    onChange={handleInputChange}
                  />
                  <label
                    for="height"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Height (cm)
                  </label>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="weight"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                    onChange={handleInputChange}
                  />
                  <label
                    for="weight"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Weight (kg)
                  </label>
                </div>
                <div className="md:w-[46%] w-full relative group">
                  <label
                    for="cancer_type"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Cancer Type
                  </label>

                  <select
                    id="cancer_type"
                    required
                    className="w-full p-2 px-4 text-sm outline-none border rounded-lg bg-white h-12"
                    onChange={handleInputChange}
                  >
                    <option value="Breast Cancer">Breast Cancer</option>
                    <option value="Lung Cancer">Lung Cancer</option>
                    <option value="Prostate Cancer">Prostate Cancer</option>
                    <option value="Colon Cancer">Colon Cancer</option>
                    <option value="Lymphoma">Lymphoma</option>
                    <option value="Melanoma">Melanoma</option>
                    <option value="Pancreatic Cancer">Pancreatic Cancer</option>
                    <option value="Liver Cancer">Liver Cancer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:w-[46%] w-full relative group">
                  <label
                    for="cancer_stage"
                    className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Cancer Stage
                  </label>
                  <select
                    id="cancer_stage"
                    required
                    className="w-full p-2 px-4 text-sm  outline-none border rounded-lg bg-white h-12"
                    onChange={handleInputChange}
                  >
                    <option value="Stage 0">Stage 0</option>
                    <option value="Stage IA">Stage IA</option>
                    <option value="Stage IB">Stage IB</option>
                    <option value="Stage IIB">Stage IIB</option>
                    <option value="Stage IV">Stage IV</option>
                  </select>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="current_treatment"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                    onChange={handleInputChange}
                  />
                  <label
                    for="current_treatment"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Current treatment
                  </label>
                </div>
                {/* <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="last_treatment"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12"
                    onChange={handleInputChange}
                  />
                  <label
                    for="last_treatment"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                  Last treatment
                  </label>
                </div> */}
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="presiding_doctor"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                    onChange={handleInputChange}
                  />
                  <label
                    for="presiding_doctor"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Preciding Doctor
                  </label>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="hospital_details_primary"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12"
                    onChange={handleInputChange}
                  />
                  <label
                    for="hospital_details_primary"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Hospital Details (Primary)
                  </label>
                </div>
                {/* <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="hospital_details"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12"
                    onChange={handleInputChange}
                  />
                  <label
                    for="hospital_details"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Hospital Details
                  </label>
                </div> */}
                <div className="md:w-[46%]"></div>
                <div className="w-full">
                  <h1 className="font-semibold m-2">Emergency Contact</h1>
                </div>

                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-row gap-8 justify-center  "
                  >
                    <div className="md:w-[46%] w-full relative group">
                      <input
                        type="text"
                        id={`emergency_name_${index}`}
                        required
                        className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                        onChange={handleInputChange}
                      />
                      <label
                        for={`emergency_name_${index}`}
                        className="transform  peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                      >
                        Name
                      </label>
                    </div>
                    <div className="md:w-[46%] w-full relative group">
                      <input
                        type="numeric"
                        id={`emergency_phone_${index}`}
                        required
                        className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                        onChange={handleInputChange}
                        style={{border:'1px solid #6B7280'}}
                      />
                      <label
                        for={`emergency_phone_${index}`}
                        className="transform  peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                      >
                        Phone No.
                      </label>
                    </div>
                  </div>
                ))}

                <div
                  onClick={handleAddEmergencyContact}
                  className="w-full m-2 p-2 flex flex-row gap-4 items-center "
                >
                  <CgAdd color="#C31A7F" size={30} />
                  <h1 className="font-semibold">Add More Emergency Contact</h1>
                </div>

                {/* Adhaar card  */}

                <div className="w-full p-2 m-2 font-semibold">
                  Add Your Document
                </div>

                <div
                  className="p-2 m-2 w-full md:w-[30%]  relative"
                  style={{
                    height: 200,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#AFAFAF",
                  }}
                >
                  {!PDF && (
                    <div>
                      <div className="text-sm text-[#7E7E7E] p-2 w-full">
                        <p className="w-full text-right">Max File Size: 3 MB</p>
                      </div>
                      <div className="flex flex-col items-center mb-4">
                        <MdOutlineCloudUpload size={50} color="#7E7E7E" />
                        <h1>Drag and drop or</h1>

                        <h1
                          className="text-[#3F75F3] font-semibold cursor-pointer"
                          onClick={uploadPDF}
                        >
                          Browse
                        </h1>
                        <p className="text-sm w-[100%] text-center text-[#7E7E7E]">
                          Add Aadhaar Card
                        </p>
                      </div>
                    </div>
                  )}

                  {PDF && (
                    <div className="bg-[#F5F5F5] relative  flex flex-col gap-2 items-center justify-center h-full rounded-[20px]">
                      <MdOutlineModeEditOutline
                        onClick={uploadPDF}
                        className="absolute top-2 right-2"
                      />
                      <BsFileEarmarkPdf size={25} />

                      <div className="text-[16px] " style={{overflow:' hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width:'88%'}}>{PDF.name}</div>
                      <div className="text-[14px] ">{PDF.size}</div>
                      <div className="text-[16px]  font-semibold">
                        Adhaar Card
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={hiddenChoosePDF}
                    style={{ display: "none" }}
                    onChange={handlePDFUpload}
                  />
                </div>

                {/* fit to fly certificate */}

                <div
                  className="p-2 m-2 w-full md:w-[30%]"
                  style={{
                    height: 200,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#AFAFAF",
                  }}
                >
                  {!PDF2 && (
                    <div>
                      <div className="text-sm text-[#7E7E7E] p-2 w-full">
                        <p className="w-full text-right">Max File Size: 3 MB</p>
                      </div>
                      <div className="flex flex-col items-center mb-4">
                        <MdOutlineCloudUpload size={50} color="#7E7E7E" />
                        <h1>Drag and drop or</h1>
                        <h1
                          className="text-[#3F75F3] font-semibold cursor-pointer"
                          onClick={uploadPDF1}
                        >
                          Browse
                        </h1>
                        <p className="text-sm w-[100%] text-center text-[#7E7E7E]">
                          Add Fit to Fly certificate
                        </p>
                      </div>
                    </div>
                  )}

                  {PDF2 && (
                    <div className="bg-[#F5F5F5] flex relative  flex-col gap-2 items-center justify-center h-full rounded-[20px]">
                      <MdOutlineModeEditOutline
                        onClick={uploadPDF1}
                        className="absolute top-2 right-2"
                      />
                      <BsFileEarmarkPdf size={25} />

                      <div className="text-[16px] " style={{overflow:' hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width:'88%'}}>{PDF2.name}</div>
                      <div className="text-[14px] ">{PDF2.size}</div>
                      <div className="text-[16px]  font-semibold">
                        Fit to Fly Certificate
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={hiddenChoosePDF1}
                    style={{ display: "none" }}
                    onChange={handlePDFUpload1}
                  />
                </div>

                <div
                  className="p-2 m-2 w-full md:w-[30%]"
                  style={{
                    height: 200,
                    borderStyle: "dashed",
                    borderWidth: 2,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#AFAFAF",
                  }}
                >
                  {!PDF3 && (
                    <div>
                      <div className="text-sm text-[#7E7E7E] p-2 w-full">
                        <p className="w-full text-right">Max File Size: 3 MB</p>
                      </div>
                      <div className="flex flex-col items-center mb-4">
                        <MdOutlineCloudUpload size={50} color="#7E7E7E" />
                        <h1>Drag and drop or</h1>
                        <h1
                          className="text-[#3F75F3] font-semibold cursor-pointer"
                          onClick={uploadPDF2}
                        >
                          Browse
                        </h1>
                        <p className="text-sm w-[100%] text-center text-[#7E7E7E]">
                          Add Biopsy certificate
                        </p>
                      </div>
                    </div>
                  )}

                  {PDF3 && (
                    <div className="bg-[#F5F5F5] flex relative  flex-col gap-2 items-center justify-center h-full rounded-[20px]">
                      <MdOutlineModeEditOutline
                        onClick={uploadPDF2}
                        className="absolute top-2 right-2"
                      />
                      <BsFileEarmarkPdf size={25} />

                      <div className="text-[16px] " style={{overflow:' hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width:'88%'}}>{PDF3.name}</div>
                      <div className="text-[14px] ">{PDF3.size}</div>
                      <div className="text-[16px]  font-semibold">
                        Biopsy Certificate
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={hiddenChoosePDF2}
                    style={{ display: "none" }}
                    onChange={handlePDFUpload2}
                  />
                </div>
              </form>

              {/* Save and Cancel button */}

              <div className="flex flex-row md:items-end md:justify-end md:mx-16 p-4 justify-center">
                <div className="flex flex-row gap-3">
                  <div className="h-10 w-28 bg-transparent text-[#7E7E7E] border-2 rounded-xl flex items-center justify-center cursor-pointer">
                    Cancel
                  </div>
                  <button
                    className="h-10 w-28 bg-[#C31A7F] text-[#FFFF] rounded-xl flex items-center justify-center cursor-pointer"
                    onClick={handleOnsubmit}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default HealthCard1;
