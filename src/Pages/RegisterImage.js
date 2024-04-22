import React, { useRef, useState } from 'react';
import LogoCAn from '../Photos/LogoCAn.png';
import CANa from '../Photos/CANa.png';
import Video from '../Photos/Video.png';
import { VscAccount } from 'react-icons/vsc';
import { IoCloseCircleSharp } from 'react-icons/io5';
import CarouselMain from '../Components/CarouselMain';
import Freeline from '../Photos/Freeline.png'
import { NavLink, Navigate } from 'react-router-dom';
import five from '../Photos/five.gif'
import logo2 from "../Photos/logo2.png";
import logoCAn from '../Photos/LogoCAn.png'
import arrow22 from '../Photos/arrow22.png'
import Craousel from '../Components/Craousel';
import { useNavigate } from 'react-router-dom';

const RegisterImage = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const hiddenChooseImage = useRef(null);

  const [img_file,setImg_file]=useState([])

  const hideImage = () => {
    setImage(false);
  };

  const uploadImage = () => {
    hiddenChooseImage.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImg_file(file);
    setImage(URL.createObjectURL(file));
  };

  const SetRegisterImage = () => {
    const userValue = JSON.parse(localStorage.getItem("userValue")) || {};
    console.log("userValue::>>>>>>",userValue);
    userValue.profile_photo = [img_file];
    localStorage.setItem("userValue", JSON.stringify(userValue));
    localStorage.setItem("photo", img_file);
    localStorage.setItem("photo", JSON.stringify({ file: img_file }));

    console.log(JSON.parse(localStorage.getItem("photo")));

    console.log(userValue);  
  }

  const addLater =()=>{
    navigate("/newaddedprofile");
  }

  return (
    <>
      <div className="grid flex justify-start center-1">
        <NavLink to="/">
          <div className="flex px-10 w-[100%]">
            <img src={logo2} className="lg:block md:block hidden" alt="" />
            <img src={LogoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </NavLink>
      </div>

      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
            <Craousel/>

          {/* Right side  */}

          <div className=" md:w-1/2 lg:w-[35%] px-5">
            <form
              className="bg-white shadow-md rounded  rounded-2xl  mb-4"
              onSubmit={SetRegisterImage}
            >
              <NavLink to={"/choosetitle"}>
                <div className="px-4 py-2 cursor-pointer">
                  <img src={arrow22} alt="" />
                </div>
              </NavLink>
              <div>
                <img
                  src={five}
                  className="object-contain rounded-[20px] w-[100%]"
                  alt="Video"
                />
              </div>
              <div className="text-center text-3xl font-semibold p-1  text-[#C31A7F]">
                <h1 className="mt-4 mb-3 lg:text-[2.67vw] text-[36px]">
                  Add Profile
                </h1>
              </div>

              <div className="border-2 border-dashed rounded-xl h-[30%] py-10 mx-8 my-2 flex justify-center items-center overflow-hidden">
                <div className="flex flex-col items-center">
                  {!image && (
                    <div
                      className="flex flex-col items-center cursor-pointer  "
                      onClick={uploadImage}
                    >
                      <VscAccount
                        size={60}
                        className="lg:text-[2.67vw] text-[36px]"
                      />
                      <h1 className=" lg:text-[1.1vw] text-[20px]">
                        Choose image
                      </h1>
                    </div>
                  )}

                  {image && (
                    <div className="relative">
                      <img
                        src={image}
                        alt="Uploaded"
                        className="h-[50%] w-80 rounded-lg "
                      />
                      <button
                        className="absolute top-0 right-0"
                        onClick={hideImage}
                      >
                        <IoCloseCircleSharp color="white" />
                      </button>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenChooseImage}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    className=""
                  />
                </div>
              </div>

              <div className="flex px-5 justify-center mt-5 py-5">
                <h1
                  onClick={addLater}
                  className="flex justify-center py-2 w-[50%] cursor-pointer"
                >
                  <p className="bg-transparent border-[#C31A7F] border-2 w-[86%] text-center p-3 rounded-lg lg:text-[1.1vw] text-[20px]  text-[#C31A7F]">
                    Add later
                  </p>
                </h1>

                {image ? (
                  <div className="flex justify-center px-2  py-2 w-[50%]">
                    <NavLink to="/newaddedprofile" state={img_file} className="w-[100%]">
                      <button
                        type="submit"
                        className=" bg-[#C31A7F] lg:text-[1.1vw] text-[20px] w-[86%] px-2 py-4 p-3 text-center rounded-xl text-white w-full"
                      >
                        Continue
                      </button>
                    </NavLink>
                  </div>
                ) : (
                  <div className="flex justify-center px-2 py-2 w-[50%]">
                    <div className="w-[100%]">
                      <button className=" bg-[#C31A7F] opacity-50 lg:text-[1.1vw] w-[86%]  text-[20px] px-2  py-4 p-3 text-center  rounded-xl text-white w-[100%]">
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterImage