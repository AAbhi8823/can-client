
import React from "react";
import AdminPage from "./AdminPage";
import UsersReportss from "./UsersReportss";
import AdminSettings from "../Photos/AdminIcons/Adminsetting.svg";
import {AdminToken} from './AdminToken'
export const UsersTransaction = () => {
  return (
    <AdminPage
    AdminpageContent={
      <>
        <div className="flex justify-center">
          <UsersReportss style={{ width: "95%" }} />
        </div>
      </>
    }
  />
  )
}
