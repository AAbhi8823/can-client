import React, { useEffect, useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineCloudUpload } from "react-icons/md";
import { BsFileEarmarkPdf, BsDownload, BsTrash3 } from "react-icons/bs";
import Cookies from "js-cookie";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { toast } from "react-toastify";
import Healthrecfolder from "../Photos/Healthrecfolder.png";
import Page from "../Layouts/Pages";

const HealthRecord1 = () => {
  const [BiopsyuploadedPDFs, setBiopsyUploadedPDFs] = useState([]);
  const [pop, setPop] = useState(false);
  const [model, setModel] = useState(null);
  const [PDF, setPDF] = useState(null);
  const [recoradName, setRecoradName] = useState("");
  const hiddenChoosePDF = useRef();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [PDFname, setPDFname] = useState("");
  const [UploadBox, setUploadBox] = useState({});
  const [userPdfData, setUserPdfData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = Cookies.get("token");
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to store the name of the uploaded file


  const openUpload = (id) => {
    setModel(id);
    setPop(!pop);
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size is too large. Please upload a file smaller than 5 MB.");
      setFile(null);
      setPDF(null);
      setPDFname("");
      return;
    }
    setFile(file);
    setErrorMessage("");
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
  };

  const handleInputChange = (event) => {
    setRecoradName(event.target.value);
  };

  const UploadDocument = async () => {
    setIsUploading(true);
    const formInfo = new FormData();
    formInfo.set("document", file);
    formInfo.set("document_name", recoradName);
    formInfo.set("doc_id", model);
    try {
      const response = await axios.post(
        `${baseurl}/healthrecord/add-health-record`,
        formInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        console.log(response);
        setIsUploading(false);
        setPop(!pop);
        setUploadBox(!UploadBox);
      } else {
        console.log("API error");
      }
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const deleteRecoard = async (healthrecordId, docId) => {
    console.log("deleteRecoard::::", healthrecordId, docId);
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${baseurl}/healthrecord/delete-health-record/${healthrecordId}/${docId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === true) {
        console.log(response.data.status);
        setIsDeleting(false);
        toast.success("Record deleted successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setUserPdfData((prevData) => prevData.filter(pdf => pdf._id !== healthrecordId)); // Update UI instantly
      } else {
        console.log("API error");
        setIsDeleting(false);
      }
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  const uploadPDF = () => {
    hiddenChoosePDF.current.click();
  };

  const closeUploadPDF = () => {
    setPDF(null);
  };

  const getInfoMetting = async (catId) => {
    console.log("Getting info...", catId);
    // Close all other opened files
    setUploadBox({ [catId]: true });

    const token = Cookies.get("token");
    try {
      const pdfData = await axios.get(
        `${baseurl}/healthrecord/get-health-record/${catId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Success:>>>pdfData::>>", pdfData);
      if (pdfData) {
        console.log("mydata", pdfData?.data?.resData?.data);
        setUserPdfData(pdfData?.data?.resData?.data);
      } else {
        console.log("API error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const healthRecord = [
    { id: 1, name: "Biopsy/Molecular Markers Reports" },
    { id: 2, name: "CT Scan Reports" },
    { id: 3, name: "Doctor’s Letter" },
    { id: 4, name: "Histopathology/ Lab Reports" },
    { id: 5, name: "Imaging Reports" },
    { id: 6, name: "MRI Scan Reports" },
    { id: 7, name: "Others" },
  ];

  return (
    <Page
      pageContent={
        <>
          <div className="bg-[#FEF8FD] max-h-max pt-10 lg:px-0 px-4 flex lg:flex-row lg:justify-evenly">
            <div className="lg:w-[65%] w-full flex flex-col">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[16px] font-semibold font-roboto">
                  Health Record
                </h1>

                {healthRecord &&
                  healthRecord.map((item, index) => (
                    <div className="pt-5 w-full" key={index}>
                      <div
                        className={
                          UploadBox[item.id]
                            ? "bg-white h-max w-full rounded-2xl shadow-xl flex flex-col p-4"
                            : "bg-white h-16 w-full rounded-2xl shadow-xl flex items-center justify-between px-4"
                        }
                      >
                        <div className="flex items-center justify-between px-4 w-full">
                          <div className="flex gap-2">
                            <img src={Healthrecfolder} alt="folder" />
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <h1
                                className="font-semibold cursor-pointer"
                                onClick={() => getInfoMetting(item.id)}
                              >
                                {item.name}
                              </h1>
                            </div>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => openUpload(item.id)}
                          >
                            <CgAdd color="#C31A7F" size={30} />
                          </div>
                        </div>
                        {console.log("Uploading::>>>", userPdfData)}
                        {UploadBox[item.id] &&
                          userPdfData &&
                          userPdfData.map((pdfItem, index) => (
                            <div
                              className="my-4 flex flex-col md:flex-row gap-2 py-4 w-[100%] border rounded-2xl border-[#7E7E7E] flex items-center justify-between"
                              key={index}
                            >{console.log("index::>>>>", pdfItem)}
                              <div className="list-none flex flex-row items-center justify-center gap-16 mx-6">
                                <div className="flex flex-row gap-2 items-center">
                                  <BsFileEarmarkPdf size={34} />
                                  <h1 className="flex-shrink-0 text-[14px]">
                                    {pdfItem.document_name}
                                  </h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-[12px] font-semibold">
                                    {new Date(pdfItem.updatedAt).toLocaleString("en-US", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    })}
                                  </span>
                                  <span className="text-[12px] font-semibold">
                                    {pdfItem.size}
                                  </span>
                                </div>
                              </div>
                              <div className="list-none flex flex-row items-center justify-center gap-8 mx-6">
                                <div>
                                  <a
                                    href={pdfItem?.document_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <BsDownload size={22} />
                                  </a>
                                </div>

                                <div
                                  className="cursor-pointer"
                                  onClick={() => deleteRecoard(pdfItem._id, pdfItem.doc_id)}
                                >
                                  <BsTrash3 size={22} />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {pop && (
            <div className="fixed z-20 w-full h-full top-0 bg-black bg-opacity-70 flex justify-center items-center px-4">
              <div className="bg-white lg:w-[35%] w-full p-6 rounded-xl shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-[16px] font-bold">Upload File</h1>
                  <RxCross1
                    className="cursor-pointer"
                    onClick={() => setPop(!pop)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[14px]">Record Name</h1>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 text-[14px]"
                    placeholder="Biopsy Reports"
                    value={recoradName}
                    onChange={handleInputChange}
                  />
                </div>

                <div
                  className="w-full h-32 bg-[#FEF8FD] rounded-md border-dotted border-2 border-[#C31A7F] cursor-pointer my-2 flex flex-col items-center justify-center"
                  onClick={uploadPDF}
                >
                  <div className="flex flex-col items-center justify-center">
                    <MdOutlineCloudUpload color="#C31A7F" size={35} />
                    <h1 className="text-[14px] font-bold">Choose File here</h1>
                    <h1 className="text-[12px]">
                      Click to upload or drag and drop
                    </h1>
                    <input
                      type="file"
                      ref={hiddenChoosePDF}
                      onChange={handlePDFUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="text-red-500 text-[14px]">{errorMessage}</div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    className="text-[14px] font-bold px-4 py-2 bg-[#C31A7F] text-white rounded-md"
                    onClick={UploadDocument}
                    disabled={isUploading || !!errorMessage}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    className="text-[14px] font-bold px-4 py-2 border border-[#C31A7F] text-[#C31A7F] rounded-md"
                    onClick={closeUploadPDF}
                  >
                    Cancel
                  </button>
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
