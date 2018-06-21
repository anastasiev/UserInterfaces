import {CREATE_TASK, FETCH_TASKS, PAUSE_TASK, REMOVE_TASK, RESUME_TASK, SET_TASKS} from "./types";

export const fetchTasks = () => ({
    type: FETCH_TASKS
});
export const createTask = () => ({
    type: CREATE_TASK
});
export const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
});
export const pauseTask = (id) => ({
    type: PAUSE_TASK,
    payload: id
});
export const resumeTask = (id) => ({
    type: RESUME_TASK,
    payload: id
});
export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: id
});
