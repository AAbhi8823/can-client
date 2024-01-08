import * as React from 'react';
import { useEffect, useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import account from '../Photos/account.jpg'
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import apis from '../Api/baseUrl';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const { socket } = useSelector(state => state.socket)
    const [btnColor, setBtnColor] = useState(false)
    const {search}=useSelector(state=>state.filter)
    const [users,setusers]=useState([])
    const [request,setrequest]=useState("")

    const ChangeColor = (i) => {
        setBtnColor(`btn${i}`)

    }
    const [colorBtn, seetBtnColor] = useState(false)

  const ColorChange = () => {
    seetBtnColor(!colorBtn);
  };
  const [colorBtn1, seetBtnColor1] = useState(false);

    const ColorChange1 = () => {
        seetBtnColor1(!colorBtn1)

    }
    const [colorBtn2, seetBtnColor2] = useState(false)

    const colorChange2 = () => {
        seetBtnColor2(!colorBtn2)

    }
    const [btnColors, setBtnColors] = useState(false)

    const ChangeColors = () => {
        setBtnColors(!btnColors)

    }
    const token=Cookies.get("token")
    const activeuser=localStorage.getItem("active_user")
    const get_search_user=async(txt)=>{
        try{
            const {data}=await axios.post(`${apis.SEARCH_USER}?token=${token}`,{
                search:txt,userid:activeuser
            })
            if(data.status==true){

                setusers(data.data)
                
            }else{
                setusers([])
            }
        }catch(error){
            console.log(error)
        }
    }

    const send_request=async(friend_id)=>{
        try{
            const {data}=await axios.post(`${apis.SEND_FRIEND_REQUEST}?token=${token}`,{
                sender_Id:activeuser,friend_id:friend_id
            })
            if(data.status==true){
                socket.emit("send-friend-request",{reciver_id:friend_id,sender_id:activeuser})
            }else{
                // setusers(data.data)
            }
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
      if(search!=""){
          get_search_user(search)
        }
          
    }, [search])
  

    return (
      <>
        {search !== "" && (
          <TableContainer
            component={Paper}
            style={{
              border: "none",
              paddingTop: "10px",
              paddingLeft: "40px",
              paddingRight: "40px",
              backgroundColor: "white !important",
              boxShadow: "3px 2px 22px -6px #cebdbd",
              
            }}
            className="absolute z-[99] bg-white h-[50vh] overflow-scroll	mt-[68px] w-[47%] !important px-4 "
          >
            <Table aria-label="simple table">
              <TableHead>
                {users &&
                  users.map((it, i) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <div className="flex mt-5">
                            <img
                              src={account}
                              alt="none"
                              className="rounded-full w-[4rem] h-[4rem]"
                            />
                            <div className="ml-4 mt-[-10px] md:mt-0 ">
                              <h1 className="font-semibold mt-2">
                                {it.username}
                              </h1>
                              <h1 className="text-pink-600 block md:hidden">
                                {it?.can_id}
                              </h1>
                              <h1 className="text-pink-600">
                                {it?.profile_category?.category_Name}
                              </h1>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="hidden md:block">{it?.can_id}</div>
                        </TableCell>

                        <TableCell align="right">
                          {request == `${i}request` ||
                          it.friendusers?.includes(activeuser) ? (
                            <Button
                              variant="contained"
                              onClick={() => {
                                ChangeColor(i);
                              }}
                              style={{
                                borderRadius: "20px",
                                background:
                                  btnColor == `btn${i}` ? "#006969" : "#c31a7f",
                              }}
                              className="pl-0 pr-0 md:pl-[30px] md:pr-[30px] "
                            >
                              {/* send Request  */} {"View Profile"}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => {
                                ChangeColor(i);
                                send_request(it._id);
                                setrequest(`${i}request`);
                              }}
                              style={{
                                borderRadius: "20px",
                                background:
                                  btnColor == `btn${i}` ? "#006969" : "#c31a7f",
                              }}
                              className="pl-0 pr-0 md:pl-[30px] md:pr-[30px]"
                            >
                              {/* send Request  */} {"Send Request"}
                            </Button>
                          )}
                        </TableCell>
                        {/* <TableCell align="right">
                          <a href="">
                            {" "}
                            <MoreVertIcon />
                          </a>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
              </TableHead>
            </Table>
          </TableContainer>
        )}
      </>
    );
}
