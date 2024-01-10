import React, { useEffect, useState } from "react";
import LandingPageFooter from "./LandingPageFooter";
import Avatar from "@mui/material/Avatar";
import special from "../Photos/special.png"
import NavLanding from "../Components/NavLanding";
import mainCloud from "../Photos/MainCloud.png";
import leftCloud from "../Photos/LeftCloud.png";
import rightCloud from "../Photos/RightCloud.png";
import SunImg from "../Photos/Sun.png";
import WhyCanmainImg from "../Photos/mobileWhyCan.png";
import group1 from "../Photos/group1.png";
import group2 from "../Photos/group2.png";
import group3 from "../Photos/group3.png";
import group4 from "../Photos/group4.png";
import Mount1 from "../Photos/Mount1.png";
import cloud1 from "../Photos/cloud1.png";
import cloud2 from "../Photos/cloud2.png";

const WhyCan = () => {
  const [scroll, setScroll] = useState(0);
  const [Nav, setNav] = useState(false);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scroll > 0) {
        setNav(true);
      } else {
        setNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkScroll(); // Initial check when the component mounts

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const [toggleNav, setToggleNav] = useState(false);
  const [menu, setMenu] = useState(false);


  const Data = [
    {
      id: 1,
      name: "Neelu Kedia",
      image: require("../Photos/neelukedia.jpg"),
      des: "Our inspiration and our fighter",
    },
    {
      id: 2,
      name: "Subham Kedia",
      image: require("../Photos/Subhamkedia.jpg"),
      des: "Founder of CAN",
    },
    {
      id: 3,
      name: "Pushkar Shaw",
      image: require("../Photos/PushkarShaw.jpg"),
      des: "Co-Founder of CAN",
    },
    {
      id: 4,
      name: "Lavanya Tulsian",
      image: require("../Photos/LavanyaTulsian.jpg"),
      des: "CAN Supporter",
    },
  ];


  const [MainCloud, setMainCloud] = useState(false);
  return (
    <>
      {/* navbar */}
      <div className="flex justify-center">
        <NavLanding onStateChange={Nav} />
      </div>
      <div className="block lg:hidden mt-16">
        <img src={WhyCanmainImg} className="object-contain" />
      </div>
      <div className="relative overflow-hidden lg:block hidden ">
        {/* <img className='object-cover' src={mountainExample} alt='mountain' /> */}
        {/* <img className='object-cover' src={MountainImg} /> */}
        <div className="bg-[#52d8e9] w-full h-[100vh] overflow-hidden over-1">
          {/* <img src={WhyCanMountain}  />
                    <img src={ForestTree} className='absolute top-0 ' /> */}
          {/* <img src={mountainForest} /> */}
          {MainCloud ? (
            <img
              src={mainCloud}
              className="absolute top-[100px] animate duration-[1.2s]"
            />
          ) : (
            <img
              src={mainCloud}
              className="animate duration-[1.2s] absolute  top-[500px]"
            />
          )}
          <img
            src={leftCloud}
            className={
              MainCloud
                ? "absolute w-[50%] top-[100px] left-[-100px] animate duration-[1s] "
                : " animate duration-[1s] absolute w-[50%] top-[70px] left-[-770px]"
            }
          />
          <img
            src={rightCloud}
            className={
              MainCloud
                ? "absolute w-[50%] top-[-5px] right-[-118px] animate duration-[1s]"
                : " animate duration-[1s] absolute w-[50%] top-[-45px] right-[-800px]"
            }
          />
          <img
            src={SunImg}
            className={
              MainCloud
                ? "absolute w-[70px] top-[209px] left-[772px] animate duration-[1s]"
                : " animate duration-[1s] absolute w-[150px] top-[800px] left-[772px] "
            }
          />

          <img
            onMouseEnter={() => setMainCloud(true)}
            onMouseLeave={() => setMainCloud(false)}
            src={Mount1}
            className="absolute w-full h-[100%] top-[5px]"
          />
        </div>
        {/* <div className='absolute top-[470px] z-[15]  left-[663px] ' >
                        <img className='' src={motherChildImg} />
                    </div> */}
      </div>
      {/* section 1  */}
      <div className=" grid grid-cols-1  lg:py-5 px-1">
        <div className="text-center px-1 lg:py-5 ">
          <h1 className="font-bold text-[2.9296875vw] med-1 fnt-3 text-[#084943]">
            WHY CAN?
          </h1>
          <br />
          <p className="font-medium lg:block hidden fnt-2 text-[1.2vw] line-h text-[#084943]">
            On the day of my mother's diagnosis, I felt an overwhelming sense of
            loneliness and <br /> helplessness. I yearned for someone, perhaps a
            cancer survivor or someone <br /> knowledgeable about the disease,
            to reassure me that everything would be alright.
          </p>
          <p className="font-medium lg:hidden block px-5  fnt-2 text-[1.2vw] text-[#084943]">
            On the day of my mother's diagnosis, I felt an overwhelming sense of
            loneliness and helplessness. I yearned for someone, perhaps a cancer
            survivor or someone knowledgeable about the disease, to reassure me
            that everything would be alright.
          </p>
        </div>
      </div>
      <div className="grid  grid-cols-1 py-5 px-[10%]  sm:grid-cols-2 ">
        <div className="py-5 px-5 med-1 ">
          <h1 className="font-bold text-[2.9296875vw] fnt-3 text-[#084943]">
            Where it Began..
          </h1>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943]  line-h">
            <span className="font-bold">
              The need for CAN truly hit me on the day of the PET-CT scan.
            </span>{" "}
            There were six attendants accompanying my mother, and we were all
            gripped by fear. The mindset within my family was that cancer
            equated to death, pain, and immense suffering. We had allowed a
            difficult situation to become even more daunting in our minds,
            surrendering all hope.{" "}
            <span className="font-bold">
              {" "}
              Each of us viewed my mother's condition as a ticking time bomb.
            </span>
          </p>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943]  line-h">
            I was visibly scared and overcome with panic. The nurse recognized
            this and granted me permission to enter the PET-CT hall, which was
            normally off-limits due to radiation. Inside the waiting room, I
            encountered five or six fighters, some awaiting their turn for the
            scan while others were there for observation. Among them were both
            newcomers and seasoned veterans.
          </p>
        </div>
        <div className="justify-end flex px-5">
          <img src={group1} className="" alt="" />
        </div>
      </div>
      <div className="grid  grid-cols-1 px-[10%] lg:py-10 reverse-1   sm:grid-cols-2  ">
        <div className="flex justify-center px-5 ">
          <img src={group2} className="" alt="" />
        </div>
        <div className="py-5 px-5 med-1">
          <h1 className="font-bold text-[2.9296875vw] fnt-3 text-[#084943]">
            A hope of light..
          </h1>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943]  line-h">
            These individuals attempted to engage in small talk, sensing the
            unease that permeated the room, striving to alleviate each other's
            discomfort. It was during this time that an elderly lady wearing a
            burqa noticed my mother's despair. Sensing the need for solace, she
            shared snippets of her own cancer journey with my mother.
          </p>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943]  line-h">
            This remarkable woman proceeded to recount her experiences to
            everyone present, emphasizing that cancer was nothing to be afraid
            of. She mentioned that this was her seventh PET scan, having endured
            numerous rounds of chemotherapy, around 20 to 30 in total. Her
            narrative exuded an aura of ease and positivity, which infused
            everyone with hope and encouraged them to open up and share their
            own journeys.
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:py-10 px-[10%]   sm:grid-cols-2 ">
        <div className="py-5 px-5 med-1">
          <h1 className="font-bold text-[2.9296875vw] fnt-3 text-[#084943]">
            The turning point
          </h1>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943] line-h">
            The PET-CT scan marked a turning point for my mother. After a
            prolonged period of silence, she spoke for the first time. Her words
            were filled with a newfound perspective, she said,{" "}
            <span className="font-bold ">
              {" "}
              "Agar aisa bhi chalta raha, to koi problem nahi hai, mein lad
              lungi."
            </span>
          </p>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943] line-h">
            Witnessing our mother's transformation ignited hope within our
            entire family and altered the course of our outlook. We were
            profoundly moved by this lady's intervention, and we yearn for her
            well-being wherever she may be. From the depths of our hearts, we
            express our gratitude to her.
          </p>
        </div>
        <div className="justify-center flex px-5">
          <img src={group3} className="" alt="" />
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:py-10 px-[10%] reverse-1  sm:grid-cols-2 ">
        <div className="justify-center flex px-5">
          <img src={group4} className=" px-5" alt="" />
        </div>
        <div className="py-5 px-5 med-1">
          <h1 className="font-bold text-[2.9296875vw] lg:mt-10 fnt-3 text-[#084943]">
            Brave journey began
          </h1>
          <br />
          <p className="text-[1.2vw] fnt-2 text-[#084943] line-h">
            Renewed with hope, we embarked on our journey to Bombay for
            treatment.
          </p>
          <br />
        </div>
      </div>
      <div className="liner-1" id="aboutus">
        <div className="grid grid-cols-1 py-10 px-[10%] relative   sm:grid-cols-3 ">
          <div className="flex justify-center">
            <img src={cloud1} className="absolute top-[-67px]" alt="" />
          </div>
          <div className="flex justify-center">
            <h1 className="font-bold lg:text-[2.9296875vw] text-[28px] text-[#47A4C1]">
              About Us
            </h1>
          </div>
          <div className="flex justify-end  ">
            <img src={cloud2} className="absolute top-[-67px] w-[40%]" alt="" />
          </div>
        </div>
        <div className="grid grid-cols-1   sm:grid-cols-2">
          <div className="flex items-center ">
            <div className="flex flex-wrap justify-center gap-14">
              {Data.map((item,index) => (
                <div className="text-center w-1/3" 
                key={index}
                >
                  <Avatar
                    alt="Nmy Sharp"
                    className="m-auto img2 img3 "
                    src={item.image}
                  />
                  <h1 className="font-semibold fnt-3  mt-3 text-[#47A4C1] text-[1.3vw]">
                    {" "}
                    {item.name}{" "}
                  </h1>
                  <p className="text-[#47A4C1] fnt-2 text-center text-[1.1vw]">
                    {" "}
                    {item.des}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center px-4  side-border">
            <div className="med-1 py-5">
              <div className="cen-1"> <img src={special} className="" alt="" /></div>
             
              <br />
              <h1 className="text-[#47A4C1] med-1 text-[1.2vw] fnt-2 lg:block md:block hidden">
                Special thanks to{" "}
                <span className="font-bold">
                  {" "}
                  Mausi, Mausaji and Family and other <br /> relatives,{" "}
                </span>{" "}
                who helped us out in this difficult time. <br />
                Heartfelt thanks from Subham.
              </h1>
              <h1 className="text-[#47A4C1] med-1 text-[1.2vw] fnt-2 lg:hidden md:hidden block">
                Special thanks to{" "}
                <span className="font-bold">
                  {" "}
                  Mausi, Mausaji and Family and other relatives,{" "}
                </span>{" "}
                who helped us out in this difficult time.
                Heartfelt thanks from Subham.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2  lg:block md:block hidden">
                Heartfelt Thanks to{" "}
                <span className="font-bold"> Kokilaben Hospital, Mumbai </span>{" "}
                for <br /> everything they have done for our family.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:hidden md:hidden block">
                Heartfelt Thanks to{" "}
                <span className="font-bold"> Kokilaben Hospital, Mumbai </span>{" "}
                for everything they have done for our family.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2  lg:block md:block hidden">
                Special thanks to{" "}
                <span className="font-bold">ExMyB and Bluespace </span> for
                helping <br /> us out with this project.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:hidden md:hidden block">
                Special thanks to{" "}
                <span className="font-bold">ExMyB and Bluespace </span> for
                helping  us out with this project.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2   lg:block md:block hidden">
                Gratitude to{" "}
                <span className="font-bold">
                  War on Cancer, Fabian Bolin Ted Talks
                </span>{" "}
                <br /> and many others who have motivated us through this <br />{" "}
                difficult fight against cancer.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:hidden md:hidden block">
                Gratitude to{" "}
                <span className="font-bold">
                  War on Cancer, Fabian Bolin Ted Talks
                </span>{" "}
                 and many others who have motivated us through this {" "}
                difficult fight against cancer.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:hidden md:hidden block ">
                Special thanks to our{" "}
                <span className="font-bold">
                  {" "}
                  UPES faculty and Manisha  Mohan ma’am
                </span>{" "}
                for guiding us in the pre- ideation phase.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2  lg:block md:block hidden">
                Special thanks to our{" "}
                <span className="font-bold">
                  {" "}
                  UPES faculty and Manisha <br /> Mohan ma’am
                </span>{" "}
                for guiding us in the pre- ideation <br /> phase.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2  lg:block md:block hidden ">
                Special thanks to{" "}
                <span className="font-bold"> Dhawal Chaturvedi </span>for
                somewhat <br /> turning this college project into a reality.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2   lg:hidden md:hidden block">
                Special thanks to{" "}
                <span className="font-bold"> Dhawal Chaturvedi </span>for
                somewhat  turning this college project into a reality.
              </h1>
              <br />
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:block md:block hidden">
                Extended gratitude to{" "}
                <span className="font-bold">
                  {" "}
                  Aayushmaan Sharma, Nidhish <br /> Gangwar, Atharva Pardeshi,
                  Siddhartha{" "}
                </span>{" "}
                and <span className="font-bold"> Aradhya </span> for <br />supporting
                and believing in CAN during the pre- ideation <br /> phase and hoping
                to work with them again in the future.
              </h1>
              <h1 className="text-[#47A4C1] med-1  text-[1.2vw] fnt-2 lg:hidden md:hidden block">
                Extended gratitude to{" "}
                <span className="font-bold">
                  {" "}
                  Aayushmaan Sharma, Nidhish  Gangwar, Atharva Pardeshi,
                  Siddhartha{" "}
                </span>{" "}
                and <span className="font-bold"> Aradhya </span> for supporting
                and believing in CAN during the pre- ideation  phase and hoping
                to work with them again in the future.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[80px]">
        <LandingPageFooter />
      </div>
    </>
  );
};

export default WhyCan;
