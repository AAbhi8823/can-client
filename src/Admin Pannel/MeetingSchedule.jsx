import React from 'react'
import "./MeetingSchedule.css";
import five from '../img/five.png'
export const MeetingSchedule = () => {
  return (

<section className="host-wrapper w-[100%] p-10">
  <div className="container">
    <div className="row">
      <div className="lg:w-[40%] md:w-[100%] sm:w-[100%] w-[100%]">
        <div className="host-heading">
          <h1>Host or manage<br></br> meeting for<br></br> you loved ones</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur inventore ipsa sapiente, dicta aliquid incidunt</p>
          <div className="host-btn">
            <button>Manage Meeting</button>
            <button>Create a Meeting</button>
          </div>
        </div>
      </div>
      <div className="lg:w-[60%] md:w-[100%] sm:w-[100%] w-[100%]">
        <div className="host-form">
          <h3>Manage Polls</h3>
          <h4>Create a poll</h4>
          <form action="submit">
            <div className="host-row">
              <label htmlFor="name">Add Question</label>
              <textarea name="message" placeholder="Type here..." />
            </div>
            <div className="host-row mt-[10px]">
              <label htmlFor="name">Add Option</label>
              <div className="h-in">
                <input type="text" name="option" placeholder="Option1..."/>
                <input type="text" name="option" placeholder="Option1..."/>
                <input type="text" name="option" placeholder="Option1..."/>
              </div>
            </div>
            <div className="text-center my-[20px]">
              <button className="create-btn">Create a poll</button>
            </div>
          </form>
          <h4 className='mb-5'>Previous poll</h4>
          <div className="prev-polls">
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
          </div>
          <div className="prev-polls">
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
            <div className="prevpoll-box">
              <div className="prebox-head">
                <div className='pre-left'>
                  <div className="head-img">
                    <img src={five} alt="user-img" />
                  </div>
                  <div className="head-cont">
                    <h3>Meeting Poll</h3>
                    <span>18/09/23</span>
                  </div>
                </div>
                <div className="head-time">
                  <div className='htime-img'>
                    {/* <img src={five} alt="dots" /> */}
                    :
                  </div>
                  <span>9:00 PM</span>
                </div>
              </div>
              <div className="prebox-footer">
                <div className="profoot-img">
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                  <img src={five} alt="user-img" />
                </div>
                <div className="profoot-cont">
                    <span>47 Users</span>
                    <span>Interacted</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
