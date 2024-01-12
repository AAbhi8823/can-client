import React, { useState } from "react";
import Logo from "../Photos/Logo.png";
import CreditCard from "../Photos/CrediCard.png";
import Visa from "../Photos/Visa.png";
import UPI from "../Photos/UPI.png";
import NetBanking from "../Photos/NetBanking.png";
import { BiArrowBack, BiCheckCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import SecurePayment from "../Photos/SecurePayment.png";
import HomeNav from "../Components/HomeNav";


const Subscription_Payment_Method = () => {


  const [paymentDone, setPaymentDone] = useState(false)

  const togglePaymentDone = () => {
    setPaymentDone(!paymentDone)
  }

  return (
    <div className="bg-[#FEF8FD] min-h-screen">
      {/** navigation bar */}
      <div className=" "><HomeNav /></div>
      <div className="flex items-start pl-40 absolute top-24   ">
        <div className="  ">
          <NavLink to="../Subscription_Models">
            <BiArrowBack size={24} className="" />
          </NavLink>
        </div>

      </div>
      <div className="pt-20">
        <div className="flex flex-row flex-wrap  justify-center items-center gap-8  ">
          {/**Payment Methods */}
          <div
            className=" bg-white  flex-col rounded-[30px]"
            style={{ boxShadow: "0px 5px 20px 0px #0000000D" }}
          >
            <div className="bg-[#084943] text-[18px] flex flex-row   items-center text-white gap-2 py-3 px-10 font-[600] rounded-t-[30px]">
              <h2>PAYMENT METHODS </h2>{" "}
              <p className="text-[14px]  text-white">(CONFIRM)</p>
            </div>
            {/**column divide */}
            <div className="text-[#AAAAAA] text-[16px] font-[400] flex flex-row pt-6 px-10 justify-end gap-2">
              <img src={SecurePayment} className="w-5" /> Secure Payment
            </div>
            <div className="flex flex-row rounded-[30px] justify-end  items-center pb-8 ">
              {/** Icons */}

              <div className="items-center px-10 py-0 justify-around ">
                <div className=" flex py-5 justify-center items-center">
                  <img src={UPI} className="w-20" />
                </div>
                <hr />
                <div className=" flex py-10 justify-center items-center">
                  <img src={NetBanking} className="w-24" />
                </div>
                <hr />
                <div className="flex py-10 justify-center items-center">
                  <img src={Visa} className="w-12" />
                </div>
                <hr />
                <div className=" flex py-10 justify-center items-center">
                  <img src={CreditCard} className="w-14" />
                </div>
              </div>
              {/** Payment card */}
              <div className="px-10">
                <form className="flex flex-col  gap-4">
                  <div className="pt-2">
                    <label className=" pl-4 text-[20px] text-[#9B9B9B]">
                      Card No.
                    </label>
                    <br />
                    <div className="flex flex-row gap-4 items-center">
                      <input
                        type="number"
                        placeholder="4444 0500 0568 0322"
                        className="border-2  lg:w-full rounded-[20px] p-3 text-[20px]"
                      />
                      <BiCheckCircle className="text-[30px]" />
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap gap-2 pt-4">
                    <div>
                      <label className=" pl-4 text-[20px] text-[#9B9B9B]">
                        Expiration Date
                      </label>
                      <br />
                      <div className="flex flex-row gap-4 items-center">
                        <input
                          type="number"
                          placeholder="07/23"
                          className="border-2  rounded-[20px] p-3 text-[18px]"
                        />
                        <BiCheckCircle className="text-[30px]" />
                      </div>
                    </div>
                    <div>
                      <label className="pl-4 text-[20px] text-[#9B9B9B]">
                        CVV
                      </label>
                      <br />
                      <div className="flex flex-row gap-4 items-center">
                        <input
                          type="number"
                          placeholder="477"
                          className="border-2   rounded-[20px] p-3 text-[18px]"
                        />
                        <BiCheckCircle className="text-[30px]" />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label className=" pl-4 text-[20px] text-[#9B9B9B]">
                      Card Holder Name
                    </label>
                    <br />
                    <div className="flex flex-row gap-4 items-center">
                      <input
                        type="text"
                        placeholder="Robert K Paul"
                        className="border-2 lg:w-full rounded-[20px] p-3 text-[18px]"
                      />
                      <BiCheckCircle className="text-[30px]" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/**Subscribe to CAN card */}
          <div
            className="   rounded-[30px] bg-white pb-8 "
            style={{ boxShadow: "0px 5px 20px 0px #0000000D" }}
          >
            <div className="flex justify-start align-middle pb-6 pl-4 pt-8 pr-36">
              <h2 className=" text-[24px] font-bold">Subscribe to CAN</h2>
            </div>
            <div className="flex flex-row flex-wrap gap-4 bg-[#C4DDDB] py-4 items-center justify-start align-middle w-full px-10">
              <div className=" text-[28px] font-bold text-[#084943] ">₹ 250.00</div>
              <div className="font-semibold text-[#084943] text-[20px] ">
                per <br />
                month
              </div>
            </div>
            <hr />
            <div className="p-4 ">
              <div className="flex flex-row items-center justify-between align-middle  py-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <img src={Logo} className="w-6 " />
                  <div className="flex flex-col">
                    <h2 className=" text-[20px] font-bold">CAN</h2>
                    <p className="text-[#9C9C9C] text-[14px] ">Billed monthly</p>
                  </div>
                </div>

                <div>
                  <p className="  text-[14px] font-bold">₹ 250.00</p>
                </div>
              </div>
              <hr />
              <div className="flex flex-row justify-between  py-5">
                <p className="  text-[14px] font-semibold">Sub total</p>
                <p className="  text-[14px] font-bold">₹ 250.00</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between  py-5 items-center">
                <h2 className=" text-[18px] font-bold">Amount you pay</h2>
                <h2 className=" text-[18px] font-bold">₹ 250.00</h2>
              </div>
              <div className="flex   items-center just">
                <button className="bg-[#084943] text-white w-full py-3 rounded-[20px]  text-[18px]" onClick={togglePaymentDone}>
                  Pay Now
                </button>
                {paymentDone && (
                  <div className="fixed px-10 text-center inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#FFFFFF] w-[600px] flex flex-col items-center  px-10  py-10 gap-6 rounded-[30px] ">
                      <div>
                        <BiCheckCircle color='#C31A7F' size={75} />
                      </div>
                      <div className="flex items-center flex-col">
                        <h1>Payment Successful !</h1>
                        <p>transaction id: 1234567897878</p>
                      </div>

                      <div><hr /></div>
                      
                        <div className="flex flex-col gap-3 w-full ">
                          <div className="flex flex-row  justify-between">
                            <p>Amount Paid</p>
                            <p>₹ 250</p>
                          </div>
                          <div className="flex flex-row  justify-between">
                            <p>Payment Type</p>
                            <p>Credit Card</p>
                          </div>
                          <div className="flex flex-row  justify-between">
                            <p>Bank</p>
                            <p>HDFC</p>
                          </div>
                        
                          <div className="flex items-center flex-col">
                          <NavLink to='/home'>
                          <div className='w-52 h-12 cursor-pointer'>
                    <h2 className='bg-[#C31A7F]  text-center p-3 rounded-xl text-white font-semibold'>Back To Home</h2>
                  </div>
                  </NavLink>
             
                  </div>
                  </div>
                  </div>
                  </div>
                
                   
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 ">
        <p className="text-[14px] font-semibold  text-[#696969] py-18">
          <center>
            By Continuing, you would agree our{" "}
            <NavLink to="/TermCondition" className=" underline font-semibold text-black">
              Terms of Service
            </NavLink>{" "}
            and{" "}
            <NavLink to="/PrivatePolicy" className=" underline font-semibold text-black">
              Privacy Policy
            </NavLink>
            .
          </center>
        </p>
      </div>
    </div>
  );
};

export default Subscription_Payment_Method;
