import Cookies from "js-cookie";
// export const baseurl = "https://t7hdgfzje2.ap-south-1.awsapprunner.com/api/v1";
export const baseurl='http://35.154.186.54/api/v1'
export const base_token=Cookies.get("token");

console.log("ankurfjkwrbfjrgyfergyfreuy",base_token);
const apis = {

    // users
    GET_SINGLE_USER:`${baseurl}/user/get-user-profile`,
    SEARCH_USER:`${baseurl}/api/user-search`,
    CREATE_APPOINTMENT: `${baseurl}/appointment/add-appointment`,
    GET_APPOINTMENT: `${baseurl}/appointment/get-appointment-by-date`,
    SINGEL_FETCH_APPOINTMENT: `${baseurl}/appointment/get-appointment-by-date`,
    UPDATE_APPOINTMENT: `${baseurl}/api/appointment/update-appointment`,
    CREATE_MEDICINE: `${baseurl}/medicine/add-medicine`,
    GET_MEDICINE: `${baseurl}/medicine/get-medicine-by-date`,
    UPDATE_MEDICINE: `${baseurl}/api/medicines`,
    DELETE_MEDICINE: `${baseurl}/api/medicine/delete`,
    REMOVE_APPOINTMENTS: `${baseurl}/appointment/delete-appointment`,
    GET_PERSONAL_POST:`${baseurl}/mystory/get-my-story-list`,
    GET_POST_COMMENT:`${baseurl}/comments/add-comment`,

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