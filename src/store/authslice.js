import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData:null,
}

const authSlice = createSlice({
    name:"authService",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true,
            state.userData=action.payload.userData;
        },
        logOut:(state)=>{
            state.status=false,
            state.userData=null
        }
    }
});

export default authSlice.reducer;
export const {login,logOut} = authSlice.actions;