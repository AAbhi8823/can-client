import Cookies from "js-cookie";
export const baseurl = "https://t7hdgfzje2.ap-south-1.awsapprunner.com/api/v1";
// export const base_token = Cookies.get("token");
// export const base_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZTk1ZTYxZGVkMTJmNDBiNmU3MzYxNyIsIkNBTklEIjoiQ0FONDAyMyIsInBob25lX251bWJlciI6Ijk4NzE5NDgxNzQiLCJ1c2VyX3Byb2ZpbGUiOiJGaWdodGVyIn0sImlhdCI6MTcxMDA1MTg0MywiZXhwIjoxNzEwMTM4MjQzfQ.kunZze_3drhzBGvESTuU-tlNCl9hJc34MdwDGK4kkHE'
export const base_token=Cookies.get("token");

console.log("ankurfjkwrbfjrgyfergyfreuy",base_token);
const apis = {

    // users
    GET_SINGLE_USER:`${baseurl}/api/singleuser`,
    SEARCH_USER:`${baseurl}/api/user-search`,


    CREATE_APPOINTMENT: `${baseurl}/api/createappointment`,
    GET_APPOINTMENT: `${baseurl}/api/allfetch_appointment_specificUser`,
    SINGEL_FETCH_APPOINTMENT: `${baseurl}/api/siglefetch_appointment`,
    UPDATE_APPOINTMENT: `${baseurl}/api/update_appointment_specificUser`,
    CREATE_MEDICINE: `${baseurl}/api/medicines`,
    GET_MEDICINE: `${baseurl}/api/medicines`,
    UPDATE_MEDICINE: `${baseurl}/api/medicines`,
    DELETE_MEDICINE: `${baseurl}/api/medicine/delete`,

    // CHAT APIS
    GET_ACCPECT_FRIEND_LIST: `${baseurl}/api/fetchFriendList`,
    GET_PENDING_FRIEND_LIST: `${baseurl}/api/fetchpendingFriendList`,
    GET_GROUP_LIST: `${baseurl}/api/fetchGroupList`,
    GET_SINGLE_GROUP_LIST: `${baseurl}/api/fetch-single-GroupList`,



    //CHAT MESSAGES APIS
    CREATE_MESSAGE: `${baseurl}/api/messageCreate`,
    FETCH_ALL_MESSAGES: `${baseurl}/api/fetchAllmessages`,
    DELETE_MESSAGE:`${baseurl}/api/deletemessage`,
    ACCEPECT_FRIEND_REQUEST:`${baseurl}/api/accpectFriendRequest`,
    REJECT_FRIEND_REQUEST:`${baseurl}/api/rejectFriendRequest`,
    MESSAGE_SEEN:`${baseurl}/api/messageSeen`,
    SEND_FRIEND_REQUEST:`${baseurl}/api/sendFriendRequest`,

}
export default apis