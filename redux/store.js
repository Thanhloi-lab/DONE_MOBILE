import { configureStore } from "@reduxjs/toolkit";
import tabsSlice from '../stores/tab/tabsSlice'
import authenticationSlice from '../stores/Authentication/authenticationSlice'


const store = configureStore({
    reducer:{
        tabs:tabsSlice.reducer,
        authentication:authenticationSlice.reducer
    }
})

export default store;