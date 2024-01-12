import React, { useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { MdOutlineCloudUpload } from "react-icons/md";
import Page from "../Layouts/Pages";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const HealthCard1 = () => {
  const hiddenChoosePDF = useRef();
  const hiddenChoosePDF1 = useRef();
  const hiddenChoosePDF2 = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [healthCardData, setHealthCardData] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "", phone: "" },
  ]);
  const [contactIndex, setContactIndex] = useState(0);
  const [PDF, setPDF] = useState();
  const [PDF2, setPDF2] = useState();
  const [PDF3, setPDF3] = useState();
  const navigate = useNavigate();
  let healthCardQueryParams = new URLSearchParams();
  let emergencyContactsQueryParams = new URLSearchParams();
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    // If the input belongs to the emergency contact, update the corresponding contact
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
      // If the input is for healthCardData, update the healthCardData state
      setHealthCardData({
        ...healthCardData,
        [id]: value,
      });
    }
  };

  const handleAddEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
  };

  const [isSubmitting, setIsSubmitting] = useState();

  const handleOnsubmit = async () => {
    setIsSubmitting(true);
    const userid = localStorage.getItem("active_user");
    const token = Cookies.get("token");
    healthCardQueryParams = new URLSearchParams(healthCardData);
    emergencyContacts.forEach((contact, index) => {
      emergencyContactsQueryParams.set(`emergency_name_${index}`, contact.name);
      emergencyContactsQueryParams.set(
        `emergency_phone_${index}`,
        contact.phone
      );
    });
    const queryParamsString =
      healthCardQueryParams.toString() +
      "&" +
      emergencyContactsQueryParams.toString();

    const formData = new FormData();

    // Append the files to the FormData object
    formData.append("aadhaarCard", PDF);
    formData.append("fit_to_fly_Certificate", PDF2);
    formData.append("biopsy", PDF3);

    // Add other form data to the FormData object
    formData.append("userid", userid);
    formData.append("healthCardData", healthCardData);
    formData.append("patientsname", healthCardData.patientsname);
    formData.append("date_of_birth", healthCardData.date_of_birth);
    formData.append("blood_group", healthCardData.blood_group);
    formData.append("height", healthCardData.height);
    formData.append("weight", healthCardData.weight);
    formData.append("cancer_type", healthCardData.cancer_type);
    formData.append("cancer_stage", healthCardData.cancer_stage);
    formData.append("current_treatment", healthCardData.current_treatment);
    formData.append("last_treatment", healthCardData.last_treatment);
    formData.append("presiding_doctor", healthCardData.presiding_doctor);
    formData.append(
      "hospital_details_primary",
      healthCardData.hospital_details_primary
    );
    formData.append("hospital_details", healthCardData.hospital_details);

    // emergencyContacts.forEach((contact, index) => {
    //   console.log(contact);
    //   formData.set("emergencyContacts", JSON.stringify(contact));
    // });

    try {
      const response = await axios.post(
        `${baseurl}/api/healthcard?token=${token}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
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
        setIsSubmitting(false);
        console.log("without emergency", response.data);
        const formData = new FormData();
        formData.set("health_card_id", response.data.data._id);
        formData.set("emergencyContacts", JSON.stringify(emergencyContacts));
        console.log(formData);
        const response2 = await axios.post(
          `${baseurl}/api/add_emergencyContacts?token=${token}`,
          formData
        );
        if (response2) {
          // navigate("/HealthCard2");
          console.log(response2);
        } else {
          console.log("api error");
        }
      } else {
        toast.success("All fields are required!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.success("All fields are required!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setIsSubmitting(false);
    }
  };

  function handlePDFUpload(event) {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF(file);
    } else {
      console.log("Invalid file type");
    }
  }

  function handlePDFUpload1(event) {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF2(file);
    } else {
      console.log("Invalid file type");
    }
  }
  function handlePDFUpload2(event) {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF3(file);
    } else {
      console.log("Invalid file type");
    }
  }

  function uploadPDF() {
    hiddenChoosePDF.current.click();
  }

  function uploadPDF1() {
    hiddenChoosePDF1.current.click();
  }

  function uploadPDF2() {
    hiddenChoosePDF2.current.click();
  }

  return (
    <Page
      pageContent={
        <>
          <div className="h-fit w-full bg-[#FEF8FD] flex flex-col gap-4 pb-5 justify-center items-center lg:px-20 px-3">
            <h1 className=" pt-6 font-semibold">Make Your Health Card</h1>
            <div className=" h-full  bg-white rounded-xl py-2">
              {/* <div className="flex flex-col gap-2 items-center justify-center mt-4">
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    style={{
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                    }}
                    className="object-cover"
                  />
                )}
                <label
                  htmlFor="upload-button"
                  className="  text-[#C31A7F] cursor-pointer"
                >
                  Upload Picture
                </label>
              </div> */}

              <form className="flex flex-wrap items-center justify-center gap-7 mx-[4%] my-4">
                <div className=" md:w-[46%] relative group w-full">
                  <input
                    type="text"
                    id="patientsname"
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
                    <option className="hover:bg-[#EFC31933]" value="male">
                      Male
                    </option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                    <option value="A +ive">A +ive</option>
                    <option value="A -ive">A -ive</option>
                    <option value="AB +ive">AB +ive</option>
                    <option value="AB -ive">AB -ive</option>
                    <option value="B +ive">B +ive</option>
                    <option value="B -ive">B -ive</option>
                    <option value="O +ive">O +ive</option>
                    <option value="O -ive">O -ive</option>
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
                    <option value="default"> </option>
                    <option value="Pancreatic Cancer">Pancreatic Cancer</option>
                    <option value="Lung Cancer">Lung Cancer</option>
                    <option value="breast Cancer">breast Cancer</option>
                    <option value="Colorectal Cancer">Colorectal Cancer</option>
                    <option value="Prostate Cancer">Prostate Cancer</option>
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
                    <option value="default"> </option>
                    <option value="Stage IA">Stage IA</option>
                    <option value="Stage IB">Stage IB</option>
                    <option value="Stage IIB">Stage IIB</option>
                  </select>
                </div>
                {/* <div className="md:w-[46%] w-full  relative group">
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
                    Current Treatment
                  </label>
                </div>
                <div className="md:w-[46%] w-full  relative group">
                  <input
                    type="text"
                    id="last_treatment"
                    required
                    className="w-full p-2 px-4 text-sm peer  outline-none border rounded-lg h-12 "
                    onChange={handleInputChange}
                  />
                  <label
                    for="last_treatment"
                    className="transform peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute top-0 z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Last Treatment
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
                <div className="md:w-[46%] w-full  relative group">
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
                </div>
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

                      <div className="text-[16px] ">{PDF.name}</div>
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

                      <div className="text-[16px] ">{PDF2.name}</div>
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

                {/* Biopsy certificate */}

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

                      <div className="text-[16px] ">{PDF3.name}</div>
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
                  {/* <NavLink to={{ pathname: '/HealthCard2',
                      state: { healthCardData: healthCardData, emergencyContacts: emergencyContacts, },}}> */}
                  <button
                    className="h-10 w-28 bg-[#C31A7F] text-[#FFFF] rounded-xl flex items-center justify-center cursor-pointer"
                    onClick={handleOnsubmit}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                  {/* </NavLink> */}
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
