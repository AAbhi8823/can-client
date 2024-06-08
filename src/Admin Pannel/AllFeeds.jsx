import React from 'react'
import AdminPage from "./AdminPage";
import { AdminHomePost } from './AdminHomePost';
export const AllFeeds = () => {
  return (
    <AdminPage
    AdminpageContent={
        <>
          <div className="flex justify-center">
            <AdminHomePost style={{ width: "95%" }} />
            {/* AllFeeds  */}
          </div>
        </>
      }
    >
      {/* Add your additional elements here */}
    </AdminPage>
  )
}
