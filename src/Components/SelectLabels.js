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
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from 'react-router-dom';

export default function SelectLabels({ onFilterChange }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const displayButton = useMediaQuery(theme.breakpoints.up("420"));
  const [age, setAge] = useState("");
  const [filter, setFilter] = useState("new");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (filter) => {
    console.log("Loading::>>>>",filter)
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${baseurl}/mystory/get-story-by-filter/:${filter}`, // Adjust the endpoint as needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Filter: filter, // Sending filter in the header
          },
        }
      );
      console.log("responseresponse::>>",response)
      setPosts(response?.data?.resData?.data);
      if (onFilterChange) onFilterChange(response?.data?.resData?.data); // Notify parent component
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleChange = (event) => {
    const selectedFilter = event.target.value;
    console.log("Filter changed::>>",selectedFilter)
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
              backgroundColor: age === "new" ? "#C31A7F" : "",
              color: age === "new" ? "black" : "",
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
              backgroundColor: age === "trending" ? "#C31A7F" : "",
              color: age === "trending" ? "white" : "",
            }}
          >
            <WhatshotOutlinedIcon />
            Trending
          </MenuItem>

          <MenuItem
            value="most_likes"
            sx={{
              "&:hover": {
                backgroundColor: "#C31A7F",
                color: "white",
              },
            }}
            style={{
              backgroundColor: age === "most_likes" ? "#C31A7F" : "",
              color: age === "most_likes" ? "white" : "",
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
