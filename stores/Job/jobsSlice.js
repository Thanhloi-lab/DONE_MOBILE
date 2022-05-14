import { createSlice } from '@reduxjs/toolkit';

const jobsSlice = createSlice({
    name: 'job',
    initialState: {
        allTask: [],
        allGroup: [],
        allProject: [],
        // idTask: "",
        // idGroup: "",
        // idProject: "",
        // nameTask: "",
        // taskCreateDate: "",
        // updateDate: "",
        // deadline: "",
        // content: "",
        // statusName: "",
        // statusId: "",
        // userCreateProject: "",
        // nameProject: "",
        // nameUserCreateProject: "",
        // phoneUserCreateProject: "",
        // mailUserCreateProject: "",
        // userCreateGroup: "",
        // nameGroup: "",
        // projectCreateDate: "",
        // nameUserCreateGroup: "",
        // phoneUserCreateGroup: "",
        // mailUserCreateGroup: ""
    },
    reducers: {
        setTask: (state, action) => {
            state.allTask = action.payload;
        },
        setGroup: (state, action) => {
            state.allGroup = action.payload;
        },
        setProject: (state, action) => {
            state.allProject = action.payload;
        }
    }
});

export default jobsSlice;