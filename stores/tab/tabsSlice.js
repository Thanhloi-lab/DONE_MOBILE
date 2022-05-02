import {createSlice} from '@reduxjs/toolkit';

const tabsSlice = createSlice({
    name:'tabs',
    initialState:{
        selectedTab:"Home",
    },
    reducers:{
        setSelectedTab: (state, action) =>{
            state.selectedTab = action.payload;
        },
    }
});

export default tabsSlice;