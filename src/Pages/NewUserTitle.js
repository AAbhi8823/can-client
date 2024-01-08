import React, { useEffect, useState } from "react";
import LogoCAn from "../Photos/LogoCAn.png";
import CANa from "../Photos/CANa.png";
import Roles_Fighter from "../Photos/Roles_Fighter.png";
import Roles_Caregiver from "../Photos/Roles_Caregiver.png";
import Roles_Veteran from "../Photos/Roles_Veteran.png";
import Video from "../Photos/Video.png";
import CarouselMain from "../Components/CarouselMain";
import { Link, useNavigate } from "react-router-dom";
import MeetPeople from "../Photos/MeetPeople.png";
import { CiCircleInfo } from "react-icons/ci";
import five from "../Photos/five.gif";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { RxCross1, RxCross2 } from "react-icons/rx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import logo2 from "../Photos/logo2.png";
import Craousel from "../Components/Craousel";
import { Skeleton } from "@mui/material";

const ChooseTitle = () => {
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const [selectedImage, setSelectedImage] = useState(null);
  const [viewCategory, setViewCategory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [opa, setOpa] = useState({ opacity: 0.5 })

  const [select, setSelect] = useState(null);

  const SetChooseTitle = () => {
    const userValue = JSON.parse(localStorage.getItem("userValue")) || {};

    // userValue.profile_category = select
    userValue.categoryId = select;
    userValue.profile_category = select;
    localStorage.setItem("userValue", JSON.stringify(userValue));
    navigate("/loginDetails");
    // console.log(userValue);
  };

  const [categoryId, setcategoryId] = useState("");

  const getprofileCategory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseurl}/api/profile_category_create`
      );
      console.log(data.data);
      if (data.status == true) {
        setViewCategory(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprofileCategory();
  }, []);

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
          <DialogContentText id="alert-dialog-description">
            <p className=" font-bold py-2 border-b-2 ">
              <span className="text-[#C31A7F]">Fighter</span> : Embrace your
              inner superhero and join a <br /> league of warriors ready to face
              cancer head-on
              <br /> with strength and determination.{" "}
            </p>
            <p className=" font-bold py-2 border-b-2 ">
              <span className="text-[#C31A7F]">Caregiver</span> : Step into the
              role of a compassionate <br /> guardian, providing unwavering love
              and support <br /> to those battling cancer.{" "}
            </p>
            <p className=" font-bold py-2">
              <span className="text-[#C31A7F]">Veteran</span> : Share your
              triumphs and inspire others as a <br /> seasoned champion who has
              conquered cancer's <br /> challenges.{" "}
            </p>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>

      <div className="grid flex justify-start center-1">
        <Link to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} alt="" />
          </div>
        </Link>
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
                              src={cata.image}
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
                              <h3 className="  lg:text-[20px] text-[16px]">
                                {cata.category_Name}
                              </h3>
                              <div className="">
                                <p className="lg:text-[14px] text-[12px]">
                                  {cata.descritption}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}

                    {/* <div className=''>
                    <img src={Roles_Fighter} alt="not found" className={`w-[90%] relative`} />
                    <div className='' >
                      hello world
                    </div>
                  </div> */}

                    {/* <div
                    className={`flex justify-center cursor-pointer ${select !== "" && select !== "Caregiver"
                      ? "opacity-50"
                      : ""
                      }`}
                    onClick={() => selectedOption("Caregiver")}
                  >
                    <img
                      src={Roles_Caregiver}
                      alt="not found"
                      className={`w-[90%] relative `}
                    />
                    <div className="absolute lg:top-[54%] top-[46%] right-14  lg:left-60 text-white ">
                      <h3 className=" lg:text-[20px] text-[16px]">
                        Caregiver
                      </h3>
                      <div className=" ">
                        <p className="  lg:text-[14px] text-[12px]">
                          I will help fighter
                        </p>
                        <p className=" lg:text-[14px] text-[12px] ">
                          defeat cancer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex justify-center cursor-pointer ${select !== "" && select !== "Veteran" ? "opacity-50" : ""
                      }`}
                    onClick={() => selectedOption("Veteran")}
                  >
                    <img
                      src={Roles_Veteran}
                      alt="not found"
                      className={`w-[90%] relative `}
                    />
                    <div className="absolute lg:top-[73%] top-[63%] right-14  lg:left-60 text-white ">
                      <h3 className=" lg:text-[20px] text-[16px]">
                        Veteran
                      </h3>
                      <div className="">
                        <p className="  lg:text-[14px] text-[12px]">
                          I have defeated
                        </p>
                        <p className="  lg:text-[14px] text-[12px] ">
                          cancer.
                        </p>
                      </div>
                    </div>
                  </div> 

                  {/* {select ? (
                    <div to="/logindetails" className="">
                      <button className="bg-[#C31A7F] w-[50%] text-center p-3 rounded-lg text-white">
                        Continue
                      </button>
                    </div>
                  ) : (
                    <div className="w-[50%]">
                      <button className="   bg-[#C31A7F] w-[50%] text-center p-3 rounded-lg text-white">
                        Continue
                      </button>
                    </div>
                  )} */}
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
