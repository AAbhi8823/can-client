import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ponent from "../Photos/ponent.png";
import TabPanel from "./TabPanel";
import { Cookie } from "@mui/icons-material";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import DummyImage from '../Photos/account2.jpg'
function Saved({ value }) {

  const[savedPosts, setSavePosts] = useState([ { postid: { image:"https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/300" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } },
    { postid: { image: "https://via.placeholder.com/400" } }])
  const userid = localStorage.getItem("active_user")
  const SavedPost = async () => {
    try {
       const token = Cookies.get("token");
       const posts = await axios.put(
         `${baseurl}/api/savepost?token=${token}`,
         {
           userid: userid,
         }
       );
       if (posts) {
            setSavePosts(posts.data.data);
       } else {
            console.log("error")
       }
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    // SavedPost();
  }, []);

  return (
    <>
      <TabPanel value={value} index={2}>
        <div
          className="bg-[#fff] mt-5 rounded-[15px]"
          style={{ boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.10)" }}
        >
          <h2 className="px-5 py-3 font-semibold">Saved Feeds</h2>
          <div className=" gap-4 justify-center item-center py-3">
            <div className="flex flex-wrap space-between">
              {savedPosts &&
                savedPosts.map((item,index) => (
                  item.postid !== null ? (<img
                    src={item.postid.image}
                    className="px-2 py-3 w-[100%] md:w-[32%]"
                    alt=""
                    key={index}
                  />) : "No saved Posts"
                ))}
            </div>
          </div>
        </div>
      </TabPanel>
    </>
  );
}
export default Saved;
