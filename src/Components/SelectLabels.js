import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import "./SelectLabels.css";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Cookie } from "@mui/icons-material";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate,useLocation } from 'react-router-dom';


export default function SelectLabels() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const displayButton = useMediaQuery(theme.breakpoints.up("420"));
  const [age, setAge] = useState(""); 
  const [filter, setFilter] = useState("new");
  const [posts, setPosts] = useState([]);
  

  const fetchPosts = async (filter) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${baseurl}/mystory/most-liked-story`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

 const handleChange = (event) => {
    const selectedFilter = event.target.value;
    setAge(selectedFilter);
    setFilter(selectedFilter);
    navigate(`/home?filter=${selectedFilter}`);
    fetchPosts(selectedFilter);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter') || 'new';
    setFilter(filter);
    fetchPosts(filter);
  }, [location.search]);


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
          
            border: "2px solid #C31A7F", // Updated border color
            "&:hover": {
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
          onChange={handleChange}
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
