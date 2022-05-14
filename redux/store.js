import { configureStore } from "@reduxjs/toolkit";
import tabsSlice from '../stores/tab/tabsSlice'
import tasksSlice from '../stores/Task/taskSlice'
import authenticationSlice from '../stores/Authentication/authenticationSlice'


const store = configureStore({
    reducer:{
        tabs:tabsSlice.reducer,
        authentication:authenticationSlice.reducer,
        task:tasksSlice.reducer
    }
})

export default store;