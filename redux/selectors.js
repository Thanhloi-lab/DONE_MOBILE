import { createSelector } from '@reduxjs/toolkit';


export const getTaskByProjectId = (state, action) => {
    return state.task.allTask.filter(task => task.idProject === action);
}