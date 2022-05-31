import { createSlice } from '@reduxjs/toolkit';

export const initUser={
    idUser:0,
    name:'',
    mail:'',
    active:null,
    phone:'',
    token:null,
    address:'',
    gender:'',
    birthDate:'',
    avatar:null,
}


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user:initUser
    },
    reducers: {
        setToken: (state, action) => {
            // console.log(action.payload);
            state.user = action.payload;
        },
        deleteToken: (state, action) => {
            state.user = initUser;
        },
        setId: (state,action) =>{
            state.id = action.payload.id
        }
    }
});


export default authenticationSlice

