import React from 'react'
import "./MeetingSchedule.css";

export const MeetingSchedule = () => {
    console.log("Setting:>>>>>")
  return (
    
<section className="host-wrapper w-[100%] p-10">
  <div className="container">
    <div className="row">
      <div className="w-[50%] ">
        <div className="host-heading">
          <h1>Host or manage<br></br> meeting for<br></br> you loved ones</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur inventore ipsa sapiente, dicta aliquid incidunt</p>
          <div className="host-btn">
            <button>Manage Meeting</button>
            <button>Create a Meeting</button>
          </div>
        </div>
      </div>
      <div className="w-[50%] ">
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
          <h4>Previous poll</h4>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
