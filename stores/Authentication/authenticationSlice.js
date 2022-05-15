import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: "",
        mail: "Hello1@gmail.com",
        id: 1,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        deleteToken: (state, action) => {
            state.token = "";
        },
        setId: (state,action) =>{
            state.id = action.payload.id
        }
    }
});


export default authenticationSlice

