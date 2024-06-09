import React, { useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios"; // Assuming axios is installed and imported
import { baseurl} from "../Api/baseUrl";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const SetPassword = () => {
  const base_token=Cookies.get("token");

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);
  const navigate=useNavigate()
  const [firstpass1, setFirstpass1] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const passwordChange1 = (e) => {
    setFirstpass1(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
    setPasswordsMatch(e.target.value === confirmNewPass);
  };

  const handleConfirmNewPass = (e) => {
    setConfirmNewPass(e.target.value);
    setPasswordsMatch(newPass === e.target.value);
  };
  
  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  };

  const submitPassword = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${base_token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      old_password: firstpass1,
      password: newPass,
      confirm_password: confirmNewPass,
    };

    try {
      const response = await axios.put(
        `${baseurl}/user/change-password`,
        data,
        config
      );
      if(response.status===200){
        localStorage.clear();
        clearCookies();
        navigate("/")
        
      }
      console.log("responseblock::>>",response)
      console.log("Password change response:", response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="flex flex-col bg-white px-20 py-8 rounded-[20px] gap-3 lg:md:w-[700px] border-[0.5px] border-[#e3e2e2]"
      style={{ boxShadow: "0px 10px 30px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex items-center gap-4 px-3 p-2 border-2 rounded-[20px]">
        <IoKeyOutline />
        <div className="font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]"></div>
        <input
          placeholder="Current Password"
          className="bg-transparent w-full outline-none"
          type={eye1 ? "text" : "password"}
          onChange={passwordChange1}
          minLength={3}
          value={firstpass1}
        />
        {eye1 ? (
          <AiOutlineEye onClick={() => setEye1(!eye1)} />
        ) : (
          <AiOutlineEyeInvisible onClick={() => setEye1(!eye1)} />
        )}
      </div>
      <div className="text-[#3C37FF] flex text-[12px] font-[400] -mt-2 justify-end cursor-pointer">
        <a href="/ForgotPassword">Forgot Password?</a>
      </div>
      <div className="flex items-center gap-4 px-3 p-2 border-2 rounded-[20px]">
        <IoKeyOutline />
        <div className="font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]"></div>
        <input
          placeholder="New Password"
          className="bg-transparent w-full outline-none"
          type={eye2 ? "text" : "password"}
          onChange={handleNewPass}
          minLength={3}
          value={newPass}
        />
        {eye2 ? (
          <AiOutlineEye onClick={() => setEye2(!eye2)} />
        ) : (
          <AiOutlineEyeInvisible onClick={() => setEye2(!eye2)} />
        )}
      </div>
      <div className="flex items-center gap-4 px-3 p-2 border-2 rounded-[20px]">
        <IoKeyOutline />
        <div className="font-bold bg-[#000] h-[35px] w-[1px] inline-block text-[20px]"></div>
        <input
          placeholder="Re-enter Password"
          className="bg-transparent w-full outline-none"
          type={eye3 ? "text" : "password"}
          onChange={handleConfirmNewPass}
          minLength={3}
          value={confirmNewPass}
        />
        {eye3 ? (
          <AiOutlineEye onClick={() => setEye3(!eye3)} />
        ) : (
          <AiOutlineEyeInvisible onClick={() => setEye3(!eye3)} />
        )}
      </div>
      {!passwordsMatch && confirmNewPass.length >= newPass.length && (
        <div className="text-red-500 text-[12px]">Passwords don't match</div>
      )}
      <label htmlFor="signout" className="text-[#7C7C7C]">
        <input
          type="checkbox"
          id="signout"
          className="text-[#7C7C7C] rounded-[10px] mr-4"
        />
        Sign out of all devices
      </label>
      <div className="flex flex-row pt-5 gap-2 justify-end">
        <button className="text-center py-[6px] px-5 rounded-xl text-[#7C7C7C] border-2">
          Cancel
        </button>
        {newPass === confirmNewPass ? (
          <button
            className="bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white"
            onClick={submitPassword}
          >
            Save
          </button>
        ) : (
          <button className="bg-[#C31A7F] text-center py-[6px] px-6 rounded-xl text-white opacity-50">
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default SetPassword;
