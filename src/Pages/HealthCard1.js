import React, { useRef, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { MdOutlineCloudUpload, MdOutlineModeEditOutline } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Page from "../Layouts/Pages";
import "./choosetitle.css";

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
    current_treatment: "",
    presiding_doctor: "",
    hospital_details_primary: "",
    
  });
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [PDF, setPDF] = useState(null);
  const [PDF2, setPDF2] = useState(null);
  const [PDF3, setPDF3] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id.startsWith("emergency_")) {
      const index = parseInt(id.split("_")[2], 10);
      const field = id.split("_")[1];
      const updatedContacts = [...emergencyContacts];
      updatedContacts[index][field] = value;
      setEmergencyContacts(updatedContacts);
    } else {
      setHealthCardData({ ...healthCardData, [id]: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleAddEmergencyContact = () => {
    if (emergencyContacts.length < 3) {
      setShowEmergencyContacts(true);
      setEmergencyContacts([...emergencyContacts, { name: "", phone: "" }]);
    }
  };

  const handlePDFUpload = (event, setPDF) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
      setPDF(file);
    } else {
      console.log("Invalid file type");
    }
  };

  const handleOnSubmit = async () => {
    const newErrors = {};
    let hasErrors = false;

    for (const key in healthCardData) {
      if (!healthCardData[key]) {
        newErrors[key] = "This field is required";
        hasErrors = true;
      }
    }

    emergencyContacts.forEach((contact, index) => {
      if (!contact.name) {
        newErrors[`emergency_name_${index}`] = "This field is required";
        hasErrors = true;
      }
      if (!contact.phone) {
        newErrors[`emergency_phone_${index}`] = "This field is required";
        hasErrors = true;
      }
    });
    console.log("Updated::>>", emergencyContacts);

    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("emergency_contact", JSON.stringify(emergencyContacts));

    for (const key in healthCardData) {
      formData.append(key, healthCardData[key]);
    }
    if (PDF) formData.append("adhaar_card", PDF);
    if (PDF2) formData.append("fit_to_fly_certificate", PDF2);
    if (PDF3) formData.append("biopsy_certificate", PDF3);

    try {
      const response = await axios.post(
        `${baseurl}/healthcard/add-health-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Health Card Created Successfully!");
        const formData2 = new FormData();
        formData2.append("health_card_id", response.data.data._id);
        formData2.append(
          "emergencyContacts",
          JSON.stringify(emergencyContacts)
        );

        await axios.post(`${baseurl}/api/add_emergencyContacts`, formData2, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } else {
        toast.error("Failed to create health card!");
      }
    } catch (error) {
      toast.error("Failed to create health card!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadPDF = (ref) => ref.current.click();

  return (
    <Page
      pageContent={
        <div className="h-fit w-full bg-[#FEF8FD] flex flex-col gap-4 pb-5 justify-center items-center lg:px-20 px-3">
          <h1 className="pt-6 font-semibold">Make Your Health Card</h1>
          <div className="h-full bg-white rounded-xl py-2">
            <form className="health-form flex flex-wrap items-center justify-center gap-7 mx-[4%] my-4">
              {Object.keys(healthCardData).map(
                (key) =>
                  key !== "gender" &&
                  key !== "blood_group" &&
                  key !== "cancer_type" &&
                  key !== "cancer_stage" &&
                  key !== "current_treatment" && (
                    <div className="md:w-[46%] w-full relative group" key={key}>
                      <input
                        type={key === "date_of_birth" ? "date" : "text"}
                        id={key}
                        required
                        className="w-full h-12 px-4 text-sm peer outline-none border rounded-lg"
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor={key}
                        className="transform duration-300 peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                      >
                        {key.replace(/_/g, " ")}
                      </label>
                      {errors[key] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[key]}
                        </div>
                      )}
                    </div>
                  )
              )}
              {[
                "gender",
                "blood_group",
                "cancer_type",
                "cancer_stage",
                "current_treatment",
              ].map((key) => (
                <div className="md:w-[46%] w-full relative group" key={key}>
                  <select
                    id={key}
                    required
                    className="w-full h-12 px-4 text-sm peer outline-none border rounded-lg"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Select {key.replace(/_/g, " ")}
                    </option>
                    {key === "gender" &&
                      ["Male", "Female", "Other"].map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    {key === "blood_group" &&
                      ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (option) => (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        )
                      )}
                    {key === "cancer_type" &&
                      [
                        "Breast Cancer",
                        "Lung Cancer",
                        "Prostate Cancer",
                        "Colon Cancer",
                        "Lymphoma",
                        "Melanoma",
                        "Pancreatic Cancer",
                        "Liver Cancer",
                        "Other",
                      ].map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    {key === "cancer_stage" &&
                      [
                        "Stage 0",
                        "Stage IA",
                        "Stage IB",
                        "Stage IIB",
                        "Stage IV",
                      ].map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    {key === "current_treatment" &&
                      [
                        "Chemotherapy",
                        "Radiotherapy",
                        "Surgery",
                        "Immunotherapy",
                      ].map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor={key}
                    className="transform duration-300 peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    {key.replace(/_/g, " ")}
                  </label>
                  {errors[key] && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors[key]}
                    </div>
                  )}
                </div>
              ))}
              {showEmergencyContacts &&
                emergencyContacts.map((contact, index) =>
                  ["name", "phone"].map((field) => (
                    <div
                      className="md:w-[46%] w-full relative group"
                      key={`${field}_${index}`}
                    >
                      <input
                        type="text"
                        id={`emergency_${field}_${index}`}
                        required
                        className="w-full h-12 px-4 text-sm peer outline-none border rounded-lg"
                        onChange={handleInputChange}
                      />
                      <label
                        htmlFor={`emergency_${field}_${index}`}
                        className="transform duration-300 peer-focus:-translate-y-3 peer-focus:left-2 peer-focus:bg-white absolute z-10 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-3 peer-valid:left-2 group-focus-within:pl-0 peer-valid:pl-0"
                      >
                        Emergency Contact {index + 1}{" "}
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      {errors[`emergency_${field}_${index}`] && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors[`emergency_${field}_${index}`]}
                        </div>
                      )}
                    </div>
                  ))
                )}
              {emergencyContacts.length < 3 && (
                <button
                  type="button"
                  className="w-full md:w-[46%] h-12 px-4 text-sm outline-none border rounded-lg flex items-center justify-center gap-2"
                  onClick={handleAddEmergencyContact}
                >
                  Add Emergency Contact <CgAdd />
                </button>
              )}
              {[PDF, PDF2, PDF3].map((pdf, index) => (
                <div
                  className="w-full md:w-[46%] h-24 relative group"
                  key={index}
                >
                  <div
                    className={`border h-full rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer ${
                      pdf ? "bg-[#B30F73] text-white" : ""
                    }`}
                    onClick={() =>
                      uploadPDF(
                        index === 0
                          ? hiddenChoosePDF
                          : index === 1
                          ? hiddenChoosePDF1
                          : hiddenChoosePDF2
                      )
                    }
                  >
                    {pdf ? (
                      <>
                        <MdOutlineModeEditOutline />
                        <BsFileEarmarkPdf />
                        <div>{pdf.name}</div>
                      </>
                    ) : (
                      <>
                        <MdOutlineCloudUpload />
                        <div>
                          Upload{" "}
                          {index === 0
                            ? "Aadhaar Card"
                            : index === 1
                            ? "Fit to Fly Certificate"
                            : "Biopsy Certificate"}
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={
                      index === 0
                        ? hiddenChoosePDF
                        : index === 1
                        ? hiddenChoosePDF1
                        : hiddenChoosePDF2
                    }
                    onChange={(e) =>
                      handlePDFUpload(
                        e,
                        index === 0 ? setPDF : index === 1 ? setPDF2 : setPDF3
                      )
                    }
                    style={{ display: "none" }}
                    accept="application/pdf"
                  />
                </div>
              ))}
              <button
                type="button"
                className={`md:w-[25%] w-full h-12 rounded-xl ${
                  isSubmitting
                    ? "bg-[#F5F5F5] cursor-not-allowed"
                    : "bg-[#B30F73] text-white"
                }`}
                onClick={handleOnSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default HealthCard1;
