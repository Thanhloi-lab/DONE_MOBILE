import { configureStore } from "@reduxjs/toolkit";
import tabsSlice from '../stores/tab/tabsSlice'
import jobsSlice from '../stores/Job/jobsSlice'
import authenticationSlice from '../stores/Authentication/authenticationSlice'


const store = configureStore({
    reducer:{
        tabs:tabsSlice.reducer,
        authentication:authenticationSlice.reducer,
        jobs:jobsSlice.reducer
    }
})

export default store;