import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import five from "../Photos/five.gif";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { RxCross2 } from "react-icons/rx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import logo2 from "../Photos/logo2.png";
import Craousel from "../Components/Craousel";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";
import NewImage from '../Photos/profile/blue.png'
const ChooseTitle = () => {
  const [viewCategory, setViewCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [select, setSelect] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const SetChooseTitle = () => {
    const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
    userValue.categoryId = select;
    userValue.profile_category = select;
    localStorage.setItem("userValue", JSON.stringify(userValue));
    navigate("/loginDetails");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseurl}/profilelist/get-profile-list`,
          {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        console.log("data::>>",data.resData.data.profiles)
        console.log("data::>>>>>>>>>>",data.resData)
        if (data.resData.status === true) {
          setViewCategory(data.resData.data);
          console.log("setViewCategory::>>>>>>>>>>",data.resData)
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  function selectedOption(value) {
    setSelect(value);
  }

  const getIdselect = (e) => {
    setSelect(e);

    // console.log(e)
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="flex justify-end">
            <RxCross2 size={15} onClick={handleClose} />
          </div>
          <div id="alert-dialog-description">
            <div className="font-bold py-2 border-b-2">
              <span className="text-[#C31A7F]">Fighter</span> : Embrace your
              inner superhero and join a <br /> league of warriors ready to face
              cancer head-on
              <br /> with strength and determination.{" "}
            </div>
            <div className="font-bold py-2 border-b-2">
              <span className="text-[#C31A7F]">Fighter</span> : Embrace your
              inner superhero and join a <br /> league of warriors ready to face
              cancer head-on
              <br /> with strength and determination.{" "}
            </div>

            <div className=" font-bold py-2">
              <span className="text-[#C31A7F]">Veteran</span> : Share your
              triumphs and inspire others as a <br /> seasoned champion who has
              conquered cancer's <br /> challenges.{" "}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid flex justify-start center-1">
        <NavLink to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} alt="" />
          </div>
        </NavLink>
      </div>

      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          <Craousel />

          <div className="h-full  flex items-center mt-4  lg:mt-12 lg:bottom-10">
            <form>
              <div
                className=" lg:w-[490px] w-[330px] h-[670px]  lg:mr-[140px] bg-opacity-10 z-10 backdrop-blur-md rounded-[20px]"
                style={{
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.1)",
                }}
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
                    {console.log("number::>>>>>>>", viewCategory)}
                    {viewCategory.map((cata, i) => (
                      <div
                        key={cata._id}
                        onClick={() => getIdselect(cata._id)}
                        className={`flex ${
                          select !== null && select !== cata._id
                            ? "opacity-50"
                            : ""
                        } ${
                          loading ? "w-[90%] " : ""
                        } justify-center cursor-pointer`}
                      >
                        {loading ? (
                          <Skeleton
                            className="w-[90%]"
                            height={100}
                            count={3}
                          />
                        ) : (
                          <>
                            <img
                              src={cata.profile_image}
                              alt="not found"
                              className={`w-[90%] relative`}
                            />
                            <div
                              className={
                                i === 0
                                  ? "absolute lg:top-[37%] top-[26%] left-[40%] lg:left-60 text-white"
                                  : i === 1
                                  ? "absolute lg:top-[54%] top-[39%] left-[40%]  lg:left-60 text-white"
                                  : i === 2
                                  ? "absolute lg:top-[75%] top-[54%] left-[40%]  lg:left-60 text-white"
                                  : ""
                              }
                            >
                              {/* <h3 className="  lg:text-[20px] text-[16px]">
                                {cata.role}
                              </h3>
                              <div className="">
                                <p className="lg:text-[14px] text-[12px]">
                                  {cata.profile_description}
                                </p>
                              </div> */}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    <div>
                      {select ? (
                        <button
                          className="bg-[#C31A7F] text-center py-[13px] px-[60px]  rounded-xl text-white"
                          type="submit"
                          onClick={SetChooseTitle}
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="bg-[#C31A7F]  opacity-50 text-center py-[13px] px-[60px] rounded-xl text-white"
                        >
                          Continue
                        </button>
                      )}
                    </div>
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
