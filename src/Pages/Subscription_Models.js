import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import HomeNav from "../Components/HomeNav";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";

const SubscriptionModels = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/subscriptionplan/get-subscription-plan-list`
        );
        // console.log("Success<<<<<<<<", response);
        setSubscriptions(response?.data?.resData?.data);
        console.log("data<<<<<<<<", response?.data?.resData?.data)
      } catch (error) {
        console.error("Error fetching subscription models:", error);
      }
    };

    fetchSubscriptions();
  }, []);
 

  const subscriptions1 = [
  {
    duration: "1 Month",
    price: "₹ 50.00",
    features: [
      "1 Meeting Per Day",
      "2 posts Per Day",
      "No Featured Posts",
      "Post Filter Option",
      "Featured Section Filter Locked",
      "Medicine Vault Locked",
      "Scheduler Locked",
      { feature: "Whatsapp Feature Availability", available: false }
    ],
    bgColor: "#C31A7F"
  },
  {
    duration: "6 Month",
    price: "₹ 250.00",
    features: [
      "1 Meeting Per Day",
      "2 posts Per Day",
      "No Featured Posts",
      "Post Filter Option",
      "Featured Section Filter Locked",
      "Medicine Vault Locked",
      "Scheduler Locked",
      "Whatsapp Feature Availability"
    ],
    bgColor: "#084943"
  },
  {
    duration: "1 Year",
    price: "₹ 500.00",
    features: [
      "1 Meeting Per Day",
      "2 posts Per Day",
      "No Featured Posts",
      "Post Filter Option",
      "Featured Section Filter Locked",
      "Medicine Vault Locked",
      "Scheduler Locked",
      "Whatsapp Feature Availability"
    ],
    bgColor: "#FFA000"
  }
];

  return (
    <div className="bg-[#FFF6FB] min-h-screen h-[100%] ">
      <div className="header">
        <HomeNav />
      </div>
      {/** title space */}

      {/** Subscription Models components */}
      <div className=" justify-start pl-20 mt-7">
        <NavLink to="/home">
          <BiArrowBack size={24} className="" />
        </NavLink>
      </div>
      <div className="flex flex-row justify-center items-center ">
        <div className="flex flex-col justify-center items-center p-4 pt-0">
          <h1 className="text-[black] text-[26px] font-bold ">
            Choose the Plan that’s right for you
          </h1>
          <p className="text-[black] text-[16px]  font-semibold">
            Subscribers with a verified
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap px-5 justify-evenly">
        { console.log("Success<<<<<<",subscriptions)}
      {subscriptions.map((subscription, index) => (
        <div
          key={index}
          className="flex flex-col w-[350px] mt-2 h-full rounded-[30px] justify-center items-center py-[25px]"
          style={{
            backgroundColor: subscription.bgColor,
            boxShadow: "0px 20px 60px 0px #0000001A"
          }}
        >
          <div
            className="flex w-[100px] h-[100px] rounded-full bg-white items-center justify-center text-center shadow-2xl"
            style={{ boxShadow: "0px 5px 20px 0px #0000001A" }}
          >
            <h2 className="font-bold text-[18px] px-7">{subscription.duration}</h2>
          </div>
          <div className="text-white text-[20px] font-bold py-3">{subscription.price}</div>
          <ul className="list-none w-full px-[35px]">
            {subscription.plan_features.map((feature, idx) => (
              <li
                key={idx}
                className="flex flex-row text-white text-[14px] gap-4 items-center leading-[2]"
              >
                {typeof feature === "string" ? (
                  <>
                    <BsCheck2 />
                    {feature}
                  </>
                ) : (
                  <>
                    {feature.available ? <BsCheck2 /> : <RxCross2 />}
                    {feature.feature}
                  </>
                )}
              </li>
            ))}
          </ul>
          <button className="border-[2px] border-white text-white rounded-[20px] w-[153px] h-[45px] mt-12 -mb-2">
            <NavLink to="/Subscription_Payment_Method">Buy Now</NavLink>
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SubscriptionModels;
