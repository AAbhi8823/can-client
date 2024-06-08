import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import HomeNav from "../Components/HomeNav";
import { baseurl } from "../Api/baseUrl";
import axios from "axios";
import "../Pages/Subscription_Models.css";

const SubscriptionModels = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/subscriptionplan/get-subscription-plan-list`
        );
        setSubscriptions(response?.data?.resData?.data);
      } catch (error) {
        console.error("Error fetching subscription models:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  // Fallback subscriptions in case API data is not available



  const handleBuyNow = (subscription) => {
    navigate("/Subscription_Payment_Method", { state: { subscription } });
  };

  return (
    <div className="bg-[#FFF6FB] min-h-screen h-[100%]">
      <div className="header">
        <HomeNav />
      </div>
      {/** title space */}
      <div className="justify-start pl-20 mt-7">
        <NavLink to="/home">
          <BiArrowBack size={24} />
        </NavLink>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center p-4 pt-0">
          <h1 className="text-[black] text-[26px] font-bold">
            Choose the Plan that’s right for you
          </h1>
          <p className="text-[black] text-[16px] font-semibold">
            Subscribers with a verified
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap px-5 justify-evenly">
        {subscriptions.length >0 && subscriptions.map((subscription, index) => (
          <div
            key={index}
            className="mod-box flex flex-col w-[350px] mt-2 h-full rounded-[30px] justify-center items-center py-[25px]"
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
            <div className=" text-[20px] font-bold py-3">{subscription.price}</div>
            <ul className="list-none w-full px-[35px]">
                {console.log("subscription::>>>>",subscription)}
              {subscription.plan_features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex flex-row gap-4 items-center leading-[2]"
                >
                  {typeof feature === "string" ? (
                    <>
                      <BsCheck2 />
                      {feature}
                    </>
                  ) : (
                    <>
                      {feature.is_available ? <BsCheck2 /> : <RxCross2 />}
                      {feature.feature_name}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <button
              className="border-[2px] rounded-[20px] w-[153px] h-[45px] mt-12 -mb-2"
              onClick={() => handleBuyNow(subscription)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionModels;
