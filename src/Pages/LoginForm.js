import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../Api/baseUrl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Cookies from "js-cookie";
import LoginCraousel from "../Components/LoginCraousel";
import elite1 from "../Photos/elite1.gif";
import logo2 from "../Photos/logo2.png";
import logoCAn from "../Photos/LogoCAn.png";

const LoginForm = () => {
  const navigate = useNavigate();

  const [eye1, setEye1] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [border, setBorder] = useState("2px solid #e5e7eb");

  const handleLogin = async () => {
    setLoading(true);

    try {
      const isEmail = /\S+@\S+\.\S+/.test(username);
      const key = isEmail ? 'email' : 'phone_number';
      const response = await axios.post(`${baseurl}/user/user-login`, {
        [key]: username,
        password: password,
      });

      if (response?.data?.resData?.status === true) {
        setLoading(false);
        Cookies.set('token', response.data.resData.data, { expires: 7 });
        navigate('/home');
      } else {
        setError('Invalid email/phone or password.');
        setLoading(false);
        setBorder('2px solid red');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const seePass1 = () => {
    setEye1(!eye1);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
    const enteredValue = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;

    if (!emailPattern.test(enteredValue) && !mobilePattern.test(enteredValue)) {
      setError("(Invalid Email or Mobile Number)");
    } else {
      setError("");
    }
  };

  const handleCheckboxChange = () => {
    setValue(!value);
  };

  return (
    <>
      <div className="grid flex justify-start center-1">
        <NavLink to={"/"}>
          <div className="flex px-10 w-[100%]">
            <img src={logo2} className="lg:block md:block hidden" alt="" />
            <img src={logoCAn} className="lg:hidden md:hidden block" alt="" />
          </div>
        </NavLink>
      </div>
      <div>
        <div className="flex lg:flex-row lg:p-0 p-2 items-center justify-center">
          <LoginCraousel />
          <div className="md:w-1/2 lg:w-[35%] px-5">
            <form className="bg-white shadow-md rounded rounded-2xl  mb-4">
              <div>
                <img src={elite1} className="w-[100%]" alt="none" />
              </div>
              <div className="text-center lg:text-[2.33vw] text-[24px]  font-semibold p-1  text-[#C31A7F]">
                <h1>Sign In</h1>
              </div>
              <div className="text-center flex justify-center gap-1">
                <p className="lg:text-[1.33vw] text-[18px]  ">
                  Don’t Have an account?
                </p>
                <p className="text-[#3C37FF] lg:text-[1.33vw]  text-[18px]">
                  <NavLink to={`/Register`}>Sign Up</NavLink>
                </p>
              </div>
              <div className="mt-6 px-2 flex flex-col gap-3">
                <div>
                  <div
                    style={{ border: border }}
                    className="lg:h-[8vh] h-12 mx-4 mt-3 lg:mx-8 lg:m-2   rounded-[20px] flex items-center justify-center gap-4"
                  >
                    <input
                      placeholder="Email/Phone"
                      className="border-none w-full bg-transparent  outline-none p-2 placeholder:font-thin placeholder:text-[18px]"
                      value={username}
                      onChange={changeUsername}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div className="px-10 text-red-500">
                  {error && <p>{error}</p>}
                </div>
                <div
                  style={{ border: border }}
                  className="lg:h-[8vh] h-12 mx-4 mt-3 lg:mx-8 lg:m-2  rounded-[20px] flex items-center gap-4"
                >
                  <input
                    placeholder="Password"
                    className="bg-transparent w-full border-0 outline-none placeholder:font-thin  placeholder:text-[18px] p-2"
                    type={eye1 ? "text" : "password"}
                    onChange={passwordChange}
                    value={password}
                    autoComplete="current-password"
                  />
                  <div onClick={seePass1} className="cursor-pointer px-3">
                    {eye1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between lg:px-9 px-5">
                  <div className="flex flex-row items-center gap-2">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={value}
                      onChange={handleCheckboxChange}
                      className="lg:w-[1vw] w-4 lg:h-[2vh] h-4 rounded-xl border-[#7E7E7E] cursor-pointer"
                    />
                    <p className="text-[#7E7E7E]  lg:text-[1.33vw] text-[14px]">
                      Remember me
                    </p>
                  </div>
                  <div>
                    <NavLink to="/ForgotPassword">
                      <p className="text-[#3C37FF] lg:text-[1.33vw]  text-[14px]  hover:underline cursor-pointer">
                        Forgot Password?
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="flex justify-center py-6">
                <button
                  type="button"
                  onClick={handleLogin}
                  className={`bg-[#C31A7F] cursor-pointer lg:text-[1vw] text-[18px]  text-center p-3 rounded-lg text-white w-[40%] ${
                    username && password ? "" : "opacity-50"
                  }`}
                >
                  {loading ? "Logging..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
