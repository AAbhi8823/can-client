import React, {useState} from 'react'

const dataArray = [
    {
      id: 1,
      heading: 'Announcements Notification',
      description: 'Know on activities in the app',
    },
    
    {
        id: 2,
        heading: 'Meetings Notifications',
        description:'Get update on the meeting',
    },
    {
        id: 3,
        heading: 'Medicine Reminder Notification',
        description:'Get notification on medicine you need',
    },
    {
        id: 4,
        heading: 'Doctor Appointments Reminders Notification',
        description:'Get notification on doctor appointments reminders you take',
    },
    {
        id: 5,
        heading:'Freeline Sticky In Notification',
        description:'Make Freeline available in the mobile’s notification panel always',
    }
    
  ];

const Notification = () => {
    const [toggleStates, setToggleStates] = useState(dataArray.map(() => true));

    // Function to toggle the button state for a specific element
    const toggleButton = (index) => {
      setToggleStates((prevState) =>
        prevState.map((state, i) => (i === index ? !state : state))
      );
    };
  

  return (
    <div className='flex flex-col gap-3' >
      {dataArray.map((data, index) => (
        <div
          key={data.id}
          className={`flex flex-row bg-white px-10 cursor-pointer py-4 rounded-[20px] items-center lg:md:w-[700px] justify-between border-[0.5px] border-[#e3e2e2]`}
          style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex flex-col">
            <h2 className='font-[600]'>{data.heading}</h2>
            <p className='text-[14px] font-[450] text-[#7C7C7C]'>{data.description}</p>
          </div>
          <div>
            <div
              className={`flex rounded-[30px] w-[45px] p-1 ${
                toggleStates[index] ? ' bg-[#C31A7F] justify-end' : 'justify-start bg-[#E2E2E2]'
              }`}
              style={{ boxShadow: '0px 15px 30px rgba(139, 21, 57, 0.10' }}
              onClick={() => toggleButton(index)}
            >
              <div className='bg-[#fff] text-white rounded-[100%] w-[20px] h-[20px]' ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notification
