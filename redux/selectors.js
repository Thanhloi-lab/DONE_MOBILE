// import { createSelector } from '@reduxjs/toolkit';
// import {getAllTaskGroupBy} from '../asset/js/callAPI'
// import { STATUS_NAME} from '../asset/js/constant'

// export const allTasksSelector = (state) => state.jobs.allTasks;
// export const allFilterText = (state) => state.filters.search;
// export const allFilterStatus = (state) => state.filters.status;


// export const taskRemainingSelector = createSelector(
//     allTasksSelector,
//     allFilterText,
//     allFilterStatus,
//     (tasks, searchText, status) => {
//         if (status === 'All') {
//             const afterFilter = tasks.filter(task=>{
//                 return task.nameTask.toLowerCase().includes(searchText.toLowerCase());
//             })
//             return getAllTaskGroupBy(afterFilter);
//         }
//         else{
//             const afterFilter = tasks.filter(task=>{
//                 return task.nameTask.toLowerCase().includes(searchText.toLowerCase()) 
//                     && task.statusId === STATUS_NAME[status];
//             })
//             return getAllTaskGroupBy(afterFilter);
//         }
//     }
// )
