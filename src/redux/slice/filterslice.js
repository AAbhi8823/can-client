import { createSlice } from "@reduxjs/toolkit";

const search= createSlice({
    name:"filter",
    initialState:{
        search:""
    },reducers:{
        changesearch:(state,action)=>{
            state.search=action.payload
        }
    }
})

export const filteraction= search.actions
const filterReducer=search.reducer
export default filterReducer