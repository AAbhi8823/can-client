import React, { useEffect, useRef, useState } from "react";
import HomeNav from "../Components/HomeNav";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoIosInformationCircleOutline, IoIosInformationCircle, } from "react-icons/io";
import { BsTelephone, BsCheck2All, BsCheck2, BsThreeDotsVertical, BsChat } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { AiOutlineSend } from "react-icons/ai";
import { GrMicrophone } from "react-icons/gr";
import commentIcon from '../Photos/commentIcon.png'
import account from "../Photos/account.jpg";
import account2 from "../Photos/account2.jpg";
import SideMenu from "../Components/SideMenu";
import Page from "../Layouts/Pages";
import sendIcon from '../Photos/sendIcon.png'
import micIcon from '../Photos/micIcon.png'
// import smileIcon from '../Photos/smileFace.svg'
import downloadIcon from '../Photos/downloadIcon.svg'
import crossIcon from '../Photos/crossIcon.svg'
import leftarrowIcon from '../Photos/leftarrowIcon.svg'
import rightarrowIcon from '../Photos/rightarrowIcon.svg'
import climbeverst from '../Photos/climberEverest.webp'
import c3 from '../Photos/c3.png'
import c4 from '../Photos/c4.png'
import blockuser from '../Photos/blockuser.png'
import { IoMdClose } from 'react-icons/io'
import removIcon from '../Photos/removeIcon.svg'
import axios from "axios";
import apis from "../Api/baseUrl";
import Cookies from "js-cookie";
import moment from "moment"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiFont } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";


const ChatPage = () => {
  const [chats, setChats] = useState("chat");
  const [isHidden, setIsHidden] = useState(true);
  const toggleSecondDiv = () => {
    setIsHidden(!isHidden);
  };
  
   

  
  const toggleReq = () => {
    if (chats = "chat") {
      setChats("request");
    } else {
      setChats("chat");
    }
    getall_pending_friend_list()
  };

  //chats
  const [text, setText] = useState("");
  const { socket } = useSelector(state => state.socket)
  const [imageResult, setImageResult] = useState([])
  const [incoming, setIncoming] = useState([])
  const [Info, setInfo] = useState("")
  const [viewAll, setViewAll] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [muteShow, setMute] = useState(false)
  const [toggleStates, setToggleStates] = useState(false);
  const threeDotsOutClick = useRef(null);
  const [ViewUsers, setViewUser] = useState(false)
  const ViewUserOutClick = useRef(null)
  const [Reportuser, setReportUser] = useState(false)
  const [blockUser, setBlockUser] = useState(false)
  const [userblocked, setUserBlocked] = useState(false)
  const [removeUserPop, setRemoveUserPop] = useState(false)
  const [messagePopUp, setMessagePopUp] = useState(null)
  const messgOutsClick = useRef(null)
  const [deleteMsg, setDeleteMsg] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [sendImage, setSendImage] = useState(null)
  const [result, setResult] = useState([]);
  const [imageshowPopup, setImageShowPopup] = useState(null);

  const senderId = localStorage.getItem("active_user")
  const [reciever_id, setreciever_id] = useState("")
  const [friendsAndConversationId, setfriendsAndConversationId] = useState("")
  const [textmessage, settextmessage] = useState("")
  const [file, setfile] = useState("")
  const [event, setevent] = useState()

  const toggleImageShowPopUp = () => {
    setImageShowPopup(null)
  }

  const toogleDeleteMsgPopUp = () => {
    setDeleteMsg(!deleteMsg)
  }
  const [msg_index, setmsg_index] = useState("")
  const toggleMessagePopUp = (index) => {
    setMessagePopUp(index === messagePopUp ? null : index)
  }

  const handelMessOutsClick = (event) => {
    if (ViewUserOutClick.current && !ViewUserOutClick.current.contains(event.target)) {
      setMessagePopUp(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handelMessOutsClick, true)
    return () => {
      document.removeEventListener('click', handelMessOutsClick, true)
    }
  })


  const toggleRemovePopUp = () => {
    setRemoveUserPop(!removeUserPop)
  }

  const toggleBlockTab = () => {
    setUserBlocked(!userblocked)
  }

  const handleBlockUser = () => {
    setBlockUser(!blockUser)
  }

  const handleReportuser = () => {
    setReportUser(!Reportuser)
  }

  const handleViewUserSettings = () => {
    setViewUser(!ViewUsers)
  }

  const handleClickOutisideViewUser = (event) => {
    if (ViewUserOutClick.current && !ViewUserOutClick.current.contains(event.target)) {
      setViewUser(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutisideViewUser, true)
    return () => {
      document.removeEventListener('click', handleClickOutisideViewUser, true)
    }
  }, [])

  const handleClickOutsidethreeDots = (event) => {
    if (threeDotsOutClick.current && !threeDotsOutClick.current.contains(event.target)) {
      setMute(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsidethreeDots, true);
    return () => {
      document.removeEventListener('click', handleClickOutsidethreeDots, true);
    };
  }, []);


  const toggleButton = () => {
    setToggleStates(!toggleStates)
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? groupMedia.length - 1 : prevIndex - 1
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === groupMedia.length - 1 ? 0 : prevIndex + 1
    )
  }


  const handleViewClick = () => {
    setViewAll(!viewAll)
  }

  const handleMuteClick = () => {
    setMute(!muteShow)
  }

  const handleClick = () => {
    if (Info) {

      return setInfo("");
    }
    getsingle_group_details()
    getCurentUser()
    setInfo("open");
  }

  const inputTaken = (event) => {
    setText(event.target.value);
    settextmessage(event.target.value);
  };

  const HandleImageSend = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setfile(file)
    setSendImage(URL.createObjectURL(file))
    setImageShowPopup(URL.createObjectURL(file))

  }
  const listOfImage = () => {
    setImageResult((oldImage) => {
      return [...oldImage, sendImage]
    });
    console.log(imageResult)
    setSendImage('')
    setImageShowPopup(null)

  }

  const listOfItems = () => {
    setResult((oldItems) => {
      return [...oldItems, text];
    });
    setText("");

  };

  const getCurrentTime_iso_format = () => {
    const currentDate = new Date();

    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getUTCDate()).padStart(2, '0');
    const hours = String(currentDate.getUTCHours()).padStart(2, '0');
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

    return formattedDate
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const momentjs = (inputDate) => {
    const currentDate = moment(); // Get the current date and time

    // Parse the input date and calculate the difference in days
    const inputMoment = moment(inputDate);
    const daysAgo = currentDate.diff(inputMoment, 'days');

    // Format the date in the desired format
    const formattedDate = inputMoment.format('h:mm A'); // Format as '9:44 PM'

    // Construct the final output
    let output;
    if (daysAgo === 0) {
      return output = formattedDate; // Today
    } else if (daysAgo === 1) {
      return output = `${formattedDate} 1 day ago`; // Yesterday
    } else {
      return output = `${formattedDate} ${daysAgo} days ago`; // More than 1 day ago
    }
  }


  const DeleteMessages = () => {
    const NewMessages = [...result];
    NewMessages.splice(messageToDelete, 1)
    setResult(NewMessages)

    setDeleteMsg(false)
    setMessageToDelete(null)

  }

  const DeleteImages = () => {
    const newImages = [...imageResult];
    newImages.splice(sendImage, 1)
    setImageResult(newImages)

    setDeleteMsg(false)
    setSendImage(null)

  }
  let token = Cookies.get("token")
  let userid = localStorage.getItem("active_user")
  const [pending_friend_list, setpending_friend_list] = useState([])
  const [accpect_friend_list, setaccpect_friend_list] = useState([])
  const [group_list, setgroup_list] = useState([])
  const [chatgroup_id, setchatgroup_id] = useState("")
  const [currentChatName, setcurrentChatName] = useState("")
  const [isonline, setisonline] = useState("")
  const [last_seen, setlast_seen] = useState("")
  const [currentChatImage, setcurrentChatImage] = useState("")
  const [group_details, setgroup_details] = useState({})
  const [currentUser, setcurrentUser] = useState({})

  const [msg_type, setmsg_type] = useState("")
  const [message_id, setmessage_id] = useState("")
  const [totfriend_req, settotfriend_req] = useState("")


  // fetch pending friend list
  const getall_pending_friend_list = async (user_id) => {
    try {
      const { data } = await axios.post(`${apis.GET_PENDING_FRIEND_LIST}?token=${token}`, {
        userid: user_id ? user_id : userid
      })


      if (data.status == true) {
        setpending_friend_list(data?.data)
        settotfriend_req(data?.data?.length)
      } else {
        setpending_friend_list([])
        settotfriend_req("")
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }

  // fetch group list

  const getall_group_friend_list = async () => {
    try {
      const { data } = await axios.post(`${apis.GET_GROUP_LIST}?token=${token}`, {
        userid: userid
      })
      if (data.status == true) {
        setgroup_list(data?.data)
      } else {
        setgroup_list([])
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }


  // fetch single group list details
  const [groupMedia, setgroupMedia] = useState([])
  const getsingle_group_details = async () => {
    try {
      const { data } = await axios.post(`${apis.GET_SINGLE_GROUP_LIST}?token=${token}`, {
        group_id: chatgroup_id, userid: homeUser
      })
      if (data.status == true) {
        setgroup_details(data?.data)
        setgroupMedia(data.media)
      } else {
        setgroup_details({})
        setgroupMedia([])
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }

  const [search, setsearch] = useState("")

  // fetch accpect friend list
  const getall_accpect_friend_list = async () => {
    try {
      const { data } = await axios.post(`${apis.GET_ACCPECT_FRIEND_LIST}?token=${token}`, {
        userid: userid,
        search: search
      })
      if (data.status == true) {
        setaccpect_friend_list(data?.data)
        let totalCount = 0;
        for (let i = 0; i < data?.data.length; i++) {
          totalCount += data?.data[i].seenmessage;
        }
        settotunseenmsg(totalCount)
      } else {
        setaccpect_friend_list([])
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }


  const send_message = async () => {
    try {
      let fileurl = []
      if (file) {
        URL.createObjectURL(file)
        fileurl.push(URL.createObjectURL(file))
      }
      let time = getCurrentTime_iso_format()


      const formdata = new FormData()
      formdata.set("chatFiles", file)
      formdata.set("friendsAndConversationId", friendsAndConversationId)
      formdata.set("chatType", chat_type)
      formdata.set("chatGroupId", chatgroup_id)
      formdata.set("sender_id", senderId)
      formdata.set("reciever_id", reciever_id)
      formdata.set("textmessage", textmessage)
      const { data } = await axios.post(`${apis.CREATE_MESSAGE}?token=${token}`, formdata)
      if (data.status == true) {

        setmessages((prev) => [...prev, { data: { _id: data.data._id, message: { file: fileurl, textmessage: textmessage }, createdAt: time, sender_id: { profile_photo: currentUser.profile_photo }, }, me: true }])

        getall_accpect_friend_list()


        settextmessage("")
        let msg = {
          message_id: data.data._id,
          reciver_id: reciever_id,
          chatgroup_id: chatgroup_id,
          friendsAndConversationId: friendsAndConversationId,
          sender_id: data.data.sender_id,
          message: { textmessage, file: data?.data?.message?.file },
          createdAt: data?.data?.createdAt,
          profile_photo: currentUser?.profile_photo

        }
        socket?.emit("send-msg", msg)
        setfile("")

      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }
  const [chat_type, setchat_type] = useState("")
  const [messages, setmessages] = useState([])
  const [totunseenmsg, settotunseenmsg] = useState("")
  const fetch_all_message = async (conversationid, type, group_id) => {
    try {
      const { data } = await axios.post(`${apis.FETCH_ALL_MESSAGES}?token=${token}`, {
        friendsAndConversationId: conversationid ? conversationid : friendsAndConversationId, chatType: type ? type : chat_type, userid: senderId, chatGroupId: group_id ? group_id : chatgroup_id
      })
      if (data.status == true) {
        getall_accpect_friend_list()
        setmessages(data?.data)
        socket.emit("seen-msg", { reciver_id: reciever_id })
      } else {
        setmessages([])
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }


  const delete_message = async (delete_type) => {
    try {
      const { data } = await axios.delete(`${apis.DELETE_MESSAGE}?token=${token}&messageid=${message_id}&msgdeletetype=${msg_type}&fileindex=${msg_index}&softdelete=${delete_type}`)
      if (data.status == true) {
        let obj = {
          reciver_id: reciever_id,
          sender_id: homeUser,
          chatgroup_id: chatgroup_id,
          friendsAndConversationId
        }
        fetch_all_message()
        setMessagePopUp(null)
        setDeleteMsg(false)
        if (delete_type == false) {
          socket.emit("delete-msg", obj)
        }

      } else {

      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }



  const friend_request_accpect = async (friend_id) => {
    try {
      const { data } = await axios.post(`${apis.ACCEPECT_FRIEND_REQUEST}?token=${token}`, {
        sender_Id: senderId, friend_id
      })
      if (data.status == true) {
        getall_pending_friend_list()
        socket.emit("accpect-friend-request",{reciver_id:friend_id,sender_id:senderId})
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }

  const friend_request_reject = async (friend_id) => {
    try {
      const { data } = await axios.post(`${apis.REJECT_FRIEND_REQUEST}?token=${token}`, {
        sender_Id: senderId, friend_id
      })
      if (data.status == true) {
        getall_pending_friend_list()
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }

  const seen_message = async (friendsAndConversationId) => {
    try {
      const { data } = await axios.post(`${apis.MESSAGE_SEEN}?token=${token}`, {
        friendsAndConversationId
      })
      if (data.status == true) {
        getall_pending_friend_list()
      }
      console.log("chat_friend", data)
    } catch (err) {
      console.log(err);
    }
  }


  const homeUser = localStorage.getItem('active_user')
  const getCurentUser = async () => {

    // try {
    //   const userData = await axios.post(`${apis?.GET_SINGLE_USER}?token=${token}`, {
    //     id: `${homeUser}`
    //   })
    //   if (userData.data.status == true) {
    //     setcurrentUser(userData?.data?.data)
    //   } else {
    //     setcurrentUser({})
    //   }

    // } catch (error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    getall_accpect_friend_list()
    getall_pending_friend_list()
    getall_group_friend_list()
  }, [search])

  const activeClasses = (et) => {
    // const et = e.target
    let active = document.querySelector(".active");
    if (active) {
      active.classList.remove("active");
    }
    et.classList.add("active");
  }

  useEffect(() => {
    if (token && homeUser) {
      getCurentUser()
    }
  }, [token, homeUser])


  useEffect(() => {
    if (friendsAndConversationId || setchatgroup_id) {
      fetch_all_message()
    }
  }, [friendsAndConversationId, chatgroup_id])
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (socket) {

      console.log(socket)

      // receive-message event 

      socket?.on("recive-msg", (data) => {
        console.log(data, reciever_id == data?.sender_id, data?.sender_id, reciever_id, friendsAndConversationId, currentChatName)

        let msg = {
          _id: data.message_id,
          reciver_id: reciever_id,
          chatgroup_id: chatgroup_id,
          sender_id: { profile_photo: data.profile_photo, _id: data?.sender_id },
          message: { textmessage: data.message.textmessage, file: data?.message?.file },
          createdAt: data?.data?.createdAt,
        }

        console.log(msg)

        // if(reciever_id==data?.sender_id){
        let frind = document.getElementById(data?.sender_id)
        console.log(frind)

        if (!data.chatgroup_id && frind?.classList[4] === "active") {
          console.log("friend")
          seen_message(data.friendsAndConversationId)
          socket.emit("seen-msg", { reciver_id: data?.sender_id, friendsAndConversationId: data.friendsAndConversationId, type: "personal" })
          let id = data.friendsAndConversationId
          fetch_all_message(id, "personal")
          setmessages((prve) => [...prve, { data: msg, me: false }])
        }

        let chat_group = document.getElementById(data?.chatgroup_id)
        console.log(chat_group?.classList)
        if (chat_group?.classList[4] === "active") {
          console.log("chat group")
          socket.emit("seen-msg", { reciver_id: data?.sender_id, chatgroup_id: data.chatgroup_id, type: "group" })
          // fetch_all_message(null, "group", group_id)
          setmessages((prve) => [...prve, { data: msg, me: false }])
        }
        getall_accpect_friend_list()
        // }
      })
      // receive-delete-message event 
      socket.on("recive-delete-msg", (data) => {
        let frind = document.getElementById(data?.sender_id)
        console.log(frind?.classList)
        console.log(data)

        if (!data.chatgroup_id && frind?.classList[4] === "active") {
          console.log("delete-msg  friend")
          let id = data?.friendsAndConversationId
          fetch_all_message(id, "personal")
        }

        let chat_group = document.getElementById(data?.chatgroup_id)
        console.log(chat_group?.classList)
        if (chat_group?.classList[4] === "active") {
          console.log("chat group")
          console.log("friend")
          let group_id = data.chatgroup_id
          fetch_all_message(null, "group", group_id)
        }

      })

      socket.on("onlineuser", (data) => {
        getall_accpect_friend_list()
      })

      socket.on("seen-msg-recev", (data) => {
        const { reciver_id, friendsAndConversationId, type, chatgroup_id } = data
        fetch_all_message(friendsAndConversationId, type, chatgroup_id)
      })

      socket.on("recive-friend-request", (data) => {
        let userid = data.reciver_id
        getall_pending_friend_list(userid)
      })

      socket.on("recive-accpect-friend-request", (data) => {
        let userid = data.reciver_id
        getall_pending_friend_list(userid)
        getall_accpect_friend_list()

      })

    }
    return () => {
      socket && socket?.off("recive-msg", (data) => {
        console.log(data, reciever_id == data?.sender_id, data?.sender_id, reciever_id, friendsAndConversationId, currentChatName)

        let msg = {
          reciver_id: reciever_id,
          chatgroup_id: chatgroup_id,
          sender_id: { profile_photo: data.profile_photo },
          message: { textmessage: data.message.textmessage, file: data?.message?.file },
          createdAt: data?.data?.createdAt,
        }

        console.log(msg)

        // if(reciever_id==data?.sender_id){
        let frind = document.getElementById(data?.sender_id)
        console.log(frind?.classList)

        if (frind?.classList[4] === "active") {
          console.log("friend")

          setmessages((prve) => [...prve, { data: msg, me: false }])
        }

        let chat_group = document.getElementById(data?.chatgroup_id)
        console.log(chat_group?.classList)
        if (chat_group?.classList[4] === "active") {
          console.log("chat group")
          setmessages((prve) => [...prve, { data, me: false }])
        }

        // }
      })

      socket && socket?.off("recive-delete-msg", (data) => {
        let frind = document.getElementById(data?.sender_id)
        console.log(frind?.classList)
        console.log(data)

        if (!data.chatgroup_id && frind?.classList[4] === "active") {
          console.log("friend")

          fetch_all_message()
        }

        let chat_group = document.getElementById(data?.chatgroup_id)
        console.log(chat_group?.classList)
        if (chat_group?.classList[4] === "active") {
          console.log("chat group")
          console.log("friend")
          fetch_all_message()
        }

      })

      socket && socket.off("onlineuser", (data) => {
        getall_accpect_friend_list()
      })

      socket && socket.off("seen-msg-recev", (data) => {
        fetch_all_message()
      })

      socket && socket.off("seen-msg-recev", (data) => {
        const { reciver_id, friendsAndConversationId, type, chatgroup_id } = data
        fetch_all_message(friendsAndConversationId, type, chatgroup_id)
      })

      socket && socket.off("recive-friend-request", (data) => {
        let userid = data.reciver_id
        getall_pending_friend_list(userid)
      })

      socket && socket.off("recive-accpect-friend-request", (data) => {
        let userid = data.reciver_id
        getall_pending_friend_list(userid)
        getall_accpect_friend_list()

      })

    }
  }, [socket])
  const scroolbotom = useRef()
  useEffect(() => {
    scroolbotom.current?.scrollTo(0, scroolbotom.current?.scrollHeight)
  }, [messages])


  const viewAllImmages = [
    {
      id: 1,
      image: climbeverst
    },
    {
      id: 2,
      image: c3
    },
    {
      id: 3,
      image: c4
    },

  ]


  return (
    <Page
      pageContent={
        <>
          {/* background */}
         
          <div className="bg-[#FEF8FD] h-full flex px-4 lg:px-16 py-10  ">
            {/* chat space */}
            
            <div className="  w-full relative   ">
            <FaArrowLeft className={`block lg:hidden ${isHidden ? ' hidden' : 'block '}`} onClick={toggleSecondDiv} />
              <div className="  bg-white  rounded-3xl  shadow-2xl">
                <div className="flex flex-wrap h-full w-full">
                  {/* left bar */}
                  <div className={`pt-4 px-4 lg:block   w-[100%] lg:w-[30%] border-r-2 z-10 ${isHidden ? ' block' : 'hidden z-10'}`} >
                    <div className="flex items-center gap-2 mt-3 p-2 bg-white rounded-3xl" style={{ boxShadow: "0px 10px 30px 0px #0000000D" }}>
                      <FiSearch color="black" />
                      <input placeholder="Search" onChange={(e) => {
                        setsearch(e.target.value)
                      }} className="outline-none overflow-hidden" />
                    </div>

                    <h2 className="mt-5 font-semibold">Group's</h2>

                    {/* persons */}
                    {/* <div className="flex  overflow-x-scroll pt-2">
                      {Groups.map((item) => (
                        <div key={item.id} className=" mx-6 flex flex-col items-center">
                          <img src={item.image} className="rounded-full" />
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs">{item.groupName}</p>
                        </div>
                      ))}  
                    </div> */}
                    <div className="flex overflow-x-scroll py-4 w-full scrl-1 mb-3" >
                      <div className="flex" style={{ width: "fit-content" }}>
                        {group_list && group_list.map((item) => (
                          <div style={{ cursor: "pointer" }} key={item._id} id={item._id} className="w-24  flex flex-col items-center" onClick={(e) => {
                            setchatgroup_id(item._id)
                            setfriendsAndConversationId("")
                            setevent(e)
                            let et = document.getElementById(item._id)
                            activeClasses(et)
                            setchat_type("group")
                            setcurrentChatImage(item?.groupImage)
                            setcurrentChatName(item.groupName)
                          }}>
                            <div className="w-14 h-14 border-red-600 border-2 rounded-full flex items-center justify-center" id={item._id} >
                              <img
                                src={item?.groupImage}
                                alt={item.groupName} // Added alt attribute for accessibility
                                className="w-9 h-9 rounded-full object-cover" // Adjust size of the image
                              />
                            </div>

                            <p className="font-semibold text-[14px]">{item?.createdBy?.name}</p>
                            <p className=" text-[12px]">{item?.groupName}</p>

                          </div>

                        ))}
                      </div>
                    </div>

                    {/* chats */}
                    <div className=" flex pt-3   relative">
                      <div
                        className={
                          chats == "chat"
                            ? "font-bold border-b-2 w-1/4 flex items-center justify-center transform-all ease-in-out duration-500 border-[#8B1539] text-[#8B1539] cursor-pointer"
                            : "font-bold border-b-2 w-1/4 flex items-center justify-center border-[#C4C4C4] text-[#C4C4C4] cursor-pointer"
                        }
                        onClick={(e) => {
                          getall_accpect_friend_list()
                          setChats("chat")
                        }}
                      >
                        <h2 className="font-18 mb-2">Chat</h2>
                        {totunseenmsg === 0 ? "" :
                          totunseenmsg}

                      </div>
                      <div
                        className={
                          chats == "request"
                            ? "font-bold border-b-2 w-1/2 flex vcvc items-center justify-center transform-all ease-in-out duration-500 border-[#8B1539] text-[#8B1539] cursor-pointer"
                            : "font-bold border-b-2 w-1/2 flex vcvc items-center justify-center border-[#C4C4C4] text-[#C4C4C4] cursor-pointer"
                        }
                        onClick={() => {
                          getall_pending_friend_list()
                          setChats("request")

                        }}
                      >
                        <h2 className="font-18 mb-2">Requests</h2>
                        {totfriend_req === 0 ? "" :
                        totfriend_req
                          }


                      </div>
                    </div>

                    {/* Requests */}

                    {chats == "chat" && (
                      <div className="flex flex-col mt-2 gap-6 h-[320px] scrl    overflow-y-scroll " style={{}}>

                        {accpect_friend_list && accpect_friend_list.map((item, i) => (
                          <div style={{ cursor: "pointer" }} id={item.friend._id} className="flex flex-row items-center gap-5" key={i} name={i} onClick={(e) => {
                            setreciever_id(item.friend._id)
                            setevent(e)
                            let et = document.getElementById(item.friend._id)
                            activeClasses(et)

                            setfriendsAndConversationId(item?._id)
                            setchat_type("personal")
                            setchatgroup_id("")
                            setlast_seen(item.friend?.last_seen)
                            setisonline(item?.friend?.is_online)
                            setcurrentChatImage(item?.friend?.profile_photo)
                            setcurrentChatName(item?.friend?.username)
                            toggleSecondDiv()
                          }}>
                            <div className="relative" id={item.friend._id}>
                              <img
                                src={item?.friend?.profile_photo} alt={item?.friend?.username}
                                className="w-9 h-9 rounded-full  "
                                id={item.friend._id}

                              />
                              {item?.seenmessage == 0 ? "" :
                                <span className=" absolute top-0 right-0 h-3 w-3 flex items-center justify-center rounded-full text-[10px] text-white  bg-[#C31A7F]">{item?.seenmessage}
                                </span>}

                              {item?.friend?.is_online == true ?
                                <div className=" absolute bottom-0 right-2 h-2 w-2 flex items-center justify-center rounded-full text-[10px] text-white  bg-[#11D800]"></div> : ""}
                            </div>

                            <div className="flex flex-row gap-3 justify-between">
                              <div className="flex flex-col" id={item.friend._id} >
                                <h1 className=" text-[14px] " id={item.friend._id}> {item?.friend?.username?.length > 12 ? item?.friend?.username?.slice(0, 12) + "..." : item?.friend?.username}</h1>
                                <p className=" text-[12px]  ">{item?.message}</p>
                              </div>
                              <p className="text-[10px] ml-1 ">{item.time}</p>
                            </div>
                            <BsCheck2All className="flex item-center justify-center" color="#C4C4C4" size={13} />
                          </div>
                        ))}


                      </div>
                    )}

                    {/* Requests */}

                    {chats == "request" && (

                      <div className="overflow-y-scroll h-[330px] scrl">
                        {pending_friend_list && pending_friend_list.map((item,index) => (
                          <div className="" key={index} >

                            <div className="flex flex-row gap-4 pt-4 items-center " key={item._id}>
                              <img
                                src={item?.sender_Id?.profile_photo} alt="none"
                                className="h-10 w-10 rounded-full"
                              />
                              <div>
                                <div className="flex flex-row item-center gap-3 justify-between">
                                  <div className="flex flex-col items-start     ">
                                    <h1 className="font-bold">{item?.sender_Id?.username?.length > 12 ? item?.sender_Id.username?.slice(0, 12) + "..." : item.sender_Id?.username}</h1>
                                    {/* <p className=" text-[12px] ">{item?.message}</p> */}
                                  </div>
                                  <p className="text-[10px] ml-5 text-center">{momentjs(item?.createdAt)}</p>
                                </div>


                              </div>
                            </div>
                            <div className="flex justify-evenly  pt-2 pl-7  items-center">
                              <div className="cursor-pointer rounded-3xl     text-[#C31A7F]" onClick={() => {
                                friend_request_reject(item?.sender_Id._id)
                              }}>
                                Reject
                              </div>
                              <div className="  cursor-pointer rounded-3xl text-[#efc419d4]" onClick={() => {
                                friend_request_accpect(item?.sender_Id._id)
                              }}>
                                Accept!
                              </div>
                              <div className="h-6 w-6 ml-5 bg-white flex items-center justify-center rounded-full   " style={{
                                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)'
                              }}>
                                {" "}
                                <AiOutlineEye />{" "}
                              </div>
                            </div>
                            <hr className="mt-4" />
                          </div>

                        ))}
                      </div>

                    )}
                  </div>

                  {/* right side */}
                  <div className={` w-full lg:w-[70%] ${isHidden ? 'hidden' : 'block z-20'}`}>


                    {/* main chat */}
                    <div className=" bg-[#F5F5F5] h-full relative overflow-hidden lg:rounded-r-3xl rounded-3xl flex flex-col justify-between  ">
                      <div className="flex bg-white">
                        <div className=" w-full flex px-6 items-center  ">
                      
                          <img src={currentChatImage} alt='userImage' className="rounded-full w-9 h-9" />
                          <div className="px-3 py-3">
                          <h2 className=" font-bold">{currentChatName}</h2>

                          <p>{isonline ? "online" : "offline"}</p>
                          <p>{momentjs(last_seen)}</p>

                          </div>
                         
                        </div>

                        <div className="flex gap-4 items-center mr-6">
                          <AiOutlineVideoCamera />
                          <BsTelephone />
                          <div onClick={() => {
                            handleClick()
                            // if(Info=="open"){
                            //   getsingle_group_details()
                            //   getCurentUser()
                            // }
                          }}>
                            {Info != "open" ? <IoIosInformationCircleOutline /> : <IoIosInformationCircle color="#C31A7F" />}
                          </div>
                        </div>
                      </div>


                      {/* <div className="left-[5%] bottom-[20%]  h-80 w-full overflow-y-scroll flex flex-col-reverse items-end">
                                {incoming.reverse().map((message, index) => {
                                  return (
                                    <div className="flex flex-row items-center gap-4" key={index}>
                                      <img src={account2} alt='incomingImage' />
                                      <p className="m-2 bg-white">
                                        {message}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div> */}


                      {/* outgoing message */}

                      <div ref={scroolbotom} className="pr-10 h-[50vh] w-full overflow-y-scroll flex flex-col  relative">
                        {messages && messages.map((itemValue, index) => {
                          if (itemValue) {

                            return (
                              <div className={`relative text-left flex ${itemValue.me == true ? "justify-end" : "justify-start"}  `} key={index} >

                                {itemValue?.data?.message?.textmessage ?
                                  <>
                                    <div className="ml-5 flex flex-row items-center">
                                      <img className="w-9 h-9 rounded-full " src={itemValue?.data?.sender_id?.profile_photo} alt='incomingImage' style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                      <p
                                        className="m-2 bg-[#86C6C5] p-2 w-max rounded-xl text-left text-white cursor-pointer"
                                        key={index}
                                        style={{ borderRadius: '10px 10px 0px 10px' }}
                                        onClick={() => {
                                          setmsg_type("text")
                                          setmessage_id(itemValue.data._id)
                                          if(itemValue.me == true){
                                            toggleMessagePopUp(index)
                                          }
                                        }}
                                      >
                                        {itemValue?.data?.message?.textmessage}
                                        <br />
                                        <p className="text-[10px]  flex flex-row items-center justify-end gap-4">
                                          {momentjs(itemValue?.data?.createdAt)}
                                          {itemValue.me == true ? itemValue?.data?.is_seen == "true" ?
                                            <BsCheck2All color="#C31A7F" size={13}
                                            /> :
                                            <BsCheck2 color="#C31A7F" size={13} /> : ""}
                                          {" "}
                                          {itemValue?.data?.sender_id?.username}
                                        </p>
                                        <div className="flex">
                                        {itemValue?.data?.is_seens_user && itemValue?.data?.is_seens_user?.map((img) => {
                                          return (
                                            <div className="ml-5 flex flex-row items-center">
                                              <img className="w-6 h-6 rounded-full " src={img.profile_photo} alt='incomingImage' style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                            </div>)
                                        })}
                                        </div>
                                      </p>
                                    </div>
                                  </>
                                  : ""}

                                {itemValue.data.message.file && itemValue.data.message.file.length > 0 ?
                                  itemValue.data.message.file.map((it,i) => {

                                    return (<>
                                      <div className="ml-5 flex flex-row items-center">
                                        <img className="w-9 h-9 rounded-full " src={itemValue?.data?.sender_id?.profile_photo} alt='incomingImage' />
                                        <div className="flex justify-center mt-2 cursor-pointer" >
                                          <img
                                            src={it}
                                            key={index}
                                            alt="suraj"
                                            style={{ maxWidth: "200px" }}
                                            onClick={() => {
                                              setmsg_type("file")
                                              setmsg_index(i)
                                              console.log("img click")
                                              setmessage_id(itemValue.data._id)
                                              if(itemValue.me == true){

                                                toggleMessagePopUp(index)
                                              }
                                            }} // Adjust the size as per your requirement
                                          />
                                          {/* {messagePopUp === index && (
                                            <div className="bg-white w-[100px] right-32 p-4 flex flex-col items-center justify-center gap-2 " ref={messgOutsClick}>
                                              <p className="text-[14px] cursor-pointer">Edit</p>
                                              <p className="text-[14px] cursor-pointer">Reply</p>
                                              <p className="text-[14px] cursor-pointer">Forward</p>
                                              <p className="text-[14px] cursor-pointer" onClick={toogleDeleteMsgPopUp}>Delete</p>
                                            </div>
                                          )} */}
                                        </div>
                                      </div>
                                      <div className="flex">
                                      {itemValue?.data?.is_seens_user && itemValue?.data?.is_seens_user?.map((img) => {
                                        return (
                                          <div className="ml-5 flex flex-row items-center">
                                            <img className="w-6 h-6 rounded-full " src={img.profile_photo} alt='incomingImage' style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                                          </div>)
                                      })}
                                      </div>
                                    </>)
                                  })

                                  : ""}

                                {messagePopUp === index && (
                                  <div className="bg-white w-[100px] right-32 p-4 flex flex-col items-center justify-center gap-2 " ref={messgOutsClick}>
                                    <p className="text-[14px] cursor-pointer">Edit</p>
                                    <p className="text-[14px] cursor-pointer">Reply</p>
                                    <p className="text-[14px] cursor-pointer">Forward</p>
                                    <p className="text-[14px] cursor-pointer" onClick={toogleDeleteMsgPopUp}>Delete</p>
                                  </div>
                                )}

                              </div>


                            )
                          }


                        })}
                        {/* {sendImage && (
                          <div className="flex justify-center mt-2">
                            <img
                              src={sendImage}
                              alt="Selected"
                              style={{ maxWidth: "200px" }}
                              onChange={HandleImageSend} // Adjust the size as per your requirement
                            />
                          </div>
                        )} */}

                        {/* {result.reverse().map((item, index) => {
                          if (item) {
                            return (
                              <div className="flex flex-col justify-center mt-2 " key={index}>
                                <img
                                  src={""}
                                  alt="suraj"
                                  style={{
                                    maxWidth: "100px",
                                    borderRadius: '20px 20px 0px 20px'
                                  }}
                                  className=""
                                  onClick={() => toggleMessagePopUp(index)}
                                // Adjust the size as per your requirement
                                />

                                <br />
                                <p>
                                  <p className="text-[10px]  flex flex-row items-center justify-end gap-4">
                                    {getCurrentTime()}
                                    <BsCheck2All BsCheck2,color="#C31A7F" size={13} />
                                  </p>
                                </p>
                                {messagePopUp === index && (
                                  <div className="bg-white w-[100px] right-32 p-4 flex flex-col items-center justify-center gap-2 " ref={messgOutsClick}>
                                    <p className="text-[14px] cursor-pointer">Edit</p>
                                    <p className="text-[14px] cursor-pointer">Reply</p>
                                    <p className="text-[14px] cursor-pointer">Forward</p>
                                    <p className="text-[14px] cursor-pointer" onClick={toogleDeleteMsgPopUp}>Delete</p>
                                  </div>
                                )}

                              </div>
                            )
                          }

                        })} */}


                      </div>

                    
                      <div className="flex flex-row   w-full mb-7">
                        <div className="bg-white w-full p-2 px-4 shadow-2xl rounded-2xl flex justify-between items-center mx-5">
                          <form className="w-[100%]" onSubmit={(e) => {
                            e.preventDefault()
                            listOfItems()
                            if (textmessage != "") {
                              send_message()
                            }
                          }}>
                            <input
                              placeholder="Type your message...."
                              className="w-[90%] outline-none"
                              onChange={inputTaken}
                              value={text}
                            />
                          </form>
                          {/* <ImAttachment color="#C4C4C4" /> */}
                          <label>
                            <input
                              type="file"
                              accept="image/*" // Specify the file types you want to allow
                              style={{ display: "none" }}
                              onChange={HandleImageSend}
                            />
                            <ImAttachment color="#C4C4C4" />
                          </label>
                        </div>



                        <div className="flex relative items-center justify-center mr-6 gap-3">
                          <div
                            onClick={() => {
                              console.log("test1")
                              listOfItems()
                              if (textmessage != "") {
                                console.log("test2")
                                send_message()
                              }
                            }}
                            className="bg-[#C31A7F] p-2 rounded-full shadow-gray-950 shadow-2xl"
                          >
                            {" "}
                            <AiOutlineSend size={20} color="white" />
                          </div>
                          <div className="bg-[#ffffff] p-2 rounded-full shadow-gray-950 shadow-2xl">
                            {" "}
                            <GrMicrophone size={20} />
                          </div>
                        </div>
                      </div>



                    </div>

                  </div>
                  {/* {Info && (
                    <div className="bg-white  text-center m-5 query-1 rounded-3xl w-[100%] lg:w-[450px] overflow-hidden px-4  relative" >
                      <img onClick={handleClick} className="w-8 cursor-pointer mt-[5%] one-1" src={crossIcon} alt="cross" />
                      <div className='absolute right-5'>
                        <BsThreeDotsVertical className="cursor-pointer" onClick={handleMuteClick} />
                      </div>

                      {muteShow && (
                        <div className="absolute top-10 right-2 w-[160px] p-4 bg-white flex flex-col  justify-start gap-4 " ref={threeDotsOutClick} style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }}>
                          <div className="flex flex-row item-center justify-between">
                            <p className="text-[14px] text-[#484848] ">Mute</p>
                            <div>
                              <div
                                className={`flex rounded-[30px] w-[45px] p-1 ${toggleStates ? ' bg-[#C31A7F] justify-end' : 'justify-start bg-[#E2E2E2]'
                                  }`}
                                style={{ boxShadow: '0px 15px 30px rgba(139, 21, 57, 0.10' }}
                                onClick={toggleButton}
                              >
                                <div className='bg-[#fff] text-white rounded-[100%] w-[20px] h-[20px]' ></div>
                              </div>

                            </div>

                          </div>
                          <hr />
                          <div className="flex flex-col gap-1">
                            <p className="text-[14px] text-[#484848] ">Select messages</p>
                            <p className="text-[14px] text-[#484848] ">Clear messages</p>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="flex flex-col items-center mt-5 gap-2 justify-center pt-7">
                          <img className="h-14 w-14 object-cover rounded-full " src={group_details?.groupImage} alt="none" />
                          <h1 className="text-[14px]  font-semibold">{group_details?.groupName}</h1>
                          <p className="text-[12px]  ">Group Members {group_details?.members?.length}</p>
                          <div className="flex flex-row gap-3">
                            <AiOutlineVideoCamera className="cursor-pointer" size={13} />
                            <BsTelephone className="cursor-pointer" size={13} />
                          </div>
                          <p className="text-[10px]  text-[#7E7E7E]">Group Create by {
                            moment(group_details?.createdAt).format("DD/MM/YYYY")} </p>
                          <div className="w-full h-24 flex flex-col gap-3  bg-white rounded-3xl"
                            style={{ boxShadow: '0px 10px 30px 0px rgba(139, 21, 57, 0.10)' }}>
                            <div className="flex flex-row px-5 pt-1 justify-between">
                              <p className="text-[10px] font-semibold ">Media Shared in the group</p>
                              <p onClick={handleViewClick} className="text-[10px]  underline text-[#4B65C2] cursor-pointer">View All</p>
                            </div>

                            {viewAll && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ">

                                <div className="bg-white w-25 p-4 rounded-[20px]  ">
                                  <div className="flex flex-row items-center justify-between px-4">
                                    <div className="flex flex-row items-center gap-2">
                                      <img className="w-10 h-10 rounded-full" src={account2} alt="accountimage" />
                                      <p className="text-[14px]  font-semibold">Shriniwasan’s Group</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                      <img className="w-8" src={downloadIcon} alt='download' />
                                      <img onClick={handleViewClick} className="w-8 cursor-pointer" src={crossIcon} alt="cross" />
                                    </div>
                                  </div>

                                  <div className="pt-5 ">
                                    {groupMedia.length ?
                                      <div className="flex flex-row items-center justify-between">
                                        <img
                                          className="cursor-pointer w-16"
                                          src={leftarrowIcon}
                                          alt="leftarrow"
                                          onClick={handlePrevImage}
                                        />

                                        <div className=" ">
                                          <img
                                            className="max-w-[300px] max-h-[300px] object-cover"
                                            src={groupMedia[currentImageIndex]}
                                            alt="slide"
                                          />
                                        </div>
                                        <img
                                          className="cursor-pointer w-16"
                                          src={rightarrowIcon}
                                          alt="rightarrow"
                                          onClick={handleNextImage}
                                        />
                                      </div>
                                      : "No Media Files"}

                                  </div>

                                  <div className="flex flex-row items-center justify-center gap-4 py-10">
                                    {groupMedia && groupMedia.map((item) => (
                                      <div key={item?.id} className="">
                                        <img className="max-w-[200px] max-h-[100px]" src={item} alt="media" />
                                      </div>
                                    ))}
                                  </div>


                                </div>

                              </div>
                            )}

                            <div className="flex flex-row items-center justify-evenly ">
                              <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                              <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                              <img className="h-12 w-9 object-cover rounded-full " src={account} alt="none" style={{ boxShadow: '0px 5px 15px 0px rgba(139, 21, 57, 0.50)' }} />
                            </div>

                          </div>
                        </div>
                        <h1 className="text-[22px] mt-5  font-semibold pl-3 pt-2">Group Members</h1>
                        <div className="pt-2">
                          <div className="flex flex-row gap-4 items-center ">
                            <div className="h-10 w-10 rounded-full border-2 border-red-500 flex items-center justify-center">
                              {currentUser &&
                                <img className="h-8 w-8 rounded-full object-cover " src={currentUser?.profile_photo} alt='none' />}
                            </div>
                            <p className="text-[10px]  font-semibold text-[#7E7E7E]">You</p>

                          </div>
                          <hr className="mt-2" />
                        </div>
                        <div className="h-[180px] overflow-y-scroll scrl-h pr-3 relative ">
                          {group_details?.members?.length && group_details?.members?.map((item) => (

                            <div className="" >
                              <div className="pt-2 flex flex-row justify-between items-center" key={item._id}>

                                <div className="flex flex-row gap-4 items-center ">
                                  <div className="h-10 w-10 rounded-full border-2 border-red-500 flex items-center justify-center">
                                    <img className="h-8 w-8 rounded-full object-cover " src={item.profile_photo} alt='none' />
                                  </div>
                                  <p className="text-[10px]  font-semibold text-[#7E7E7E]">{item.username}</p>

                                </div>
                                <div className="flex flex-row gap-1">
                                  <BsChat className="cursor-pointer" size={13} />
                                  <BsThreeDotsVertical className="cursor-pointer" size={13} onClick={handleViewUserSettings} />
                                </div>




                              </div>
                              <hr className="mt-2" />
                            </div>
                          ))}
                          {ViewUsers && (
                            <div className="absolute top-10 right-5 bg-white w-[100px] p-1" style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.10)' }} ref={ViewUserOutClick}>
                              <div className="flex flex-col items-center justify-center gap-3">
                                <p className=" text-[12px] text-[#7E7E7E] cursor-pointer ">View Profile</p>
                                <p className=" text-[12px] text-[#7E7E7E] cursor-pointer " onClick={handleReportuser}>Report</p>
                                <p className=" text-[12px] text-[#7E7E7E] cursor-pointer " onClick={handleBlockUser}>Block</p>
                                <p className="  text-[#C31A7F] text-[12px] cursor-pointer" onClick={toggleRemovePopUp}>Remove as friend</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center py-2 ">
                          <div className="bg-white flex items-center justify-center rounded-[20px] h-10 w-32" style={{ boxShadow: '0px 10px 30px 0px rgba(139, 21, 57, 0.10)' }}>
                            <div className="flex flex-row items-center justify-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M14.1 7.55953C13.79 3.95953 11.94 2.48953 7.89 2.48953H7.76C3.29 2.48953 1.5 4.27953 1.5 8.74953V15.2595C1.5 19.7295 3.29 21.5195 7.76 21.5195H7.89C11.91 21.5195 13.76 20.0695 14.09 16.5295M8 11.9995L19.38 11.9995M17.15 8.64953L20.5 11.9995L17.15 15.3495" stroke="#C31A7F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                              <p className="text-[12px]   text-[#C31A7F]">Leave Group</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}  */}
                </div>
              </div>
            </div>
          </div>
          {Reportuser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-[400px] bg-white p-4 flex flex-col gap-4 rounded-[20px]">
                <div className="flex flex-col gap-4">
                  <h1 className="text-[18px]    text-[#C31A7F] font-semibold">Report Ananya Nagpal</h1>
                  <p className="text-[14px]  text-[#7E7E7E]">The last 5 message from this user will be forwarded to CAN. This user will not be notified.</p>
                  <div className="flex flex-row items-center gap-2">
                    <input className="accent-[#C31A7F]" type="checkbox" />
                    <p className="text-[14px] text-[#7E7E7E] ">Block user and delete chat</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 justify-end">
                  <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={handleReportuser}>Cancel</button>
                  <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={handleReportuser}>Report</button>
                </div>
              </div>
            </div>
          )}

          {blockUser && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2' >
              <div className=' bg-[#FFFFFF] flex flex-col items-center py-10 gap-6 rounded-[30px] px-16 ' ref={ViewUserOutClick}>
                <div>
                  <img className='w-14' src={blockuser} alt='none' />
                </div>
                <div className='flex flex-col items-center gap-3'>
                  <h1 className='  text-[#C31A7F] text-[18px] font-semibold'>Block Sierra Ferguson</h1>
                  <p className='text-[14px] text-[#7E7E7E] font-semibold'>Do you really want to block this user</p>
                </div>
                <div className='flex flex-row items-center gap-5'>
                  <p className='w-20 rounded-lg h-9 bg-transparent border-[#7E7E7E] border flex items-center justify-center text-[14px] text-[#7E7E7E] font-semibold cursor-pointer' onClick={handleBlockUser}>
                    Cancel
                  </p>
                  <p className='w-20 rounded-lg h-9 bg-[#C31A7F] text-[#FFFFFF] flex items-center justify-center text-[14px] font-semibold cursor-pointer' onClick={toggleBlockTab}>
                    Block
                  </p>

                  {userblocked && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 lg:p-0 p-2'>
                      <div className='bg-[#FFFFFF] flex flex-col items-center py-11 gap-7 rounded-[30px] px-32 relative ' ref={ViewUserOutClick} >
                        <div className='absolute right-6 top-6  cursor-pointer' >
                          <IoMdClose size={18} onClick={toggleBlockTab} />
                        </div>
                        <div>
                          <img className='w-28' src={blockuser} alt='none' />
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                          <h1 className='  text-[#C31A7F] text-[18px] font-semibold'>Sierra Ferguson</h1>
                          <p className='text-[14px] text-[#7E7E7E] font-semibold'>Has been Blocked</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {removeUserPop && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-[350px] bg-white p-6 flex flex-col gap-4 rounded-[20px]">
                <div className="flex flex-col items-center justify-center gap-4">
                  <img className="w-16 " src={removIcon} alt="remove" />
                  <h1 className="text-[16px]    text-[#C31A7F] ">Remove Ananya Nagpal</h1>
                  <p className="text-[14px]  text-center text-[#7E7E7E]">Are you sure you want to remove this person as a friend</p>

                </div>
                <div className="flex flex-row items-center gap-4 justify-center">
                  <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={toggleRemovePopUp}>Cancel</button>
                  <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={toggleRemovePopUp}>Remove</button>
                </div>
              </div>
            </div>
          )}

          {deleteMsg && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className=" bg-white py-10 px-20 flex flex-col gap-4 rounded-[20px]">
                <div className="flex flex-col items-center justify-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M68 35C68 53.2254 53.2254 68 35 68C16.7746 68 2 53.2254 2 35C2 16.7746 16.7746 2 35 2C53.2254 2 68 16.7746 68 35ZM70 35C70 54.33 54.33 70 35 70C15.67 70 0 54.33 0 35C0 15.67 15.67 0 35 0C54.33 0 70 15.67 70 35ZM38.125 25L36.875 23.75H31.875L30.625 25H26H25V26V27.75V28.75H25.25H26H26.25V29.75V43.75C26.25 44.7446 26.6451 45.6984 27.3484 46.4016C28.0516 47.1049 29.0054 47.5 30 47.5H38.75C39.7446 47.5 40.6984 47.1049 41.4016 46.4016C42.1049 45.6984 42.5 44.7446 42.5 43.75V29.75V28.75H42.75H43.5H43.75V27.75V26V25H42.75H38.125ZM27.25 26.25H31.25L32.5 25H36.25L37.5 26.25H41.5H42.5V26.5V27.25V27.5H41.5H27.25H26.25V27.25V26.5V26.25H27.25ZM27.5 43.75V29.75V28.75H28.5H40.25H41.25V29.75V43.75C41.25 44.413 40.9866 45.0489 40.5178 45.5178C40.0489 45.9866 39.413 46.25 38.75 46.25H30C29.337 46.25 28.7011 45.9866 28.2322 45.5178C27.7634 45.0489 27.5 44.413 27.5 43.75ZM30 31.25H30.25H31H31.25V32.25V42.75V43.75H31H30.25H30V42.75V32.25V31.25ZM37.5 31.25H37.75H38.5H38.75V32.25V42.75V43.75H38.5H37.75H37.5V42.75V32.25V31.25Z" fill="#C31A7F" />
                  </svg>
                  <h1>Delete Message?</h1>
                  <button className="border-2 border-[#C31A7F] p-2 flex items-center justify-center rounded-xl h-10 w-full text-[14px]   text-[#C31A7F]  font-semibold " onClick={() => { delete_message(false) }}>
                    Delete For Everyone
                  </button>
                  <div className="flex flex-row items-center gap-4 justify-center">
                    <button className="w-20 h-10 border border-[#7E7E7E] rounded-[10px] text-[14px] " onClick={toogleDeleteMsgPopUp} >Cancel</button>
                    <button className="w-20 h-10 bg-[#C31A7F] text-white rounded-[10px] text-[14px] " onClick={() => { delete_message(true) }}>Delete</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {imageshowPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className='bg-white flex flex-col items-center rounded-[20px] justify-center p-10  '>
                <img src={imageshowPopup} alt='Uploaded' className=' w-[200px] rounded-lg  ' />
                <div className="flex flex-row items-center justify-between pt-10 w-full">
                  <button className="h-10 rounded-xl w-20 p-2 border border-[#7E7E7E] text-[12px]  text-center" onClick={toggleImageShowPopUp}>Cancel</button>
                  <button className="h-10 w-20 rounded-xl p-2 bg-[#C31A7F] text-white text-[12px] text-center" onClick={(e) => {
                    listOfImage()
                    if (file) {

                      send_message()
                    }

                  }}>Send</button>
                </div>
              </div>
            </div>
          )}

        </>
      }
    />
  );
};

export default ChatPage;
