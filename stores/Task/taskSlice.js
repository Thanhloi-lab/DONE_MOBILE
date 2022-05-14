import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'task',
    initialState: {
        allTask: [],
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
        
    }
});

export default tasksSlice;