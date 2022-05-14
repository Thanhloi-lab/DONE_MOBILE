import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: "",
        mail: "Hello1@gmail.com",
        id: "2",

    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        deleteToken: (state, action) => {
            state.token = "";
        },

    }
});


export default authenticationSlice

