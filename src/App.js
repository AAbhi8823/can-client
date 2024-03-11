import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BeforeLoginHome from './Pages/BeforeLoginHome'
import Login from './Pages/Login'
import ChooseTitle from './Pages/ChooseTitle'
import PhoneNumber from './Pages/PhoneNumber'
import Register from './Pages/Register'
import RegisterImage from './Pages/RegisterImage'
import LoginOTP from './Pages/LoginOTP'
import Home from './Pages/Home'
import Test from './Pages/Test'
import CreatePost from './Components/CreatePost'
import ChatPage from './Pages/ChatPage'
import Meeting from './Pages/Meeting'
import Profile from './Pages/Profile'
import OldUserLogin from './Pages/OldUserLogin'
import OldUserLoginTitle from './Pages/OldUserLoginTitle'
import OldUserRegister from './Pages/OldUserLoginRegister'
import OldUserOTP from './Pages/OldUserOTP'
import OldUserSuccessfully from './Pages/OldUserSuccessfully'
import OldUserPass from './Pages/OldUserPass'
import HealthRecord from './Pages/HealthRecord'
import HealthRecord1 from './Pages/HealthRecord1'
import HealthCard from './Pages/HealthCard'
import HealthCard1 from './Pages/HealthCard1'
import Appointment from './Pages/Appointment'
import Appointment1 from './Pages/Appointment1'
import Medicine from './Pages/Medicine'
import Password from './Pages/Password'
import MultiPIN from './Pages/MultiPIN'
import LoginForm from './Pages/LoginForm'
import AddProfile from './Pages/AddProfile'
import LoginChooseTitle from './Pages/LoginchoseTitle'
import LoginDetails from './Pages/LoginDetails'
import LoginImage from './Pages/loginimage'
import LoginProfile from './Pages/Loginprofile'
import ShowProfile from './Pages/ShowProfile'
import ForgotPassword from './Pages/ForgotPassword'
import OtpVerify from './Pages/OtpVerify'
import ResetPassword from './Pages/ResetPassword'
import ResetPasswordSuccessfully from './Pages/ResetPasswordSuccessfully'
import SubscriptionModels from './Pages/Subscription_Models'
import Subscription_Payment_Method from './Pages/Subscription_Payment_Method'
import Medicine1 from './Pages/Medicine1'
import MeetingActive from './Pages/MeetingActive'
import HelpAFriend from './Pages/HelpAFriend'
import HelpFeedback from './Pages/HelpFeedback'
import Settings from './Pages/Settings'
import ProfileLock from './Pages/ProfileLock'
import SetPin from './Components/SetPin'
import SetPassword from './Components/SetPassword'
import BlockedAccounts from './Pages/BlockedAccounts'
import Notification from './Pages/Notification'
import HealthCard2 from './Pages/HealthCard2'
import KnowMore from './Pages/KnowMore'
import WhyCan from './Pages/WhyCan'
import TermsConditions from './Pages/TermsConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import ProfileSuccessAdd from './Pages/ProfileSuccessAdd'
import SplitButton from './Components/Splitbutton'
import SelectLabels from './Components/SelectLabels'
import UserProfile from './Pages/UserProfile'
import NewUserTitle from './Pages/NewUserTitle'
import NewUserDetails from './Pages/NewUserDetails'
import NewUserImage from './Pages/NewUserImage'
import NewUserPin from './Pages/NewUserPin'
import NewAddedProfile from './Pages/NewAddedProfile'
import AdminLogin from './Admin Pannel/AdminLogin'
import AdminContent from './Admin Pannel/Content'
import AdminUserManagement from './Admin Pannel/AdminUserManagement'
import Animate from './Pages/Animate'
import ContactUs from './Pages/ContactUs'
import ProfileUser from './Pages/ProfileUser'
import SlideBox from './Components/SlideBox'
import TabPanel from './Components/TabPanel'
import Mystory from './Components/MyStory'
import MeetingProfile from './Components/MeetingProfile'
import Saved from './Components/Saved'
import Carousel from './Components/Craousel'
import LoginCraousel from './Components/LoginCraousel'
import Cookies from 'js-cookie'
import { baseurl } from './Api/baseUrl'
import HealthProfile from './Components/HealthProfile'
import MedicineBank  from './Pages/MedicineBank'
import MobileCraousel  from './Components/MobileCraousel'

const App = () => {
  let token = Cookies.get("authToken")
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<BeforeLoginHome />} />
          <Route exact path='/contactUs' element={<ContactUs />} />
          <Route exact path='/KnowMore' element={<KnowMore />} />
          <Route exact path='/Whycan' element={<WhyCan />} />
          <Route exact path='choosetitle' element={<ChooseTitle />} />
          <Route exact path='phonenumber' element={<PhoneNumber />} />
          <Route exact path='register' element={<Register />} />
          <Route exact path='registerimage' element={<RegisterImage />} />
          <Route exact path='loginotp' element={<LoginOTP />} />
          <Route exact path='password' element={<Password />} />
          <Route exact path='home' element={<Home />} />
          <Route exact path='test' element={<Test />} />
          <Route exact path='createpost' element={<CreatePost />} />
          <Route exact path='chatpage' element={<ChatPage />} />
          <Route exact path='meeting' element={<Meeting />} />
          <Route exact path='profile' element={<Profile />} />
          <Route exact path='LoginForm' element={<LoginForm />} />
          <Route exact path='OldUserLogin' element={<OldUserLogin />} />
          <Route exact path='OldUserLoginTitle' element={<OldUserLoginTitle />} />
          <Route exact path='OldUserRegister' element={<OldUserRegister />} />
          <Route exact path='OldUserOTP' element={<OldUserOTP />} />
          <Route exact path='OldUserSuccessfully' element={<OldUserSuccessfully />} />
          <Route exact path='OldUserPass' element={<OldUserPass />} />
          <Route exact path='HealthRecord' element={<HealthRecord />} />
          <Route exact path='HealthRecord1' element={<HealthRecord1 />} />
          <Route exact path='HealthCard' element={<HealthCard />} />     
          <Route exact path='HealthCard1' element={<HealthCard1 />} />
          <Route exact path='Appointment' element={<Appointment />} />
          <Route exact path='Appointment1' element={<Appointment1 />} />
          <Route exact path='Medicine' element={<Medicine />} />
          <Route exact path='Medicine1' element={<Medicine1 />} />
          <Route exact path='MultiPIN' element={<MultiPIN />} />
          <Route exact path='ShowProfile' element={<ShowProfile />} />
          <Route exact path='ForgotPassword' element={<ForgotPassword />} />
          <Route exact path='OtpVerify' element={<OtpVerify />} />
          <Route exact path='ResetPassword' element={<ResetPassword />} />
          <Route exact path='ResetPasswordSuccessfully' element={<ResetPasswordSuccessfully />} />
          <Route exact path='Subscription_Models' element={<SubscriptionModels />} />
          <Route exact path='Subscription_Payment_Method' element={<Subscription_Payment_Method />} />
          <Route exact path='MeetingActive' element={<MeetingActive />}></Route>
          <Route exact path='HelpAFriend' element={<HelpAFriend />}></Route>
          <Route exact path='HelpFeedback' element={<HelpFeedback />}></Route>
          <Route exact path='Settings' element={<Settings />}></Route>
          <Route exact path='ProfileLock' element={<ProfileLock />}></Route>
          <Route exact path='AddProfile' element={<AddProfile />} />
          <Route exact path='loginchoosetitle' element={<LoginChooseTitle />} />
          <Route exact path='logindetails' element={<LoginDetails />} />
          <Route exact path='loginimage' element={<LoginImage />} />
          <Route exact path='SetPin' element={<SetPin />} />
          <Route exact path='SetPassword' element={<SetPassword />} />
          <Route exact path='BlockedAccounts' element={<BlockedAccounts />} />
          <Route exact path='Notification' element={<Notification />} />
          <Route exact path='HealthCard2' element={<HealthCard2 />} />
          <Route exact path='MeetingActive' element={<MeetingActive />} />
          <Route exact path='TermCondition' element={<TermsConditions />} />
          <Route exact path='PrivatePolicy' element={<PrivacyPolicy />} />
          <Route exact path='loginprofile' element={<ProfileSuccessAdd />} />
          <Route exact path='splitButton' element={<SplitButton />} />
          <Route exact path='SelectLabels' element={<SelectLabels />} />
          <Route exact path='UserProfile' element={<UserProfile />} />
          <Route exact path='NewUserTitle' element={<NewUserTitle />} />
          <Route exact path='NewUserImage' element={<NewUserImage />} />
          <Route exact path='NewUserDetails' element={<NewUserDetails />} />
          <Route exact path='NewUserPIN' element={<NewUserPin />} />
          <Route exact path='NewAddedProfile' element={<NewAddedProfile />} />
          <Route exact path='AdminLogin' element={<AdminLogin />} />
          <Route exact path='AdminContent' element={<AdminContent />} />
          <Route exact path='AdminUserManagement' element={<AdminUserManagement />} />
          <Route expact path='Animate' element={<Animate/>}/>
          <Route expact path='SlideBox' element={<SlideBox/>}/>
          <Route expact path='TabPanel' element={<TabPanel/>}/>
          <Route expact path='ProfileUser' element={<ProfileUser/>}/>
          <Route expact path='mystory' element={<Mystory/>}/>
          <Route expact path='MeetingProfile' element={<MeetingProfile/>}/>
          <Route expact path='Saved' element={<Saved/>}/>
          <Route expact path='Carousel' element={<Carousel/>}/>
          <Route expact path='LoginCraousel' element={<LoginCraousel/>}/>
          <Route expact path='HealthProfile' element={<HealthProfile/>}/>
          <Route expact path='MedicineBank' element={<MedicineBank/>}/>
          <Route expact path='MobileCraousel' element={<MobileCraousel/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;