import React, { useEffect, useState } from "react";
import account from "../Photos/account.jpg";
import account2 from "../Photos/account2.jpg";
import Roles_fighter_C from "../Photos/Roles_fighter_C.png";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import Cookie from "js-cookie";

const FlippingImage = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFlipped(true);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [homePost, sethomePost] = useState();
  const DPPost = async () => {
    try {
      const HomePosttoken = Cookie.get("token");
      const homePost = await axios.put(
        `${baseurl}/api/postFilter?token=${HomePosttoken}`,
        {
          filter: "most_likes",
          limit: "",
        }
      );
      sethomePost(homePost.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    DPPost();
  }, []);

  return (
    <div className="">
      <div
        className="transition-transform duration-500 ease-in-out transform hover:rotate-y-180"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)" }}
        onClick={handleClick}
      >
        <div
          className="bg-white rounded-full "
          style={{ boxShadow: "0px 5px 15px 0px rgba(139, 21, 57, 0.50)" }}
        >
          <div className="overflow-hidden">
            <Avatar
              alt=" "
              src={isFlipped ? Roles_fighter_C : data}
              sx={{ width: 56, height: 56 }}
            />
            {/* <img className=" w-12  md:w-16  rounded-full" src={isFlipped ? Roles_fighter_C : account} alt="none"/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingImage;
