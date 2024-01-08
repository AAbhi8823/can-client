// import React, { useState } from 'react'
import maincontent from '../Photos/maincontent.svg'
import Chart from "react-apexcharts";
import star from "../Photos/star.svg"
import fileUpload from "../Photos/fileUpload.svg"
import './Content.css'
import React, { useState } from 'react'
// import Page from "../Layouts/Pages";
import AdminPage from "./AdminPage";
import AdminTable from './AdminMainTable'
import AdminInput from './AdminInput'


const Content = () => {

  const [state, setState] = useState(
    {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 30, 30, 30, 30, 30, 30, 30]
        },
        {
          name: "series-1",
          data: [50, 50, 50, 50, 50, 50, 50, 50]
        },
        {
          name: "series-1",
          data: [20, 20, 20, 20, 20, 20, 20, 20]
        }
      ]
    }
  )
  const [mainstate, setmainState] = useState(
    {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 60, 20, 70, 20, 60, 20]
        }
      ]
    }
  )
  const [pie, setPie] = useState(
    {
      options: {},
      series: [44, 55, 41, 17, 100],
      labels: ['A', 'B', 'C', 'D', 'E']
    }
  )

  return (
    <AdminPage
      AdminpageContent={(
        <div className='p-4' >
          <section className=' content-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:pt-[30px]' >
            <div className='main-content  rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content Rs-content text-2xl flex items-center ' >
                  ₹1000,00
                </div>
              </div>
              <div className='Rs-content text-2xl content-balance ' >
                Total Balance
              </div>
            </div>

            <div className='main-content  rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content Rs-content text-2xl flex items-center ' >
                  103
                </div>
              </div>
              <div className='Rs-content text-2xl content-balance ' >
                Total Users
              </div>
            </div>

            <div className='main-content rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content Rs-content text-2xl flex items-center ' >
                  103
                </div>
              </div>
              <div className='Rs-content text-2xl content-balance ' >
                Total Cancer Fig..
              </div>
            </div>

            <div className='main-content rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content Rs-content text-2xl flex items-center ' >
                  103
                </div>
              </div>
              <div className='Rs-content text-2xl content-balance ' >
                Total Caregivers
              </div>
            </div>

            <div className='main-content  rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content Rs-content text-2xl flex items-center ' >
                  103
                </div>
              </div>
              <div className='Rs-content text-2xl content-balance ' >
                Total Veteran
              </div>
            </div>
          </section>

          <section className='grid grid-cols-4 gap-4 md:pt-[30px] content-section ' >
            <div className='rating-content main-content lg:max-h-[577px] rounded-[40px] bg-[#fff] col-span-4 md:col-span-2 bg-#ffff '>
              <div className='flex'>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content font-bold flex items-center'>
                  <div className=' text-[15px] mr-[145px] '>
                    Subscriptions Earning
                  </div>
                  <div className=' text-[10px] mr-[42px] mt-[20px] content-graph-text '>
                    1 week  &nbsp;  &nbsp; 1 month  &nbsp; &nbsp;6 month
                  </div>
                  <div className=' text-[10px] mr-[50px] '>
                    Weekly
                  </div>
                </div>
              </div>
              <div className='content-graph' >
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  width="600"
                  height="450"
                />
              </div>
            </div>

            <div className='col-span-4 md:col-span-2 bg-#ffff '>
              <div className='main-content mb-[30px] rounded-[40px] bg-[#fff] col-span-4 md:col-span-2 bg-#ffff '>
                <div className='flex items-center'>
                  <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                    <img src={maincontent} alt="" />
                  </div>
                  <div className='text-content font-bold text-[20px] items-center'>
                    User Age Stamp
                  </div>
                  <div className='text-content ml-[180px] flex text-[14px] items-center font-semibold'>
                    Gender Distribution Data
                  </div>
                </div>
                <div className='content-graph flex'>
                  <div>
                    <Chart
                      options={mainstate.options}
                      series={mainstate.series}
                      type="bar"
                      width="300"
                    />
                  </div>
                  <div className='flex'   >
                    <Chart className='ml-20 justify-center items-center' style={{ justifyContent: "center" }} options={pie.options} series={pie.series} type="donut" width="200" />
                  </div>
                </div>
              </div>

              <div className='main-content rounded-[40px] bg-[#fff] col-span-4 md:col-span-2 bg-#ffff '>
                <div className='flex items-center'>
                  <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                    <img src={maincontent} alt="" />
                  </div>
                  <div className='text-content font-bold  text-[20px] items-center'>
                    User Age Stamp
                  </div>
                  <div className='text-content ml-[180px] flex text-[14px] items-center font-semibold'>
                    Gender Distribution Data
                  </div>
                </div>
                <div className='content-graph flex'>
                  <div>
                    <Chart
                      options={mainstate.options}
                      series={mainstate.series}
                      type="bar"
                      width="300"
                    />
                  </div>
                  <div className='flex'   >
                    <Chart className=' justify-center items-center ml-20' style={{ justifyContent: "center" }} options={pie.options} series={pie.series} type="donut" width="200" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='grid grid-cols-4 gap-4  md:pt-[30px] px-[30px]content-section ' >
            <div className='rating-content main-content  rounded-[40px] bg-[#fff] col-span-4 md:col-span-2 bg-#ffff '>
              <div className='flex'>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className='text-content font-bold flex items-center'>
                  <div className=' text-[15px] mr-[145px] '>
                    Reviews
                  </div>
                </div>
              </div>

              <div className='p-[15px]' >
                <div className=' mx-auto review-section max-w-[540px] sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 grid gap-2 ' >
                  <div className=" pl-[82px] border-r-2">
                    <div>
                      Total Reviews
                    </div>
                    <div className='font-bold' >
                      10.0k
                    </div>
                    <div className='text-fontSize' >
                      Growth in reviews per month
                    </div>
                  </div>

                  <div className='pl-[82px]'>
                    <div>
                      Average Rating
                    </div>
                    <div className='flex font-bold ' >
                      4.0 <img className='mx-1' src={star} alt="" />
                      <img className='mx-1' src={star} alt="" />
                      <img className='mx-1' src={star} alt="" />
                      <img className='mx-1' src={star} alt="" />
                      <img className='mx-1' src={star} alt="" />
                    </div>
                    <div className='text-fontSize' >
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
              <div className='pl-[80px]' >
                <div className=' flex' >
                  <img className='mr-3' src={star} alt="" /> <div className='mr-3' > 5 </div>
                  <div className="bg-blue-600 mr-3 h-2.5 rounded-full mt-2 " style={{width:'60%'}}></div><div> 20.0k </div>
                </div>
                <div className=' flex' >
                  <img className='mr-3' src={star} alt="" /> <div className='mr-3' > 5 </div>
                  <div className="bg-blue-600 mr-3 h-2.5 rounded-full mt-2 " style={{width:'50%'}}></div><div> 20.0k </div>
                </div>
                <div className=' flex' >
                  <img className='mr-3' src={star} alt="" /> <div className='mr-3' > 5 </div>
                  <div className="bg-blue-600 mr-3 h-2.5 rounded-full mt-2 " style={{width:'40%'}}></div><div> 20.0k </div>
                </div>
                <div className=' flex' >
                  <img className='mr-3' src={star} alt="" /> <div className='mr-3' > 5 </div>
                  <div className="bg-blue-600 mr-3 h-2.5 rounded-full mt-2 " style={{width:'30%'}}></div><div> 20.0k </div>
                </div>
                <div className=' flex' >
                  <img className='mr-3' src={star} alt="" /> <div className='mr-3' > 5 </div>
                  <div className="bg-blue-600 mr-3 h-2.5 rounded-full mt-2 " style={{width:'20%'}}></div><div> 20.0k </div>
                </div>
              </div>
            </div>

            <div className='col-span-4 md:col-span-2 bg-#ffff '>
              <div className='main-content  rounded-[40px] bg-[#fff] col-span-4 md:col-span-2 bg-#ffff '>
                <div className='flex '>
                  <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                    <img src={maincontent} alt="" />
                  </div>
                  <div className='text-content font-bold text-[20px] flex items-center'>
                    <div>
                      User Age Stamp
                    </div>
                  </div>
                </div>
                <div className='p-4' >
                  <div className='pie-section' >
                    <Chart options={pie.options} series={pie.series} type="donut" width="300" />
                  </div>
                  <div className='text-center' >
                    <h1 className='text-2xl font-semibold'>8,550</h1>
                    <p className=' font-semibold' >Live User</p>
                  </div>
                </div>
              </div>
            </div>
          </section >

          <section className=' md:pt-[30px] content-section' >
            <div className='main-content  rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className=' font-semibold text-[15px] mr-[145px]  flex items-center ' >
                  Support & Help
                </div>
              </div>
              <div className=' grid gap-3 p-5 ' >
                <div className='rounded-[40px]  grid   border support-content' >
                  <h2 className='font-semibold ' >Create a new ticket</h2>
                  <p className='text-fontSize' >Fill up all the information here and then click the submit button</p>
                  <div className='py-[15px]' >
                    <AdminInput />
                  </div>
                  <div className='flex' >
                    <div className=' m-2 fileSection cursor-pointer ' >
                      <img src={fileUpload} alt="" />
                    </div>
                    <div className=' mt-2' >
                      <button className='Submit text-white'>Submit</button>
                    </div>
                  </div>
                </div>
                <div className='rounded-[40px]  grid   border support-content' >
                  <AdminTable />
                </div>
              </div>
            </div>
          </section>

          <section className=' md:pt-[30px] content-section ' >
            <div className='main-content  rounded-[40px] bg-[#fff] '>
              <div className='flex '>
                <div className="icon-content rounded-customBorder mr-2 bg-[#ED839A] p-3 ">
                  <img src={maincontent} alt="" />
                </div>
                <div className=' font-semibold text-[15px] mr-[145px]  flex items-center ' >
                  Support & Help
                </div>
              </div>
              <div className=' grid gap-3 grid-cols-3 p-5 ' >
                <div>
                  <div className='text-center content-end-section  bg-[#ED839A] rounded-full p-2 text-white ' >
                    Authentication and Authorization
                  </div>
                </div>
                <div className='' >
                  <div className='text-center content-end-section m-auto max-w-[350px] bg-[#EFC319] rounded-full p-2 text-white  ' >
                    API Key Management
                  </div>
                </div>
                <div>
                  <div className='text-center content-end-section bg-[#ED839A] rounded-full p-2 text-white  ' >
                    API Documentation and Testing
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div >
      )}
    />
  )
}

export default Content