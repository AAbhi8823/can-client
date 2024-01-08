import React from 'react'
import { baseurl } from "../Api/baseUrl";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PostFilter(filter) {
  const [homePosts, setMostLikedPost] = useState();

  const most_liked = async () => {
    const token = Cookies.get("token");
    try {
      const mostLikedPost = await axios.put(
        `${baseurl}/api/postFilter?token=${token}`,
        {
          filter: filter,
          limit: "",
        }
      );
      if (mostLikedPost) {
        setMostLikedPost(mostLikedPost.data.data);
        console.log(filter, mostLikedPost.data.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    most_liked()
  }, []);


  return (homePosts);
}
