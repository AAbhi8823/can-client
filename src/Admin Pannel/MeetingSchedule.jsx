import React, { useEffect, useState } from 'react';
import "./MeetingSchedule.css";
import five from '../img/five.png';
import axios from 'axios';
import { adminbaseurl,AdminToken } from './AdminToken';
import Cookies from 'js-cookie';

const MeetingSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pollList,setPollList]=useState([]);
  const [meetingDetails, setMeetingDetails] = useState({
    topic: '',
    type: 2,
    duration: 40,
    agenda: '',
    timezone: 'Asia/Kolkata',
    meetingTime: '',
  });
  const [pollDetails, setPollDetails] = useState({
    question: '',
    options: ['', '', ''],
    pollEndDate: '', // Set the end date as required
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type' && value !== '2') {
      setMeetingDetails(prevState => ({
        ...prevState,
        meetingTime: '',
        [name]: value
      }));
    } else if (name === 'meetingTime') {
      const currentTime = new Date().toISOString().slice(0, 16);
      if (value < currentTime) {
        return;
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

  const handlePollChange = (e) => {
    const { name, value } = e.target;
    const index = parseInt(name.split('-')[1], 10);
    setPollDetails(prevState => {
      const newOptions = [...prevState.options];
      newOptions[index] = value;
      return {
        ...prevState,
        options: newOptions
      };
    });
  };

  const handleCreateMeeting = async () => {
    const authToken = Cookies.get("token");
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
      const response = await axios.post(`${adminbaseurl}/meeting/add-meeting`, payload, { headers });
      console.log('Create meeting response:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get("token");
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const payload = {
      poll_question: pollDetails.question,
      poll_options: pollDetails.options.map(option => ({ option })),
      poll_end_date: pollDetails.pollEndDate,
    };
  
    try {
      const response = await axios.post(`${adminbaseurl}/poll/add-poll`, payload, { headers });
      console.log('Create poll response:', response.data);
      setPollDetails({ question: '', options: ['', '', ''], pollEndDate: '2024-07-05' });
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };
  useEffect(()=>{
    getPolllist()
  },[])
  
  const getPolllist = async () =>{
    const info={
      headers: {
        Authorization: `Bearer ${AdminToken}`,
        "Content-Type": "application/json",
      },
    }
    try{
      const responce=await axios.get(`${adminbaseurl}/poll/get-poll-list`,info)
      console.log("adminbaseurl::>>>>",responce.data?.resData?.data)
      setPollList(responce.data?.resData?.data)
    }
    catch(error){
      console.error('Error getting polllist:', error);
    }
  }
  
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
              <form onSubmit={handleCreatePoll}>
                <div className="host-row">
                  <label htmlFor="question">Add Question</label>
                  <textarea
                    name="question"
                    placeholder="Type here..."
                    value={pollDetails.question}
                    onChange={(e) => setPollDetails({ ...pollDetails, question: e.target.value })}
                  />
                </div>
                <div className="host-row mt-[10px]">
                  <label htmlFor="options">Add Options</label>
                  <div className="h-in">
                    {pollDetails.options.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`option-${index}`}
                        placeholder={`Option ${index + 1}...`}
                        value={option}
                        onChange={handlePollChange}
                      />
                    ))}
                  </div>
                </div>
                <div className="host-row mt-[10px]">
                  <label htmlFor="pollEndDate">Poll End Date</label>
                  <input
                    type="date"
                    name="pollEndDate"
                    value={pollDetails.pollEndDate}
                    onChange={(e) => setPollDetails({ ...pollDetails, pollEndDate: e.target.value })}
                  />
                </div>
                <div className="text-center my-[20px]">
                  <button className="create-btn" type="submit">Create a poll</button>
                </div>
              </form>
              <h4 className='mb-5'>Previous poll</h4>
              <PreviousPolls polldata={pollList} />
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
              {meetingDetails.type === '2' && (
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
              </div>
            </div>
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

const PreviousPolls = (data) => {
  const pollData = [
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
    { title: 'Meeting Poll', date: '18/09/23', time: '9:00 PM', users: 47, img: five },
  ];

  console.log("Please:>>>>>",data.polldata)
  return (
    <div className="prev-polls">
      {data?.polldata?.length>0 && data?.polldata?.map((poll, index) => (
        <div className="prevpoll-box" key={index}>
          <div className="prebox-head">
            <div className='pre-left'>
              <div className="head-img">
                <img src={poll.img} alt="user-img" />
              </div>
              <div className="head-cont">
                <h3>{poll.poll_question}</h3>
                <span>{poll.createdAt}</span>
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
