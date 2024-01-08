export const baseurl = "https://can.colourfuldreamevents.in";
// export const baseurl = "http://127.0.0.1:5000";



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