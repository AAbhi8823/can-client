import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import "./SelectLabels.css";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Cookie } from "@mui/icons-material";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "../Pages/Home";
import { useNavigate } from 'react-router-dom';
import { BiLabel } from "react-icons/bi";

export default function SelectLabels() {
  const theme = useTheme();
  const navigate = useNavigate()
  const displayButton = useMediaQuery(theme.breakpoints.up("420"));
  const [age, setAge] = useState(""); 
  const [filter, setFilter] = useState()
  const [homePost, setMostLikedPost] = useState()
  // const most_liked = async(filter)=>{
  //   const token = Cookies.get("token")
  //   try {
  //     const mostLikedPost = await axios.put(
  //       `${baseurl}/api/postFilter?token=${token}`,
  //       {
  //         filter: filter,
  //         limit: "",
  //       }
  //     );
  //     if (mostLikedPost) {
  //       setMostLikedPost(mostLikedPost.data.data)
  //       console.log(filter,mostLikedPost.data.data)
  //     } else {
  //       console.log("error")
  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   most_liked(event.target.value);
  // };

  return (
    <div className="flex justify-between">
      <div
        className="flex flex-row"
        style={{ display: "flex !important", flexDirection: "row !important" }}
      >
        <Button
          sx={{
            m: 1,
            minWidth: 120,
            borderRadius: "20px",
            height: "42px",
            background: "white",
            border: "2px solid #C31A7F", // Updated border color
            display: displayButton ? "block" : "none",
          }}
          value={age}
          // onChange={handleChange}
          displayempty="true"
          inputprops={{ "aria-label": "Without label" }}
          className=" rounded-20 text-center "
        >
          <p className="font-medium text-black">Verified</p>
        </Button>
        <Button
          sx={{
            m: 1,
            minWidth: 120,
            borderRadius: "20px",
            height: "42px",
            backgroundColor: "white",
            // background: "#C31A7F",
            border: "2px solid #C31A7F", // Updated border color
            "&:hover": {
              // Remove hover effect
              background: "#C31A7F", // You can set it to the same color or any other desired color
              border: "2px solid #C31A7F", // Adjust if needed
            },
          }}
          value={age}
          // onChange={handleChange}
          displayempty="true"
          inputprops={{ "aria-label": "Without label" }}
          className=" rounded-20 text-center  "
        >
          <p className="font-medium text-black">All</p>
        </Button>
      </div>
      <FormControl>
        <Select
          sx={{
            m: 1,
            minWidth: 120,
            borderRadius: "20px",
            height: "42px",
            background: "white",
            border: "2px solid #C31A7F",
            "&:hover": {
              // Add a border on hover if needed
              border: "2px solid #C31A7F",
            },
          }}
          value={age || "new"}
          // onChange={handleChange}
          displayempty="true"
          inputprops={{ "aria-label": "Without label" }}
          className="rounded-20 text-center"
        >
          <MenuItem
            value="new"
            sx={{
              backgroundColor: "#fff ",
              "&:hover": {
                backgroundColor: "#C31A7F",
                color: "white",
              },
            }}
            style={{
              backgroundColor: age === "new" ? "#C31A7F" : "", // Highlight selected item
              color: age === "new" ? "black" : "", // Highlight selected item text color
            }}
            onClick={() => {
              navigate({ path: "/home", search: `filter=new` });
            }}
          >
            <p className="font-medium">
              <NewReleasesOutlinedIcon /> New
            </p>
          </MenuItem>

          <MenuItem
            value="trending"
            sx={{
              "&:hover": {
                backgroundColor: "#C31A7F",
                color: "white",
              },
            }}
            style={{
              backgroundColor: age === "trending" ? "#C31A7F" : "", // Highlight selected item
              color: age === "trending" ? "white" : "", // Highlight selected item text color
            }}
            onClick={() => {
              navigate({ path: "/home", search: `filter=trending` });
            }}
          >
            <WhatshotOutlinedIcon />
            Trending
          </MenuItem>

          <MenuItem
            value="most_likes" // Assuming different value for the third item
            sx={{
              "&:hover": {
                backgroundColor: "#C31A7F",
                color: "white",
              },
            }}
            style={{
              backgroundColor: age === "most_likes" ? "#C31A7F" : "", // Highlight selected item
              color: age === "most_likes" ? "white" : "", // Highlight selected item text color
            }}
            onClick={() => {
              navigate({ path: "/home", search: `filter=most_likes` });
            }}
          >
            <ThumbUpOffAltIcon />
            Most Liked Post
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
