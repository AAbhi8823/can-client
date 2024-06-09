import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import apis, {  baseurl } from "../Api/baseUrl";
import Cookies from "js-cookie";
import Cookie from "js-cookie";
const EditProfile = ({ id,onClose }) => {
  const base_token=Cookies.get("token");
  const [userData, setUserData] = useState({});
  const [validationError, setValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    profileImage: "",
  });

  useEffect(() => {
    getProfile(id);
  }, [id]);

  useEffect(() => {
    setProfileData({
      name: userData.full_name || "",
      email: userData.email || "",
      phone: userData.phone_number || "",
      gender: userData.gender || "",
      profileImage: userData.profile_image || "",
    });
  }, [userData]);

  const validateForm = () => {
    const { name, email, phone, gender, profileImage } = profileData;
    return name && email && phone && gender && profileImage;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setValidationError(true);
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    formData.append("full_name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("phone_number", profileData.phone);
    formData.append("gender", profileData.gender);
    formData.append("profile_image", profileData.profileImage);
    try {
      const token = Cookies.get("token");

      const response = await axios.put(`${baseurl}/user/update-user-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response::>>>>>>>", response)

      if (response?.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const token = Cookie.get("token");

  const getProfile = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(`${apis.GET_SINGLE_USER}`, config);
      console.log("Response::>>>>>>",response)
      setUserData(response?.data?.resData?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-profile fixed inset-0 flex md:items-center items-start justify-center bg-black bg-opacity-40 z-50 overflow-y-scroll px-5 py-[90px]">
      <div
        className="flex flex-col bg-white rounded-[40px] lg:md:w-auto w-full max-h-fit px-10 py-5"
        style={{ position: "absolute", top: "120px" }}
      >
        <div className="flex flex-row pb-4 justify-between items-center w-full">
          <h1 className="text-[22px] font-[500]">Edit Profile</h1>
          <RxCross2 className="cursor-pointer" onClick={()=>{console.log("Ankur Singh")}} />
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="text-[16px] font-[500]">Name</label>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="name"
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-[16px] font-[500]">Email</label>
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-[16px] font-[500]">Phone</label>
              <div className="relative z-0 w-full group">
                <input
                  type="tel"
                  name="phone"
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-[16px] font-[500]">Gender</label>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="gender"
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  value={profileData.gender}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-[16px] font-[500]">Profile Image</label>
              <div className="relative z-0 w-full group">
                <input
                  type="file"
                  name="profileImage"
                  className="block w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-[20px] p-3 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
            </div>
            {validationError && (
              <div className="flex justify-center mb-10">
                <p className="text-[#FF0000] font-normal text-[14px]">
                  Please fill in all fields.
                </p>
              </div>
            )}
            <div className="flex justify-center mt-[20px]">
              <button
                type="submit"
                className={`w-1/2 text-[15px] rounded-[20px] py-3 px-2 bg-[#c31a7f] text-white font-[500] ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
