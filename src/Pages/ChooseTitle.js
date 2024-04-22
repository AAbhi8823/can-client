import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import five from "../Photos/five.gif";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { RxCross2 } from "react-icons/rx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import logo2 from "../Photos/logo2.png";
import Craousel from "../Components/Craousel";
import { Skeleton } from "@mui/material";
import fighter11 from "../Photos/fighter11.png";
import { base_token } from "../Api/baseUrl";

const ChooseTitle = () => {
  const [viewCategory, setViewCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Useremail = JSON.parse(localStorage.getItem("userValue"));
    if (Useremail) {
      const newUserdata = {
        email: Useremail.email,
        date_of_birth: Useremail.date_of_birth,
        full_name: Useremail.full_name,
        gender: Useremail.gender,
        phone_number: Useremail.phone_number,
        otp: Useremail.otp,
        agreed_To_Terms: Useremail.agreed_To_Terms,
        password: Useremail.password,
        confirm_password: Useremail.confirm_password,
        user_profile: select,
      };
      setUserData(newUserdata);
    }
  }, [select]);

  const getprofileCategory = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${base_token}`,
        },
      };

      const { data } = await axios.get(
        `${baseurl}/profilelist/get-profile-list`,
        config
      );
      console.log("data::>>>>", data.resData.data);
      if (data.resData.status === true) {
        setViewCategory(data.resData.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getprofileCategory();
  }, []);

  const handleSelect = (value) => {
    setSelect(value);
  };

  const handleContinue = () => {
    if (!userData) {
      console.error("User data is not available.");
      return;
    }
    const newUserdata = {
      ...userData,
      user_profile: select,
    };
    try {
      localStorage.setItem("userValue", JSON.stringify(newUserdata));
      navigate("/registerImage");
    } catch (error) {
      console.error("Error setting password:", error.message);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {/* Dialog Content */}
          <div className="flex justify-end">
            <RxCross2 size={15} onClick={handleClose} />
          </div>
          <DialogContentText id="alert-dialog-description">
            {/* Dialog Text Content */}
            <p className=" font-bold py-2 border-b-2 ">
              <span className="text-[#C31A7F]">Fighter</span> : Embrace your
              inner superhero and join a <br /> league of warriors ready to face
              cancer head-on
              <br /> with strength and determination.
            </p>
            {/* More content */}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Your main content */}
      <div className="grid flex justify-start center-1">
        <NavLink to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} alt="" />
          </div>
        </NavLink>
      </div>

      {/* Main Content */}
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          <Craousel />
          <div className="h-full  flex items-center mt-4  lg:mt-12 lg:bottom-10">
            <form>
              {/* Form Content */}
              <div
                className=" lg:w-[490px] w-[330px] h-[670px]  lg:mr-[140px] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]"
                style={{ boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)" }}
              >
                <div>
                  <img
                    src={five}
                    className="object-contain rounded-[20px]"
                    alt="video"
                  />
                </div>
                <div className=" font-medium text-lg flex items-center justify-between pr-3 ml-5 pl-28 lg:pr-4 lg:pl-40  ">
                  Create a Profile
                  <div className="">
                    <CiCircleInfo
                      onClick={handleClickOpen}
                      color="#7E7E7E"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <div className="w-full pt-2">
                  <div className="flex flex-col items-center justify-center gap-4">
                    {loading ? (
                      <Skeleton className="w-[90%]" height={100} count={3} />
                    ) : (
                      viewCategory.map((cata, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelect(cata.role)}

                          className={`flex justify-center cursor-pointer ${
                            select !== null && select !== cata._id
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          <img
                            src={cata.profile_image}
                            alt="not found"
                            className="w-[90%] relative"
                          />
                          {console.log("Select::>>>",cata)}
                        </div>
                      ))
                    )}
                    {/* Continue button */}
                    <button
                      className={`bg-[#C31A7F] ${
                        select ? "" : "opacity-50"
                      } text-center py-[13px] px-[60px]  rounded-xl text-white`}
                      type="button"
                      onClick={handleContinue}
                      disabled={!select}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseTitle;
