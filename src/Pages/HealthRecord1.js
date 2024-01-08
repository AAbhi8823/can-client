import React, { useEffect, useRef, useState } from "react";
import HomeNav from "../Components/HomeNav";
import VerticalAppointment from "../Components/VerticalAppointment";
import VerticalMedicine from "../Components/VerticalMedicine";
import premium from "../Photos/premium.png";
import Healthrecfolder from "../Photos/Healthrecfolder.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import SingleLineCalendar from "../Components/SingleLineCalender";
import VerticalSLC from "../Components/VericalSLC";
import { CgAdd } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAutoDelete, MdOutlineCloudUpload } from "react-icons/md";
import { TbClipboardList } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import SideMenu from "../Components/SideMenu";
import Page from "../Layouts/Pages";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { toast } from "react-toastify";

const HealthRecord1 = () => {
  //vertical calender , appointments and Medicine
  const [vertical, setVertical] = useState("Upcoming");
  const [BiopsyuploadedPDFs, setBiopsyUploadedPDFs] = useState([]);

  const toggleVertical = (item) => {
    setVertical(item);
  };

  //open medicine upload
  const [pop, setPop] = useState(false);
  const [model, setModel] = useState()

  const openUpload=(id)=> {
    setModel(id)
    setPop(!pop);
  }

  //upload document
  const [PDF, setPDF] = useState();

  const hiddenChoosePDF = useRef();

  const [file,setFile] = useState()
  function handlePDFUpload(event) {
    const file = event.target.files[0];
    console.log(file)
    setFile(file)
    if (file.type === "application/pdf") {
      setPDF(file);
      setPDFname(file.name);
      const newPDF = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        }),
      };
      setBiopsyUploadedPDFs((prevPDFs) => [...prevPDFs, newPDF]);
    } else {
      console.log("Invalid file type");
    }
  }

  const [recoradName, setRecoradName] = useState("");
  const handleInputChange = (event) => {
    setRecoradName(event.target.value);
  };

  const userid = localStorage.getItem("active_user")
  const token = Cookies.get("token")
  const [isUploading, setIsUploading] = useState()
  const UploadDocument = async()=>{
    setIsUploading(true)
    const formInfo = new FormData();
    formInfo.set("userid" , userid)
    formInfo.set("recoardfile", file);
    formInfo.set("recoradName", recoradName);
    formInfo.set("healthCategoryId" , model);
    try {
        const responce = await axios.post(
          `${baseurl}/api/createhealthRecorads?token=${token}`,
          formInfo,
          {
            headers: {
              "Content-Type": "multipart/formData",
            },
          }
        );
        if (responce) {
            console.log(responce)
            setIsUploading(false);
            setPop(!pop);
            setUploadBox(!UploadBox);
        } else {
            console.log("api error")
        }
    } catch (error) {
        console.log(error)
        setIsUploading(false);
    }
  }

  const[isDeleting, setIsDeleting] = useState()
  const deleteRecoard =async(id)=>{
    setIsDeleting(true)
    const formInfo = new FormData();
    formInfo.set("health_recoard_Id", id);
    try {
        const deleteData = await axios.delete(
          `${baseurl}/api/deleteHealth_recoard?token=${token}&health_recoard_Id=${id}`
        );
        if (deleteData.data.status == true) {
            console.log(deleteData.data.status)
            setIsDeleting(false);
            toast.success("Posted Successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
            });
            // window.location.reload()
            setUploadBox(!UploadBox);
        } else {
            console.log("Api error")
            setIsDeleting(false);
        }
    } catch (error) {
        console.log(error)
        setIsDeleting(false);
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text); 
    alert("Link copied. Now You can share you file.")
  };
  

  function uploadPDF() {
    hiddenChoosePDF.current.click();
  }

  const [PDFname, setPDFname] = useState("");

  function closeUploadPDF() {
    setPDF(!PDF);
  }

  //Upload Button
  const [UploadBox, setUploadBox] = useState(false);

  const[userPdfData, setUserPdfData] = useState()
  const UploadFile = async(catId,index)=> {
    setUploadBox((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
    const formInfo = new FormData();
    formInfo.set("healthCategoryId", catId);
    formInfo.set("id" , userid);
    try {
        const pdfData = await axios.post(
          `${baseurl}/api/getHealth_recorads_byparticular_category?token=${token}`,
          {
            healthCategoryId: catId,
            id: userid,
          }
        );
        if (pdfData) {
            console.log("mydata" , pdfData.data.data)
            setUserPdfData(pdfData.data.data)
        } else {
            console.log("api error")
        }
    } catch (error) {
        console.log(error)
    }
  }
  

  const toggleBiopsyContent = () => {
    setUploadBox(false); // Close the upload box
  };

  const [categories, setCategories] = useState();

  const getHealthCatrgory = async () => {
    const token = Cookies.get("token");
    try {
      const Data = await axios.get(
        `${baseurl}/api/getAllhealthCategory?token=${token}`
      );
      if (Data) {
        setCategories(Data.data.data);
      } else {
        console.log("error");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getHealthCatrgory();
  },[]);

  return (
    <Page
      pageContent={
        <>
          <div className="bg-[#FEF8FD]   max-h-max pt-10 lg:px-0 px-4 flex lg:flex-row  lg:justify-evenly  ">
            <div className="lg:w-[65%] w-full flex flex-col">
              <div className="flex flex-col  items-start justify-start  ">
                <h1 className="text-[16px] font-semibold font-roboto">
                  Health Record
                </h1>

                {/* BiopsyReports */}
                {categories &&
                  categories.map((item, index) => (
                    <div className="pt-5 w-full" key={index}>
                      <div
                        className={
                          UploadBox
                            ? "bg-white h-max w-full  rounded-2xl shadow-xl flex flex-col p-4 "
                            : "bg-white h-16 w-full  rounded-2xl shadow-xl flex items-center justify-between px-4 "
                        }
                      >
                        <div className=" flex items-center justify-between px-4 w-full">
                          <div className="flex gap-2">
                            <div>
                              <img src={Healthrecfolder} alt="folder.jpg" />
                            </div>
                            <div>
                              <h1
                                className="font-semibold cursor-pointer"
                                onClick={() => UploadFile(item._id)}
                              >
                                {item?.categoryName}
                              </h1>
                              <p className="text-sm text-gray-400"></p>
                            </div>
                          </div>

                          <div
                            className="cursor-pointer"
                            onClick={() => openUpload(item._id)}
                          >
                            <CgAdd color="#C31A7F" size={30} />
                          </div>
                        </div>

                        {UploadBox[item._id] &&
                          userPdfData &&
                          userPdfData.map((item, index) => (
                            <div
                              className="my-4 flex flex-col md:flex-row gap-2 py-4 w-[100%] border rounded-2xl border-[#7E7E7E] flex items-center justify-between "
                              key={index}
                            >
                              <div className="list-none flex flex-row items-center justify-center gap-16 mx-6">
                                <div className="flex flex-row gap-2 items-center">
                                  <BsFileEarmarkPdf size={34} />
                                  <h1 className="flex-shrink-0 text-[14px] ">
                                    {item?.recoradName}
                                  </h1>
                                </div>

                                <div className="flex gap-10 ">
                                  <span className="text-[14px] ">
                                    {item.size}
                                  </span>
                                  <span className="text-[14px] ">
                                    {" "}
                                    {item.createdAt
                                      ? item.createdAt.split("T")[0]
                                      : ""}{" "}
                                  </span>
                                </div>
                              </div>

                              <div className="mx-6">
                                <div className="flex gap-4">
                                  <a
                                    href={item?.filePath}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer p-2 bg-[#c31a7f42] rounded-xl"
                                  >
                                    <BsDownload />
                                  </a>
                                  <div
                                    className="p-2 bg-[#c31a7f42] rounded-xl cursor-pointer"
                                    onClick={() => handleCopy(item?.filepath)}
                                  >
                                    <AiOutlineShareAlt />
                                  </div>
                                  <div
                                    className="p-2 bg-[#c31a7f42] rounded-xl cursor-pointer"
                                    onClick={() => deleteRecoard(item._id)}
                                  >
                                    {isDeleting ? (
                                      <MdOutlineAutoDelete />
                                    ) : (
                                      <BsTrash3 />
                                    )}
                                  </div>
                                  {/* <div className="p-2 bg-[#c31a7f42] rounded-xl">
                                    <BsPencil />
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* right side */}

            {/* calender */}
          </div>

          {/* pop up */}
          {pop && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className=" md:w-[40%] sm:w-[100%] py-4 bg-white rounded-3xl flex flex-col justify-center my-2 px-5 relative">
                <div className="flex items-center justify-center h-max font-semibold  ">
                  <h1 className="text-lg">Upload Record</h1>
                  <div className="absolute right-[8%]" onClick={openUpload}>
                    <RxCross1 />
                  </div>
                </div>

                <div className="h-[80%] w-[100%] flex flex-col items-center">
                  <div className="w-[90%] h-[65%] mt-[3%] border-dotted rounded-lg border-2 border-gray-300">
                    {!PDF && (
                      <>
                        <div className="flex justify-between text-sm text-[#7E7E7E] p-2">
                          <p>Biopsy/Molecular Markers Reports</p>
                          <p>Max File Size: 3 MB</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <MdOutlineCloudUpload size={50} color="#7E7E7E" />
                          <h1>Drag and drop or</h1>
                          <h1
                            className="text-[#3F75F3] font-semibold cursor-pointer"
                            onClick={uploadPDF}
                          >
                            Browse
                          </h1>
                          <p className="text-sm w-[60%] text-center text-[#7E7E7E]">
                            Upload your Biopsy/PET CT reports of the patient to
                            verify the case.
                          </p>
                        </div>
                      </>
                    )}

                    {PDF && (
                      <div className="relative flex items-center justify-center h-full">
                        <div className="flex items-center gap-2">
                          <BsFileEarmarkPdf
                            className="cursor-pointer"
                            size={30}
                          />
                          <p className="font-semibold text-xl">{PDFname}</p>
                          {/* <embed src={URL.createObjectURL(PDF)} className='h-[38%]' type='application/pdf' />    actual PDF */}
                        </div>

                        <button
                          className="absolute top-5 right-5"
                          onClick={closeUploadPDF}
                        >
                          <IoCloseCircleSharp color="black" />
                        </button>
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

                  <h2 className="my-3"></h2>

                  <div className="w-[90%] border-2 border-[#ABABAB] p-2 flex items-center gap-2 px-4 rounded-2xl">
                    <TbClipboardList />
                    <h1>|</h1>
                    <input
                      placeholder="Document Name"
                      className="outline-none w-[90%]"
                      onChange={handleInputChange}
                      value={recoradName}
                    />
                  </div>

                  <div className="flex justify-end w-[90%] mt-4 gap-4">
                    <h1
                      className="px-2 py-2 border-2 border-[#ABABAB] rounded-xl cursor-pointer"
                      onClick={openUpload}
                    >
                      Cancel
                    </h1>
                    <h1
                      className="px-2 py-2 bg-[#C31A7F] rounded-xl text-white cursor-pointer"
                      onClick={UploadDocument}
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default HealthRecord1;
