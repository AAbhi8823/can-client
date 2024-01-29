import React, { useEffect } from "react";
import CHAKRI1 from "../Photos/GIF/can video.gif";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import chakri2 from "../Photos/chakri2.gif"

const Animate = () => {
   const navigate = useNavigate();

   useEffect(() => {
     const delay = 4000; // 7000 milliseconds = 7 seconds

     const token = Cookies.get("token"); // Assuming getCookie is a function to retrieve the token from cookies

     const redirect = () => {
       if (token) {
         navigate("/home"); // Redirect to the home route if token is present
       } else {
         navigate("/loginform"); // Navigate to the login form if token is not present
       }
     };

     const timer = setTimeout(redirect, delay);

     return () => clearTimeout(timer);
   }, [navigate]);
   const myFunction = () => {
    // Do something when the window width is 768 pixels or below
    if (window.innerWidth <= 767) {
      // Your code here
      navigate("/MobileCraousel"); 
    }
  };

  useEffect(() => {
    // Call the function after 5 seconds
    const timeoutId = setTimeout(() => {
      myFunction();
    }, 5500);

    // Call the function when the window is resized
    window.addEventListener('resize', myFunction);

    // Clean up the timeout and event listener when the component is unmounted
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', myFunction);
    };
  }, []);
  return (
    <div className="bg-[#fbfbfb] ">
      <div className="w-[100%] h-[90vh] flex justify-center m-auto">
        <img src={chakri2} className="w-auto  " />
      </div>
    </div>
  );
};

export default Animate;
