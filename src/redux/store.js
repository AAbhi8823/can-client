import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterslice";
import socket_reducer from "./slice/socket";

const store=configureStore({
reducer:{
    filter:filterReducer,
    socket:socket_reducer
}
})

export default store
