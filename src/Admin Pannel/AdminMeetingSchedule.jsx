import React from 'react';
import AdminPage from "./AdminPage";
import {MeetingSchedule} from "./MeetingSchedule";

function AdminMeetingSchedule() {
  return (
    <AdminPage
    AdminpageContent={
        <>
          <div className="flex justify-center">
            <MeetingSchedule style={{ width: "95%" }} />
          </div>
        </>
      }
    >
      {/* Add your additional elements here */}
    </AdminPage>
  );
}

export default AdminMeetingSchedule;
