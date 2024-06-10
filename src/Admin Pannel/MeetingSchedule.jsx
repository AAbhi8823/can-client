import React, { useState } from 'react';
import "./MeetingSchedule.css";
import five from '../img/five.png';
import axios from 'axios';
import { baseurl } from '../Api/baseUrl';
import Cookies from 'js-cookie'
const MeetingSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    topic: '',
    type: 2,
    duration: 40,
    agenda: '',
    timezone: 'Asia/Kolkata',
    meetingTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'type' && value !== '2') {
      // If type is not 'Scheduled', hide the meetingTime input
      setMeetingDetails(prevState => ({
        ...prevState,
        meetingTime: '',
        [name]: value
      }));
    } else if (name === 'meetingTime') {
      // Prevent selecting past times
      const currentTime = new Date().toISOString().slice(0, 16); // Current time in format "YYYY-MM-DDTHH:mm"
      if (value < currentTime) {
        return; // Do not update state if the selected time is in the past
      }
      setMeetingDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setMeetingDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleCreateMeeting = async () => {
    const authToken = Cookies.get("token")

    console.log("Creating::>>",authToken)
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const payload = {
      topic: meetingDetails.topic,
      type: meetingDetails.type,
      duration: meetingDetails.duration,
      agenda: meetingDetails.agenda,
      timezone: meetingDetails.timezone,
      meetingTime: meetingDetails.meetingTime,
    };
  
    try {
      // Make the API request with the authToken included in the headers
      const response = await axios.post(`${baseurl}/meeting/add-meeting`, payload, {
        headers: headers
      });
      
      console.log('Create meeting response:', response.data);
  
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };
  
  return (
    <section className="host-wrapper w-[100%] p-10">
      <div className="container">
        <div className="row">
          <div className="lg:w-[40%] md:w-[100%] sm:w-[100%] w-[100%]">
            <div className="host-heading">
              <h1>Host or manage<br /> meeting for<br /> your loved ones</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur inventore ipsa sapiente, dicta aliquid incidunt</p>
              <div className="host-btn">
                <button className="manage-btn">Manage Meeting</button>
                <button className="create-btn" onClick={() => setIsModalOpen(true)}>Create a Meeting</button>
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
                    <input type="text" name="option" placeholder="Option 1..." />
                    <input type="text" name="option" placeholder="Option 2..." />
                    <input type="text" name="option" placeholder="Option 3..." />
                  </div>
                </div>
                <div className="text-center my-[20px]">
                  <button className="create-btn">Create a poll</button>
                </div>
              </form>
              <h4 className='mb-5'>Previous poll</h4>
              <PreviousPolls />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create a Meeting</h2>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            <div className="modal-body">
              <div className="host-row">
                <label htmlFor="topic">Topic</label>
                <input
                  type="text"
                  name="topic"
                  placeholder="Topic"
                  value={meetingDetails.topic}
                  onChange={handleChange}
                />
              </div>
              <div className="host-row">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  value={meetingDetails.type}
                  onChange={handleChange}
                >
                  <option value={1}>Immediate</option>
                  <option value={2}>Scheduled</option>
                </select>
              </div>
              {meetingDetails.type === '2' && ( // Check if type is 'Scheduled'
                <div className="host-row">
                  <label htmlFor="meetingTime">Meeting Time</label>
                  <input
                    type="datetime-local"
                    name="meetingTime"
                    value={meetingDetails.meetingTime}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="host-row">
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  value={meetingDetails.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="host-row">
                <label htmlFor="agenda">Agenda</label>
                <textarea
                  name="agenda"
                  placeholder="Agenda"
                  value={meetingDetails.agenda}
                  onChange={handleChange}
                />
              </div>
              <div className="host-row">
                <label htmlFor="timezone">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  value={meetingDetails.timezone}
                  readOnly
                />
              </div>            </div>
            <div className="modal-footer">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleCreateMeeting}>Create</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const PreviousPolls = () => {
  const pollData = [
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
  ];

  return (
    <div className="prev-polls">
      {pollData.map((poll, index) => (
        <div className="prevpoll-box" key={index}>
          <div className="prebox-head">
            <div className='pre-left'>
              <div className="head-img">
                <img src={poll.img} alt="user-img" />
              </div>
              <div className="head-cont">
                <h3>{poll.title}</h3>
                <span>{poll.date}</span>
              </div>
            </div>
            <div className="head-time">
              <div className='htime-img'>:</div>
              <span>{poll.time}</span>
            </div>
          </div>
          <div className="prebox-footer">
            <div className="profoot-img">
              {[...Array(7)].map((_, i) => (
                <img src={poll.img} alt="user-img" key={i} />
              ))}
            </div>
            <div className="profoot-cont">
              <span>{poll.users} Users</span>
              <span>Interacted</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingSchedule;
