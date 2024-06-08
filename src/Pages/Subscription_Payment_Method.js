import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BiArrowBack, BiCheckCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import SecurePayment from "../Photos/SecurePayment.png";
import HomeNav from "../Components/HomeNav";
import Logo from "../Photos/Logo.png";
const Subscription_Payment_Method = () => {
  const [paymentDone, setPaymentDone] = useState(false);
  const location = useLocation();
  const { subscription } = location.state || {};
  console.log("subscription::>>",subscription)

  const togglePaymentDone = () => {
    setPaymentDone(!paymentDone);
  };

  const handleRazorpayPayment = () => {
    // Implement your payment handling logic here
    console.log("Payment received");
    togglePaymentDone()
    // Call togglePaymentDone() when payment is successful
  };

  if (!subscription) {
    return (
      <div className="bg-[#FEF8FD] min-h-screen">
        <HomeNav />
        <div className="flex items-center justify-center h-full">
          <p>
            No subscription details available. Please go back and select a
            subscription.
          </p>
          <NavLink to="../Subscription_Models">
            <BiArrowBack size={24} className="ml-2" />
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF8FD] min-h-screen">
      <HomeNav />
      <div className="flex items-start pl-40 absolute top-24">
        <NavLink to="../Subscription_Models">
          <BiArrowBack size={24} />
        </NavLink>
      </div>
      <div className="pt-20">
        <div className="flex flex-row flex-wrap justify-center items-center gap-8">
          <div
            className="rounded-[30px] bg-white pb-8"
            style={{ boxShadow: "0px 5px 20px 0px #0000000D" }}
          >
            <div className="flex justify-start align-middle pb-6 pl-4 pt-8 pr-36">
              <h2 className="text-[24px] font-bold">Subscribe to CAN</h2>
            </div>
            <div className="flex flex-row flex-wrap gap-4 bg-[#C4DDDB] py-4 items-center justify-start align-middle w-full px-10">
              <div className="text-[28px] font-bold text-[#084943]">
                {subscription?.offer_price}
              </div>
              <div className="font-semibold text-[#084943] text-[20px]">
                per <br />
                {subscription?.duration}
              </div>
            </div>
            <hr />
            <div className="p-4">
              <div className="flex flex-row items-center justify-between align-middle py-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <img src={Logo} className="w-6" alt="CAN Logo" />
                  <div className="flex flex-col">
                    <h2 className="text-[20px] font-bold">CAN</h2>
                    <p className="text-[#9C9C9C] text-[14px]">
                      Billed {subscription?.duration}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[14px] font-bold">
                    {subscription?.offer_price}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex flex-row justify-between py-5">
                <p className="text-[14px] font-semibold">Sub total</p>
                <p className="text-[14px] font-bold">
                  {subscription?.offer_price}
                </p>
              </div>
              <hr />
              <div className="flex flex-row justify-between py-5 items-center">
                <h2 className="text-[18px] font-bold">Amount you pay</h2>
                <h2 className="text-[18px] font-bold">
                  {subscription?.offer_price}
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-[#084943] text-white w-full py-3 rounded-[20px] text-[18px]"
                  onClick={handleRazorpayPayment}
                >
                  Pay Now
                </button>
                {paymentDone && (
                  <div className="fixed px-10 text-center inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#FFFFFF] w-[600px] flex flex-col items-center px-10 py-10 gap-6 rounded-[30px]">
                      <div>
                        <BiCheckCircle color="#C31A7F" size={75} />
                      </div>
                      <div className="flex items-center flex-col">
                        <h1>Payment Successful !</h1>
                        <p>transaction id: 1234567897878</p>
                      </div>
                      <div>
                        <hr />
                      </div>
                      <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-row justify-between">
                          <p>Amount Paid</p>
                          <p>{subscription?.price}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <p>Payment Type</p>
                          <p>Credit Card</p>
                        </div>
                        <div className="flex flex-row justify-between">
                          <p>Bank</p>
                          <p>HDFC</p>
                        </div>
                        <div className="flex items-center flex-col">
                          <NavLink to="/home">
                            <div className="w-52 h-12 cursor-pointer">
                              <h2 className="bg-[#C31A7F] text-center p-3 rounded-xl text-white font-semibold">
                                Back To Home
                              </h2>
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
      <div className="py-8">
        <p className="text-[14px] font-semibold text-[#696969] py-18">
          <center>
            By Continuing, you would agree our{" "}
            <NavLink
              to="/TermCondition"
              className="underline font-semibold text-black"
            >
              Terms of Service
            </NavLink>{" "}
            and{" "}
            <NavLink
              to="/PrivatePolicy"
              className="underline font-semibold text-black"
            >
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
