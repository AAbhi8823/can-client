import { createSlice } from "@reduxjs/toolkit";


const socket=createSlice({
    initialState:{socket:""
    },
    name:"socket",
    reducers:{
        socket_connection:(state,action)=>{
            state.socket=action.payload
        }
    }
})

export const socket_action=socket.actions
const socket_reducer=socket.reducer
export default socket_reducer