import {createSlice} from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        token:"",
    },
    reducers:{
        setToken: (state, action) =>{
            state.token = action.payload.token;
        },
        deleteToken:(state, action)=>{
            state.token = "";
        }
    }
});


export default authenticationSlice

