import React from 'react'
import AdminPage from "./AdminPage";
import AdminUserTable from './AdminUserTable'
import AdminSettings from '../Photos/AdminIcons/Adminsetting.svg'

function AdminUserManagement() {
    return (
        <AdminPage
            AdminpageContent={
                <>
                    <div className='p-[15px] flex justify-between'>
                        <div className='flex' >
                            <div className='font-semibold mr-3 p-[10px]' >Users</div>
                            <div className='bg-[#fff] p-[10px] mr-3' style={{ borderRadius: "50px", boxShadow: " 0px 5px 30px 0px #0000000D" }}  >All</div>
                            <div className='mr-3 bg-[#fff] p-[10px]' style={{ borderRadius: "50px", boxShadow: " 0px 5px 30px 0px #0000000D" }} >Cancer Fighter</div>
                            <div className='mr-3 bg-[#fff] p-[10px]' style={{ borderRadius: "50px", boxShadow: " 0px 5px 30px 0px #0000000D" }} >Caregivers</div>
                            <div className='mr-3 border-5 bg-[#fff] p-[10px]' style={{ borderRadius: "50px", boxShadow: " 0px 5px 30px 0px #0000000D" }} >Veteran</div>
                        </div >
                        <div className='flex'>
                            <div>
                                <input className='p-[10px] mr-[10px] ' style={{ width: '280px', borderRadius: "30px" }} placeholder='Search' type="text" />
                            </div>
                            <div className='flex align-center' >
                                <img src={AdminSettings} alt="" />
                            </div>
                        </div>

                    </div >
                    <div className='flex justify-center' >
                        < AdminUserTable style={{ width: "95%" }} />
                    </div>
                </>
            }
        />
    )
}

export default AdminUserManagement